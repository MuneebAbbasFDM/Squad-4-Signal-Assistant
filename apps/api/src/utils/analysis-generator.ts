/**
 * Analysis Generator
 * Derives MEDDPICC and SPIN meeting-plan analysis from CRM note fields.
 * Produces structured output without requiring an OpenAI API call so the
 * demo works with the Excel dummy data out-of-the-box.
 */

import { CRMRecord } from '../data/crm-meetings.js';

// ─── Types ────────────────────────────────────────────────────────────────────

export interface MEDDPICCPlan {
  metrics: MEDDPICCElement;
  economicBuyer: MEDDPICCElement;
  decisionCriteria: MEDDPICCElement;
  decisionProcess: MEDDPICCElement;
  paperProcess: MEDDPICCElement;
  identifiedPain: MEDDPICCElement;
  champion: MEDDPICCElement;
  competition: MEDDPICCElement;
  overallCoverage: number;
  criticalGaps: string[];
  suggestedQuestions: SuggestedQuestion[];
}

export interface MEDDPICCElement {
  status: 'NOT_STARTED' | 'IN_PROGRESS' | 'WEAK' | 'INFERRED' | 'CONFIRMED' | 'AT_RISK';
  confidence: number;
  value: string;
  evidence: string[];
  gaps: string[];
}

export interface SPINPlan {
  situation: SPINElement;
  problem: SPINElement;
  implication: SPINElement;
  needPayoff: SPINElement;
  overallCoverage: number;
  discoveryQuality: 'weak' | 'moderate' | 'strong';
  suggestedQuestions: SuggestedQuestion[];
  summary: string;
}

export interface SPINElement {
  coverage: number;
  insights: string[];
  gaps: string[];
  suggestedQuestions: string[];
}

export interface SuggestedQuestion {
  framework: 'meddpicc' | 'spin';
  category: string;
  question: string;
  priority: number;
}

export interface MeetingPlan {
  clientName: string;
  account: string;
  meetingCount: number;
  dateRange: { earliest: string; latest: string };
  recurringChallenges: string[];
  recurringDecisions: string[];
  meddpicc: MEDDPICCPlan;
  spin: SPINPlan;
}

// ─── Helpers ──────────────────────────────────────────────────────────────────

function dedupe(arr: string[]): string[] {
  return [...new Set(arr)];
}

function avgConfidence(values: number[]): number {
  if (values.length === 0) return 0;
  return Math.round(values.reduce((a, b) => a + b, 0) / values.length);
}

/** Count how many times a challenge/decision theme recurs across records */
function countThemes(records: CRMRecord[], field: keyof CRMRecord): Map<string, number> {
  const counts = new Map<string, number>();
  for (const r of records) {
    const val = r[field] as string;
    counts.set(val, (counts.get(val) ?? 0) + 1);
  }
  return counts;
}

// ─── MEDDPICC Generator ───────────────────────────────────────────────────────

