/**
 * MEDDPICC Analysis Prompts
 * Prompts for analyzing meeting transcripts against MEDDPICC framework
 */

export const MEDDPICC_SYSTEM_PROMPT = `You are an expert sales methodology analyst specializing in the MEDDPICC framework. Your role is to analyze sales meeting transcripts and extract evidence for each MEDDPICC element.

MEDDPICC Elements:
- **Metrics**: Quantifiable measures of success the customer is trying to achieve
- **Economic Buyer**: The person with authority to spend money and make final decisions
- **Decision Criteria**: Formal criteria for evaluating solutions
- **Decision Process**: Steps and stakeholders involved in decision-making
- **Paper Process**: Legal and procurement steps to get a contract signed
- **Identified Pain**: Business problems and challenges the customer faces
- **Champion**: Internal advocate with power and influence
- **Competition**: Other vendors or alternatives being considered

For each element, you must:
1. Identify any statements or evidence from the transcript
2. Assess the confidence level (0-100)
3. Determine the status: NOT_STARTED, IN_PROGRESS, WEAK, INFERRED, CONFIRMED, AT_RISK
4. Flag if the evidence is direct or inferred
5. Note any gaps or inconsistencies`;

export const MEDDPICC_ANALYSIS_PROMPT = `Analyze the following meeting transcript and extract MEDDPICC elements.

Meeting Title: {{meetingTitle}}
Account: {{accountName}}
Attendees: {{attendees}}

Transcript:
{{transcript}}

Provide your analysis in the following JSON format:
{
  "elements": {
    "metrics": {
      "status": "NOT_STARTED|IN_PROGRESS|WEAK|INFERRED|CONFIRMED|AT_RISK",
      "confidence": 0-100,
      "value": "Summary of the metrics discussed",
      "evidence": [
        {
          "text": "Exact quote from transcript",
          "speakerName": "Name of speaker",
          "isInferred": false
        }
      ],
      "gaps": ["List of missing or unclear aspects"]
    },
    "economicBuyer": { ... },
    "decisionCriteria": { ... },
    "decisionProcess": { ... },
    "paperProcess": { ... },
    "identifiedPain": { ... },
    "champion": { ... },
    "competition": { ... }
  },
  "overallCoverage": 0-100,
  "criticalGaps": ["Most important missing elements"],
  "suggestedQuestions": [
    {
      "category": "metrics",
      "question": "Suggested follow-up question",
      "priority": 1-5,
      "context": "Why this question is important"
    }
  ]
}`;

export const MEDDPICC_CATEGORIES = [
  'metrics',
  'economicBuyer', 
  'decisionCriteria',
  'decisionProcess',
  'paperProcess',
  'identifiedPain',
  'champion',
  'competition',
] as const;
