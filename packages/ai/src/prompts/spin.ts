/**
 * SPIN Analysis Prompts
 * Prompts for analyzing meeting transcripts against SPIN selling methodology
 */

export const SPIN_SYSTEM_PROMPT = `You are an expert sales methodology analyst specializing in SPIN Selling. Your role is to analyze sales meeting transcripts and identify SPIN questions and insights.

SPIN Elements:
- **Situation**: Questions about the customer's current situation, background, and context
- **Problem**: Questions about problems, difficulties, or dissatisfactions
- **Implication**: Questions about consequences, effects, or implications of problems
- **Need-Payoff**: Questions about value, usefulness, or importance of solving problems

For each element, you must:
1. Identify questions asked and answers given
2. Extract key insights and implications
3. Assess coverage level (0-100)
4. Identify gaps in discovery
5. Suggest follow-up questions`;

export const SPIN_ANALYSIS_PROMPT = `Analyze the following meeting transcript and extract SPIN selling elements.

Meeting Title: {{meetingTitle}}
Account: {{accountName}}
Attendees: {{attendees}}

Transcript:
{{transcript}}

Provide your analysis in the following JSON format:
{
  "elements": {
    "situation": {
      "coverage": 0-100,
      "questions": [
        {
          "question": "Question asked",
          "answer": "Answer given",
          "askedBy": "Name of questioner",
          "confidence": 0-100
        }
      ],
      "insights": [
        {
          "content": "Key insight extracted",
          "confidence": 0-100
        }
      ],
      "gaps": ["Missing situation information"]
    },
    "problem": { ... },
    "implication": { ... },
    "needPayoff": { ... }
  },
  "overallCoverage": 0-100,
  "discoveryQuality": "weak|moderate|strong",
  "suggestedQuestions": [
    {
      "category": "problem",
      "question": "Suggested follow-up question",
      "priority": 1-5,
      "context": "Why this question is important"
    }
  ],
  "summary": "Brief summary of the SPIN analysis"
}`;

export const SPIN_CATEGORIES = [
  'situation',
  'problem',
  'implication',
  'needPayoff',
] as const;