function buildMEDDPICCPlan(records: CRMRecord[], clientName: string): MEDDPICCPlan {
  const allDiscussion = dedupe(records.map((r) => r.keyDiscussionPoints));
  const allChallenges = dedupe(records.map((r) => r.challengesIdentified));
  const allDecisions = dedupe(records.map((r) => r.decisionsMade));
  const allNextSteps = dedupe(records.map((r) => r.nextSteps));

  // metrics – derived from Key Discussion Points (progress, delivery, roles)
  const metricsEvidence = allDiscussion.filter(
    (d) =>
      d.toLowerCase().includes('progress') ||
      d.toLowerCase().includes('role') ||
      d.toLowerCase().includes('timeline') ||
      d.toLowerCase().includes('pipeline'),
  );
  const metrics: MEDDPICCElement = {
    status: metricsEvidence.length > 0 ? 'IN_PROGRESS' : 'WEAK',
    confidence: metricsEvidence.length > 0 ? 55 : 20,
    value:
      metricsEvidence.length > 0
        ? `Delivery against open roles (Java, BA, DevOps). Cadence of pipeline updates.`
        : 'No quantified metrics established yet.',
    evidence: metricsEvidence.slice(0, 3),
    gaps: [
      'No hard SLA or fill-rate KPIs agreed.',
      'No numeric targets for pipeline throughput.',
    ],
  };

  // economicBuyer – we know the client name; role/authority not explicit
  const economicBuyer: MEDDPICCElement = {
    status: 'INFERRED',
    confidence: 60,
    value: `${clientName} at Legal & General. Likely a hiring manager or delivery lead.`,
    evidence: [`Primary contact: ${clientName} across all ${records.length} meetings.`],
    gaps: [
      'Ultimate budget/approval authority not confirmed.',
      'No explicit sign-off process mentioned.',
    ],
  };

  // decisionCriteria – from Decisions Made
  const criteriaEvidence = allDecisions.filter(
    (d) =>
      d.toLowerCase().includes('financial services') ||
      d.toLowerCase().includes('evidence') ||
      d.toLowerCase().includes('shortlist') ||
      d.toLowerCase().includes('sourcing'),
  );
  const decisionCriteria: MEDDPICCElement = {
    status: criteriaEvidence.length > 1 ? 'CONFIRMED' : 'IN_PROGRESS',
    confidence: criteriaEvidence.length > 1 ? 75 : 50,
    value: dedupe(criteriaEvidence).join(' | ') || 'Shortlist quality and candidate evidence mapping.',
    evidence: criteriaEvidence.slice(0, 3),
    gaps: ['Formal scorecard or weighting not documented.'],
  };

  // decisionProcess – from Next Steps
  const processEvidence = allNextSteps;
  const decisionProcess: MEDDPICCElement = {
    status: processEvidence.length > 0 ? 'IN_PROGRESS' : 'NOT_STARTED',
    confidence: processEvidence.length > 0 ? 60 : 10,
    value: dedupe(processEvidence).slice(0, 2).join('; '),
    evidence: processEvidence.slice(0, 3),
    gaps: [
      'Full approval chain not mapped.',
      'Decision timeline and milestones not confirmed.',
    ],
  };

  // paperProcess – not mentioned in CRM notes
  const paperProcess: MEDDPICCElement = {
    status: 'NOT_STARTED',
    confidence: 5,
    value: 'No procurement or contract process details captured.',
    evidence: [],
    gaps: [
      'Procurement requirements unknown.',
      'Contract/SOW process not discussed.',
      'Legal review timeline not established.',
    ],
  };

  // identifiedPain – from Challenges Identified
  const painEvidence = allChallenges;
  const identifiedPain: MEDDPICCElement = {
    status: painEvidence.length > 2 ? 'CONFIRMED' : 'IN_PROGRESS',
    confidence: painEvidence.length > 2 ? 85 : 60,
    value: dedupe(painEvidence).join('; '),
    evidence: painEvidence.slice(0, 4),
    gaps: ['Financial impact of challenges not quantified.'],
  };

  // champion – the named contact acts as day-to-day champion
  const champion: MEDDPICCElement = {
    status: 'INFERRED',
    confidence: 65,
    value: `${clientName} – engaged regularly, drives agenda items.`,
    evidence: [`${records.length} recorded meetings with ${clientName}.`],
    gaps: [
      'Internal influence and seniority not confirmed.',
      'No explicit advocacy for FDM on the record.',
    ],
  };

  // competition – not mentioned in CRM notes
  const competition: MEDDPICCElement = {
    status: 'NOT_STARTED',
    confidence: 5,
    value: 'No competitive landscape discussed in CRM notes.',
    evidence: [],
    gaps: [
      'No competitor or alternative supplier mentioned.',
      'Bench / PSL alternatives not explored.',
    ],
  };

  const coverages = [
    metrics.confidence,
    economicBuyer.confidence,
    decisionCriteria.confidence,
    decisionProcess.confidence,
    paperProcess.confidence,
    identifiedPain.confidence,
    champion.confidence,
    competition.confidence,
  ];
  const overallCoverage = avgConfidence(coverages);

  const criticalGaps: string[] = [];
  if (paperProcess.confidence < 20) criticalGaps.push('Paper/procurement process completely unknown.');
  if (competition.confidence < 20) criticalGaps.push('Competitive landscape not explored.');
  if (metrics.confidence < 60) criticalGaps.push('No quantified success metrics agreed.');
  if (economicBuyer.status === 'INFERRED') criticalGaps.push('Economic buyer authority not confirmed.');

  const suggestedQuestions: SuggestedQuestion[] = [
    {
      framework: 'meddpicc',
      category: 'metrics',
      question: 'What does success look like for this engagement in measurable terms — fill rate, time-to-hire, or retention targets?',
      priority: 5,
    },
    {
      framework: 'meddpicc',
      category: 'economicBuyer',
      question: 'Who has final sign-off on continued or expanded use of FDM resource?',
      priority: 5,
    },
    {
      framework: 'meddpicc',
      category: 'paperProcess',
      question: 'What does the procurement or SOW renewal process look like on your side?',
      priority: 4,
    },
    {
      framework: 'meddpicc',
      category: 'competition',
      question: 'Are you working with any other suppliers or considering alternatives for these roles?',
      priority: 4,
    },
    {
      framework: 'meddpicc',
      category: 'decisionCriteria',
      question: 'What criteria matter most when evaluating candidate quality — technical depth, sector experience, or onboarding speed?',
      priority: 3,
    },
  ];

  return {
    metrics,
    economicBuyer,
    decisionCriteria,
    decisionProcess,
    paperProcess,
    identifiedPain,
    champion,
    competition,
    overallCoverage,
    criticalGaps,
    suggestedQuestions,
  };
}

