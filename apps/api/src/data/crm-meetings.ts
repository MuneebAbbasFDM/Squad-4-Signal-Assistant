/**
 * CRM Meeting Data – Legal & General
 * Derived from legal_general_crm_notes_12m.xlsx
 */

export interface CRMRecord {
  clientName: string;
  account: string;
  meetingDate: string; // ISO date string
  meetingType: string;
  keyDiscussionPoints: string;
  challengesIdentified: string;
  decisionsMade: string;
  nextSteps: string;
}

/** All 30 CRM records sourced from legal_general_crm_notes_12m.xlsx */
export const CRM_RECORDS: CRMRecord[] = [
  // Becky Davis (10 meetings)
  {
    clientName: 'Becky Davis',
    account: 'Legal & General',
    meetingDate: '2026-04-03',
    meetingType: 'Quarterly Review',
    keyDiscussionPoints:
      'Discussed progress against open roles (Java, BA, DevOps) and alignment to delivery timelines.',
    challengesIdentified: 'Delays in feedback from hiring stakeholders.',
    decisionsMade: 'Increase cadence of delivery check-ins.',
    nextSteps:
      'Schedule follow-up with delivery team to validate requirements.',
  },
  {
    clientName: 'Becky Davis',
    account: 'Legal & General',
    meetingDate: '2026-01-09',
    meetingType: 'Quarterly Review',
    keyDiscussionPoints:
      'Discussed challenges in sourcing niche DevOps skillsets.',
    challengesIdentified: 'Gaps between CV evidence and required skill depth.',
    decisionsMade: 'Increase cadence of delivery check-ins.',
    nextSteps: 'Provide weekly pipeline updates to stakeholders.',
  },
  {
    clientName: 'Becky Davis',
    account: 'Legal & General',
    meetingDate: '2025-12-15',
    meetingType: 'Project Update',
    keyDiscussionPoints:
      'Discussed progress against open roles (Java, BA, DevOps) and alignment to delivery timelines.',
    challengesIdentified: 'Market scarcity for mid-level DevOps profiles.',
    decisionsMade:
      'Focus sourcing efforts on local Cardiff-based talent.',
    nextSteps: 'Submit updated shortlist within 48 hours.',
  },
  {
    clientName: 'Becky Davis',
    account: 'Legal & General',
    meetingDate: '2025-10-25',
    meetingType: 'Delivery Check-in',
    keyDiscussionPoints:
      'Reviewed feedback from recent candidate interviews and hiring decisions.',
    challengesIdentified: 'Gaps between CV evidence and required skill depth.',
    decisionsMade: 'Increase cadence of delivery check-ins.',
    nextSteps: 'Provide weekly pipeline updates to stakeholders.',
  },
  {
    clientName: 'Becky Davis',
    account: 'Legal & General',
    meetingDate: '2025-09-05',
    meetingType: 'Project Update',
    keyDiscussionPoints:
      'Reviewed candidate pipeline and quality of shortlisted profiles.',
    challengesIdentified: 'Gaps between CV evidence and required skill depth.',
    decisionsMade:
      'Prioritise candidates with financial services experience.',
    nextSteps: 'Submit updated shortlist within 48 hours.',
  },
  {
    clientName: 'Becky Davis',
    account: 'Legal & General',
    meetingDate: '2025-08-09',
    meetingType: 'Project Update',
    keyDiscussionPoints:
      'Reviewed candidate pipeline and quality of shortlisted profiles.',
    challengesIdentified: 'Gaps between CV evidence and required skill depth.',
    decisionsMade:
      'Prioritise candidates with financial services experience.',
    nextSteps: 'Align on interview availability with hiring managers.',
  },
  {
    clientName: 'Becky Davis',
    account: 'Legal & General',
    meetingDate: '2025-08-03',
    meetingType: 'Project Update',
    keyDiscussionPoints:
      'Reviewed feedback from recent candidate interviews and hiring decisions.',
    challengesIdentified: 'Delays in feedback from hiring stakeholders.',
    decisionsMade:
      'Prioritise candidates with financial services experience.',
    nextSteps: 'Refine CVs to better reflect project experience.',
  },
  {
    clientName: 'Becky Davis',
    account: 'Legal & General',
    meetingDate: '2025-07-07',
    meetingType: 'Project Update',
    keyDiscussionPoints:
      'Discussed challenges in sourcing niche DevOps skillsets.',
    challengesIdentified: 'Market scarcity for mid-level DevOps profiles.',
    decisionsMade:
      'Focus sourcing efforts on local Cardiff-based talent.',
    nextSteps: 'Provide weekly pipeline updates to stakeholders.',
  },
  {
    clientName: 'Becky Davis',
    account: 'Legal & General',
    meetingDate: '2025-06-13',
    meetingType: 'Delivery Check-in',
    keyDiscussionPoints:
      'Discussed challenges in sourcing niche DevOps skillsets.',
    challengesIdentified: 'Market scarcity for mid-level DevOps profiles.',
    decisionsMade:
      'Proceed with refined shortlist and stronger evidence mapping.',
    nextSteps: 'Provide weekly pipeline updates to stakeholders.',
  },
  {
    clientName: 'Becky Davis',
    account: 'Legal & General',
    meetingDate: '2025-06-04',
    meetingType: 'Project Update',
    keyDiscussionPoints:
      'Discussed challenges in sourcing niche DevOps skillsets.',
    challengesIdentified: 'Delays in feedback from hiring stakeholders.',
    decisionsMade:
      'Focus sourcing efforts on local Cardiff-based talent.',
    nextSteps: 'Submit updated shortlist within 48 hours.',
  },

  // Gary Manser (11 meetings)
  {
    clientName: 'Gary Manser',
    account: 'Legal & General',
    meetingDate: '2026-05-14',
    meetingType: 'Pipeline Discussion',
    keyDiscussionPoints:
      'Reviewed feedback from recent candidate interviews and hiring decisions.',
    challengesIdentified:
      'Candidate availability misaligned with project timelines.',
    decisionsMade:
      'Proceed with refined shortlist and stronger evidence mapping.',
    nextSteps: 'Submit updated shortlist within 48 hours.',
  },
  {
    clientName: 'Gary Manser',
    account: 'Legal & General',
    meetingDate: '2026-05-12',
    meetingType: 'Pipeline Discussion',
    keyDiscussionPoints:
      'Reviewed feedback from recent candidate interviews and hiring decisions.',
    challengesIdentified:
      'Candidate availability misaligned with project timelines.',
    decisionsMade:
      'Simplify submission format to one-page evidence summaries.',
    nextSteps: 'Provide weekly pipeline updates to stakeholders.',
  },
  {
    clientName: 'Gary Manser',
    account: 'Legal & General',
    meetingDate: '2026-05-02',
    meetingType: 'Pipeline Discussion',
    keyDiscussionPoints:
      'Discussed challenges in sourcing niche DevOps skillsets.',
    challengesIdentified:
      'Inconsistent stakeholder expectations across teams.',
    decisionsMade: 'Increase cadence of delivery check-ins.',
    nextSteps: 'Submit updated shortlist within 48 hours.',
  },
  {
    clientName: 'Gary Manser',
    account: 'Legal & General',
    meetingDate: '2026-04-23',
    meetingType: 'Pipeline Discussion',
    keyDiscussionPoints:
      'Discussed challenges in sourcing niche DevOps skillsets.',
    challengesIdentified: 'Market scarcity for mid-level DevOps profiles.',
    decisionsMade:
      'Proceed with refined shortlist and stronger evidence mapping.',
    nextSteps: 'Provide weekly pipeline updates to stakeholders.',
  },
  {
    clientName: 'Gary Manser',
    account: 'Legal & General',
    meetingDate: '2026-04-19',
    meetingType: 'Stakeholder Sync',
    keyDiscussionPoints:
      'Aligned on upcoming project demand and expected ramp-up in Q3.',
    challengesIdentified: 'Delays in feedback from hiring stakeholders.',
    decisionsMade:
      'Simplify submission format to one-page evidence summaries.',
    nextSteps: 'Refine CVs to better reflect project experience.',
  },
  {
    clientName: 'Gary Manser',
    account: 'Legal & General',
    meetingDate: '2026-01-17',
    meetingType: 'Stakeholder Sync',
    keyDiscussionPoints:
      'Discussed challenges in sourcing niche DevOps skillsets.',
    challengesIdentified:
      'Inconsistent stakeholder expectations across teams.',
    decisionsMade:
      'Focus sourcing efforts on local Cardiff-based talent.',
    nextSteps: 'Align on interview availability with hiring managers.',
  },
  {
    clientName: 'Gary Manser',
    account: 'Legal & General',
    meetingDate: '2025-11-11',
    meetingType: 'Stakeholder Sync',
    keyDiscussionPoints:
      'Discussed progress against open roles (Java, BA, DevOps) and alignment to delivery timelines.',
    challengesIdentified: 'Delays in feedback from hiring stakeholders.',
    decisionsMade:
      'Focus sourcing efforts on local Cardiff-based talent.',
    nextSteps: 'Provide weekly pipeline updates to stakeholders.',
  },
  {
    clientName: 'Gary Manser',
    account: 'Legal & General',
    meetingDate: '2025-09-26',
    meetingType: 'Delivery Check-in',
    keyDiscussionPoints:
      'Reviewed feedback from recent candidate interviews and hiring decisions.',
    challengesIdentified:
      'Candidate availability misaligned with project timelines.',
    decisionsMade:
      'Proceed with refined shortlist and stronger evidence mapping.',
    nextSteps: 'Refine CVs to better reflect project experience.',
  },
  {
    clientName: 'Gary Manser',
    account: 'Legal & General',
    meetingDate: '2025-09-02',
    meetingType: 'Delivery Check-in',
    keyDiscussionPoints:
      'Discussed challenges in sourcing niche DevOps skillsets.',
    challengesIdentified:
      'Inconsistent stakeholder expectations across teams.',
    decisionsMade:
      'Proceed with refined shortlist and stronger evidence mapping.',
    nextSteps: 'Align on interview availability with hiring managers.',
  },
  {
    clientName: 'Gary Manser',
    account: 'Legal & General',
    meetingDate: '2025-08-17',
    meetingType: 'Pipeline Discussion',
    keyDiscussionPoints:
      'Discussed progress against open roles (Java, BA, DevOps) and alignment to delivery timelines.',
    challengesIdentified: 'Market scarcity for mid-level DevOps profiles.',
    decisionsMade:
      'Simplify submission format to one-page evidence summaries.',
    nextSteps:
      'Schedule follow-up with delivery team to validate requirements.',
  },

  // Will Tomlinson (10 meetings)
  {
    clientName: 'Will Tomlinson',
    account: 'Legal & General',
    meetingDate: '2026-05-16',
    meetingType: 'Pipeline Discussion',
    keyDiscussionPoints:
      'Reviewed candidate pipeline and quality of shortlisted profiles.',
    challengesIdentified: 'Delays in feedback from hiring stakeholders.',
    decisionsMade:
      'Focus sourcing efforts on local Cardiff-based talent.',
    nextSteps:
      'Schedule follow-up with delivery team to validate requirements.',
  },
  {
    clientName: 'Will Tomlinson',
    account: 'Legal & General',
    meetingDate: '2026-04-19',
    meetingType: 'Pipeline Discussion',
    keyDiscussionPoints:
      'Discussed progress against open roles (Java, BA, DevOps) and alignment to delivery timelines.',
    challengesIdentified: 'Gaps between CV evidence and required skill depth.',
    decisionsMade:
      'Focus sourcing efforts on local Cardiff-based talent.',
    nextSteps: 'Provide weekly pipeline updates to stakeholders.',
  },
  {
    clientName: 'Will Tomlinson',
    account: 'Legal & General',
    meetingDate: '2026-02-13',
    meetingType: 'Quarterly Review',
    keyDiscussionPoints:
      'Discussed progress against open roles (Java, BA, DevOps) and alignment to delivery timelines.',
    challengesIdentified:
      'Inconsistent stakeholder expectations across teams.',
    decisionsMade:
      'Focus sourcing efforts on local Cardiff-based talent.',
    nextSteps: 'Submit updated shortlist within 48 hours.',
  },
  {
    clientName: 'Will Tomlinson',
    account: 'Legal & General',
    meetingDate: '2025-10-26',
    meetingType: 'Quarterly Review',
    keyDiscussionPoints:
      'Reviewed feedback from recent candidate interviews and hiring decisions.',
    challengesIdentified:
      'Candidate availability misaligned with project timelines.',
    decisionsMade:
      'Focus sourcing efforts on local Cardiff-based talent.',
    nextSteps: 'Provide weekly pipeline updates to stakeholders.',
  },
  {
    clientName: 'Will Tomlinson',
    account: 'Legal & General',
    meetingDate: '2025-10-07',
    meetingType: 'Project Update',
    keyDiscussionPoints:
      'Reviewed candidate pipeline and quality of shortlisted profiles.',
    challengesIdentified: 'Gaps between CV evidence and required skill depth.',
    decisionsMade:
      'Prioritise candidates with financial services experience.',
    nextSteps:
      'Schedule follow-up with delivery team to validate requirements.',
  },
  {
    clientName: 'Will Tomlinson',
    account: 'Legal & General',
    meetingDate: '2025-09-16',
    meetingType: 'Quarterly Review',
    keyDiscussionPoints:
      'Reviewed candidate pipeline and quality of shortlisted profiles.',
    challengesIdentified:
      'Candidate availability misaligned with project timelines.',
    decisionsMade:
      'Proceed with refined shortlist and stronger evidence mapping.',
    nextSteps: 'Refine CVs to better reflect project experience.',
  },
  {
    clientName: 'Will Tomlinson',
    account: 'Legal & General',
    meetingDate: '2025-08-27',
    meetingType: 'Project Update',
    keyDiscussionPoints:
      'Discussed challenges in sourcing niche DevOps skillsets.',
    challengesIdentified: 'Market scarcity for mid-level DevOps profiles.',
    decisionsMade: 'Increase cadence of delivery check-ins.',
    nextSteps: 'Align on interview availability with hiring managers.',
  },
  {
    clientName: 'Will Tomlinson',
    account: 'Legal & General',
    meetingDate: '2025-08-07',
    meetingType: 'Project Update',
    keyDiscussionPoints:
      'Reviewed candidate pipeline and quality of shortlisted profiles.',
    challengesIdentified:
      'Inconsistent stakeholder expectations across teams.',
    decisionsMade:
      'Simplify submission format to one-page evidence summaries.',
    nextSteps:
      'Schedule follow-up with delivery team to validate requirements.',
  },
  {
    clientName: 'Will Tomlinson',
    account: 'Legal & General',
    meetingDate: '2025-06-15',
    meetingType: 'Project Update',
    keyDiscussionPoints:
      'Reviewed feedback from recent candidate interviews and hiring decisions.',
    challengesIdentified:
      'Candidate availability misaligned with project timelines.',
    decisionsMade:
      'Focus sourcing efforts on local Cardiff-based talent.',
    nextSteps: 'Submit updated shortlist within 48 hours.',
  },
  {
    clientName: 'Will Tomlinson',
    account: 'Legal & General',
    meetingDate: '2025-06-12',
    meetingType: 'Quarterly Review',
    keyDiscussionPoints:
      'Reviewed feedback from recent candidate interviews and hiring decisions.',
    challengesIdentified: 'Gaps between CV evidence and required skill depth.',
    decisionsMade:
      'Simplify submission format to one-page evidence summaries.',
    nextSteps: 'Refine CVs to better reflect project experience.',
  },
];

/** Unique client names in the CRM data */
export const CRM_CLIENTS = [
  ...new Set(CRM_RECORDS.map((r) => r.clientName)),
];