// ─── SPIN Generator ───────────────────────────────────────────────────────────

function buildSPINPlan(records: CRMRecord[]): SPINPlan {
  const allDiscussion = dedupe(records.map((r) => r.keyDiscussionPoints));
  const allChallenges = dedupe(records.map((r) => r.challengesIdentified));
  const allDecisions = dedupe(records.map((r) => r.decisionsMade));
  const allNextSteps = dedupe(records.map((r) => r.nextSteps));

  // Situation – what has been established about the client's current state
  const situation: SPINElement = {
    coverage: 70,
    insights: allDiscussion,
    gaps: [
      'Total headcount or team size not captured.',
      'Technology stack breadth beyond Java/DevOps not discussed.',
    ],
    suggestedQuestions: [
      'How many open roles are currently in your pipeline across all technology areas?',
      'What is the current mix of permanent vs contract resource at L&G?',
    ],
  };

  // Problem – recurring challenges across CRM notes
  const problem: SPINElement = {
    coverage: 80,
    insights: allChallenges,
    gaps: ['Root cause of stakeholder feedback delays not explored.'],
    suggestedQuestions: [
      'What causes the delays in hiring stakeholder feedback — capacity, prioritisation, or process?',
      'How long have CV quality gaps been an issue and what have you tried before?',
    ],
  };

  // Implication – impact of identified challenges on the business
  const implicationInsights = [
    'Delays in feedback extend time-to-hire and increase vacancy cost.',
    'CV quality gaps lead to wasted interview slots and reduced delivery confidence.',
    'Market scarcity for DevOps profiles risks missing project ramp-up deadlines.',
    'Inconsistent stakeholder expectations create re-work and frustration for all parties.',
    'Candidate availability misalignment may delay critical project milestones.',
  ];
  const implication: SPINElement = {
    coverage: 55,
    insights: implicationInsights,
    gaps: [
      'Financial cost of delayed hires not quantified.',
      'Impact on project delivery KPIs not stated explicitly.',
    ],
    suggestedQuestions: [
      'What is the business impact of having these roles unfilled for an additional 4–6 weeks?',
      'How does a delayed DevOps hire affect your Q3 delivery commitments?',
      'If CV quality gaps persist, how does that affect your team\'s confidence in the process?',
    ],
  };

  // Need-Payoff – value of solving the problems
  const needPayoffInsights = allDecisions.map(
    (d) => `Action agreed: ${d}`,
  );
  needPayoffInsights.push(...allNextSteps.map((ns) => `Next step: ${ns}`));
  const needPayoff: SPINElement = {
    coverage: 60,
    insights: dedupe(needPayoffInsights),
    gaps: [
      'Client has not yet articulated the value of a fully-staffed team in their own words.',
      'No explicit ROI or benefit statement captured.',
    ],
    suggestedQuestions: [
      'If we could reduce time-to-hire by 30%, what would that mean for your delivery plan?',
      'How would having a fully-staffed DevOps team change what your programme can achieve in H2?',
      'What would a more consistent and predictable supply of candidates enable for your hiring managers?',
    ],
  };

  const overallCoverage = avgConfidence([
    situation.coverage,
    problem.coverage,
    implication.coverage,
    needPayoff.coverage,
  ]);

  const discoveryQuality: SPINPlan['discoveryQuality'] =
    overallCoverage >= 70 ? 'strong' : overallCoverage >= 50 ? 'moderate' : 'weak';

  const suggestedQuestions: SuggestedQuestion[] = [
    {
      framework: 'spin',
      category: 'implication',
      question: 'What is the business impact of having these roles unfilled for another 4–6 weeks?',
      priority: 5,
    },
    {
      framework: 'spin',
      category: 'needPayoff',
      question: 'If we could halve the time-to-hire, what would that unlock for your Q3 plan?',
      priority: 5,
    },
    {
      framework: 'spin',
      category: 'problem',
      question: 'What is the root cause of the feedback delays from hiring stakeholders?',
      priority: 4,
    },
    {
      framework: 'spin',
      category: 'situation',
      question: 'How many open roles are currently in flight across all technology disciplines?',
      priority: 3,
    },
  ];

  const summary =
    `SPIN Discovery Quality: ${discoveryQuality} (${overallCoverage}% overall coverage). ` +
    `Situation and Problem are well-evidenced from 12 months of CRM notes. ` +
    `Implication and Need-Payoff require deeper exploration to build urgency and articulate business value.`;

  return {
    situation,
    problem,
    implication,
    needPayoff,
    overallCoverage,
    discoveryQuality,
    suggestedQuestions,
    summary,
  };
}

// ─── Main Exports ─────────────────────────────────────────────────────────────

/**
 * Build a full MEDDPICC + SPIN meeting preparation plan for a given client
 * using all their historical CRM records.
 */
export function generateMeetingPlan(
  clientName: string,
  records: CRMRecord[],
): MeetingPlan {
  const sorted = [...records].sort(
    (a, b) => new Date(a.meetingDate).getTime() - new Date(b.meetingDate).getTime(),
  );

  const challengeCounts = countThemes(records, 'challengesIdentified');
  const decisionCounts = countThemes(records, 'decisionsMade');

  const recurringChallenges = [...challengeCounts.entries()]
    .sort((a, b) => b[1] - a[1])
    .map(([theme, count]) => `${theme} (×${count})`);

  const recurringDecisions = [...decisionCounts.entries()]
    .sort((a, b) => b[1] - a[1])
    .map(([theme, count]) => `${theme} (×${count})`);

  return {
    clientName,
    account: records[0]?.account ?? 'Legal & General',
    meetingCount: records.length,
    dateRange: {
      earliest: sorted[0]?.meetingDate ?? '',
      latest: sorted[sorted.length - 1]?.meetingDate ?? '',
    },
    recurringChallenges,
    recurringDecisions,
    meddpicc: buildMEDDPICCPlan(records, clientName),
    spin: buildSPINPlan(records),
  };
}
