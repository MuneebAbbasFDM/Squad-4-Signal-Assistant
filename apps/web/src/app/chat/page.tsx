'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Target, Send, Users, BarChart3, AlertTriangle, CheckCircle2, ChevronDown, ChevronUp } from 'lucide-react';

const API_URL = process.env.NEXT_PUBLIC_API_URL ?? 'http://localhost:3001';

// ─── Types ────────────────────────────────────────────────────────────────────

interface MEDDPICCElement {
  status: string;
  confidence: number;
  value: string;
  evidence: string[];
  gaps: string[];
}

interface MEDDPICCPlan {
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
  suggestedQuestions: Array<{ framework: string; category: string; question: string; priority: number }>;
}

interface SPINElement {
  coverage: number;
  insights: string[];
  gaps: string[];
  suggestedQuestions: string[];
}

interface SPINPlan {
  situation: SPINElement;
  problem: SPINElement;
  implication: SPINElement;
  needPayoff: SPINElement;
  overallCoverage: number;
  discoveryQuality: string;
  summary: string;
  suggestedQuestions: Array<{ framework: string; category: string; question: string; priority: number }>;
}

interface MeetingPlan {
  clientName: string;
  account: string;
  meetingCount: number;
  dateRange: { earliest: string; latest: string };
  recurringChallenges: string[];
  recurringDecisions: string[];
  meddpicc: MEDDPICCPlan;
  spin: SPINPlan;
}

interface ChatMessage {
  role: 'user' | 'assistant';
  content: string;
  plan?: MeetingPlan;
  availableClients?: string[];
}

// ─── Helpers ──────────────────────────────────────────────────────────────────

function statusBadge(status: string) {
  const colours: Record<string, string> = {
    CONFIRMED: 'bg-green-100 text-green-800',
    IN_PROGRESS: 'bg-blue-100 text-blue-800',
    WEAK: 'bg-yellow-100 text-yellow-800',
    INFERRED: 'bg-purple-100 text-purple-800',
    NOT_STARTED: 'bg-gray-100 text-gray-600',
    AT_RISK: 'bg-red-100 text-red-800',
  };
  return (
    <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${colours[status] ?? 'bg-gray-100 text-gray-600'}`}>
      {status.replace('_', ' ')}
    </span>
  );
}

function confidenceBar(value: number) {
  const colour = value >= 70 ? 'bg-green-500' : value >= 40 ? 'bg-yellow-500' : 'bg-red-400';
  return (
    <div className="w-full bg-gray-200 rounded-full h-2 mt-1">
      <div className={`${colour} h-2 rounded-full`} style={{ width: `${value}%` }} />
    </div>
  );
}

// ─── Sub-components ───────────────────────────────────────────────────────────

function MEDDPICCCard({ label, el }: { label: string; el: MEDDPICCElement }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="border border-gray-200 rounded-lg p-3">
      <button
        className="w-full flex items-center justify-between text-left"
        onClick={() => setOpen(!open)}
      >
        <span className="font-medium text-sm text-gray-800">{label}</span>
        <div className="flex items-center gap-2">
          {statusBadge(el.status)}
          <span className="text-xs text-gray-500">{el.confidence}%</span>
          {open ? <ChevronUp className="h-3 w-3 text-gray-400" /> : <ChevronDown className="h-3 w-3 text-gray-400" />}
        </div>
      </button>
      {confidenceBar(el.confidence)}
      {open && (
        <div className="mt-2 space-y-2 text-xs text-gray-600">
          {el.value && <p className="italic">{el.value}</p>}
          {el.evidence.length > 0 && (
            <div>
              <p className="font-semibold text-gray-700 mb-1">Evidence</p>
              <ul className="list-disc list-inside space-y-1">
                {el.evidence.map((e, i) => <li key={i}>{e}</li>)}
              </ul>
            </div>
          )}
          {el.gaps.length > 0 && (
            <div>
              <p className="font-semibold text-orange-700 mb-1">Gaps</p>
              <ul className="list-disc list-inside space-y-1 text-orange-700">
                {el.gaps.map((g, i) => <li key={i}>{g}</li>)}
              </ul>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

function SPINCard({ label, el }: { label: string; el: SPINElement }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="border border-gray-200 rounded-lg p-3">
      <button
        className="w-full flex items-center justify-between text-left"
        onClick={() => setOpen(!open)}
      >
        <span className="font-medium text-sm text-gray-800">{label}</span>
        <div className="flex items-center gap-2">
          <span className="text-xs text-gray-500">{el.coverage}%</span>
          {open ? <ChevronUp className="h-3 w-3 text-gray-400" /> : <ChevronDown className="h-3 w-3 text-gray-400" />}
        </div>
      </button>
      {confidenceBar(el.coverage)}
      {open && (
        <div className="mt-2 space-y-2 text-xs text-gray-600">
          {el.insights.length > 0 && (
            <div>
              <p className="font-semibold text-gray-700 mb-1">Insights from CRM</p>
              <ul className="list-disc list-inside space-y-1">
                {el.insights.slice(0, 4).map((ins, i) => <li key={i}>{ins}</li>)}
              </ul>
            </div>
          )}
          {el.gaps.length > 0 && (
            <div>
              <p className="font-semibold text-orange-700 mb-1">Gaps</p>
              <ul className="list-disc list-inside space-y-1 text-orange-700">
                {el.gaps.map((g, i) => <li key={i}>{g}</li>)}
              </ul>
            </div>
          )}
          {el.suggestedQuestions.length > 0 && (
            <div>
              <p className="font-semibold text-blue-700 mb-1">Suggested questions</p>
              <ul className="list-disc list-inside space-y-1 text-blue-700">
                {el.suggestedQuestions.map((q, i) => <li key={i}>{q}</li>)}
              </ul>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

function PlanDisplay({ plan }: { plan: MeetingPlan }) {
  const [tab, setTab] = useState<'meddpicc' | 'spin'>('meddpicc');

  const meddpiccElements: [string, MEDDPICCElement][] = [
    ['Metrics', plan.meddpicc.metrics],
    ['Economic Buyer', plan.meddpicc.economicBuyer],
    ['Decision Criteria', plan.meddpicc.decisionCriteria],
    ['Decision Process', plan.meddpicc.decisionProcess],
    ['Paper Process', plan.meddpicc.paperProcess],
    ['Identified Pain', plan.meddpicc.identifiedPain],
    ['Champion', plan.meddpicc.champion],
    ['Competition', plan.meddpicc.competition],
  ];

  const spinElements: [string, SPINElement][] = [
    ['Situation', plan.spin.situation],
    ['Problem', plan.spin.problem],
    ['Implication', plan.spin.implication],
    ['Need-Payoff', plan.spin.needPayoff],
  ];

  return (
    <div className="mt-3 border border-blue-200 rounded-xl bg-blue-50 p-4 space-y-3">
      {/* Header */}
      <div className="flex items-start justify-between">
        <div>
          <h3 className="font-semibold text-gray-900">{plan.clientName}</h3>
          <p className="text-xs text-gray-500">
            {plan.account} · {plan.meetingCount} meetings · {plan.dateRange.earliest} → {plan.dateRange.latest}
          </p>
        </div>
        <div className="flex gap-3 text-center">
          <div>
            <div className="text-lg font-bold text-blue-700">{plan.meddpicc.overallCoverage}%</div>
            <div className="text-xs text-gray-500">MEDDPICC</div>
          </div>
          <div>
            <div className="text-lg font-bold text-purple-700">{plan.spin.overallCoverage}%</div>
            <div className="text-xs text-gray-500">SPIN</div>
          </div>
        </div>
      </div>

      {/* Recurring themes */}
      {plan.recurringChallenges.length > 0 && (
        <div className="bg-white rounded-lg p-3 text-xs">
          <p className="font-semibold text-gray-700 mb-1 flex items-center gap-1">
            <AlertTriangle className="h-3 w-3 text-orange-500" /> Recurring Challenges
          </p>
          <ul className="list-disc list-inside text-gray-600 space-y-0.5">
            {plan.recurringChallenges.map((c, i) => <li key={i}>{c}</li>)}
          </ul>
        </div>
      )}

      {/* Tabs */}
      <div className="flex border-b border-gray-300">
        <button
          onClick={() => setTab('meddpicc')}
          className={`px-4 py-2 text-sm font-medium ${tab === 'meddpicc' ? 'border-b-2 border-blue-600 text-blue-700' : 'text-gray-500'}`}
        >
          MEDDPICC
        </button>
        <button
          onClick={() => setTab('spin')}
          className={`px-4 py-2 text-sm font-medium ${tab === 'spin' ? 'border-b-2 border-purple-600 text-purple-700' : 'text-gray-500'}`}
        >
          SPIN
        </button>
      </div>

      {/* MEDDPICC tab */}
      {tab === 'meddpicc' && (
        <div className="space-y-2">
          {plan.meddpicc.criticalGaps.length > 0 && (
            <div className="bg-red-50 border border-red-200 rounded-lg p-3 text-xs">
              <p className="font-semibold text-red-700 mb-1">Critical Gaps</p>
              <ul className="list-disc list-inside text-red-700 space-y-0.5">
                {plan.meddpicc.criticalGaps.map((g, i) => <li key={i}>{g}</li>)}
              </ul>
            </div>
          )}
          {meddpiccElements.map(([label, el]) => (
            <MEDDPICCCard key={label} label={label} el={el} />
          ))}
          <div className="bg-white rounded-lg p-3 text-xs">
            <p className="font-semibold text-blue-700 mb-2 flex items-center gap-1">
              <CheckCircle2 className="h-3 w-3" /> Top Questions for Next Meeting
            </p>
            <ol className="list-decimal list-inside space-y-1 text-gray-700">
              {plan.meddpicc.suggestedQuestions.map((q, i) => (
                <li key={i}><span className="text-gray-500">[{q.category}]</span> {q.question}</li>
              ))}
            </ol>
          </div>
        </div>
      )}

      {/* SPIN tab */}
      {tab === 'spin' && (
        <div className="space-y-2">
          <div className="bg-white rounded-lg p-3 text-xs italic text-gray-600">
            {plan.spin.summary}
          </div>
          {spinElements.map(([label, el]) => (
            <SPINCard key={label} label={label} el={el} />
          ))}
          <div className="bg-white rounded-lg p-3 text-xs">
            <p className="font-semibold text-purple-700 mb-2 flex items-center gap-1">
              <CheckCircle2 className="h-3 w-3" /> Top SPIN Questions for Next Meeting
            </p>
            <ol className="list-decimal list-inside space-y-1 text-gray-700">
              {plan.spin.suggestedQuestions.map((q, i) => (
                <li key={i}><span className="text-gray-500">[{q.category}]</span> {q.question}</li>
              ))}
            </ol>
          </div>
        </div>
      )}
    </div>
  );
}

// ─── Main Page ────────────────────────────────────────────────────────────────

export default function ChatPage() {
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      role: 'assistant',
      content:
        'Hello! I\'m your Signal Assistant. I have 12 months of Legal & General CRM data loaded. ' +
        'Ask me for a meeting prep plan — for example: "Show me a plan for Becky Davis" — ' +
        'and I\'ll return a full MEDDPICC and SPIN analysis.',
    },
  ]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);

  async function sendMessage() {
    const text = input.trim();
    if (!text) return;

    const userMsg: ChatMessage = { role: 'user', content: text };
    setMessages((prev) => [...prev, userMsg]);
    setInput('');
    setLoading(true);

    try {
      const res = await fetch(`${API_URL}/api/v1/chat`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: text }),
      });
      const data = (await res.json()) as {
        success: boolean;
        data?: { reply: string; plan?: MeetingPlan; availableClients?: string[] };
        error?: { message: string };
      };
      const payload = data.data;
      const assistantMsg: ChatMessage = {
        role: 'assistant',
        content: payload?.reply ?? data.error?.message ?? 'Sorry, something went wrong.',
        plan: payload?.plan,
        availableClients: payload?.availableClients,
      };
      setMessages((prev) => [...prev, assistantMsg]);
    } catch {
      setMessages((prev) => [
        ...prev,
        { role: 'assistant', content: 'Error: could not reach the API. Is the server running?' },
      ]);
    } finally {
      setLoading(false);
    }
  }

  function handleKey(e: React.KeyboardEvent<HTMLInputElement>) {
    if (e.key === 'Enter' && !e.shiftKey) {
      void sendMessage();
    }
  }

  return (
    <div className="min-h-screen flex flex-col">
      {/* Header */}
      <header className="bg-white border-b border-gray-200">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center gap-2">
              <Target className="h-7 w-7 text-primary-600" />
              <span className="text-lg font-bold text-gray-900">Signal Assistant</span>
              <span className="ml-2 px-2 py-0.5 rounded-full bg-blue-100 text-blue-700 text-xs font-medium">
                L&G CRM · 30 meetings
              </span>
            </div>
            <nav className="flex space-x-4 text-sm">
              <Link href="/" className="text-gray-500 hover:text-gray-900 px-2 py-1">Home</Link>
              <Link href="/chat" className="text-primary-600 font-medium px-2 py-1 border-b-2 border-primary-600">Chat</Link>
            </nav>
          </div>
        </div>
      </header>

      {/* Chat area */}
      <main className="flex-1 max-w-5xl w-full mx-auto px-4 py-6 flex flex-col gap-4">
        {/* Context bar */}
        <div className="bg-blue-50 border border-blue-200 rounded-xl p-4 flex items-start gap-3 text-sm">
          <BarChart3 className="h-5 w-5 text-blue-600 mt-0.5 flex-shrink-0" />
          <div>
            <p className="font-semibold text-blue-900">Legal &amp; General CRM Data Loaded</p>
            <p className="text-blue-700 mt-0.5">
              30 meetings across 3 contacts (Becky Davis, Gary Manser, Will Tomlinson) from Jun 2025 – May 2026.
              Ask for a meeting prep plan and I&apos;ll analyse the CRM history in MEDDPICC and SPIN format.
            </p>
          </div>
        </div>

        {/* Messages */}
        <div className="flex-1 space-y-4 overflow-y-auto">
          {messages.map((msg, i) => (
            <div key={i} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
              <div className={`max-w-2xl w-full rounded-2xl px-4 py-3 ${msg.role === 'user' ? 'bg-primary-600 text-white ml-auto' : 'bg-white border border-gray-200 text-gray-800'}`}>
                <p className="text-sm">{msg.content}</p>

                {/* Client list */}
                {msg.availableClients && (
                  <div className="mt-2 flex gap-2 flex-wrap">
                    {msg.availableClients.map((c) => (
                      <button
                        key={c}
                        onClick={() => { setInput(`Show me the meeting plan for ${c}`); }}
                        className="flex items-center gap-1 px-3 py-1.5 bg-blue-100 hover:bg-blue-200 text-blue-800 text-xs rounded-full font-medium transition-colors"
                      >
                        <Users className="h-3 w-3" /> {c}
                      </button>
                    ))}
                  </div>
                )}

                {/* Meeting plan */}
                {msg.plan && <PlanDisplay plan={msg.plan} />}
              </div>
            </div>
          ))}

          {loading && (
            <div className="flex justify-start">
              <div className="bg-white border border-gray-200 rounded-2xl px-4 py-3 text-sm text-gray-500 animate-pulse">
                Analysing CRM data…
              </div>
            </div>
          )}
        </div>

        {/* Input */}
        <div className="bg-white border border-gray-300 rounded-2xl flex items-center gap-2 px-4 py-2 shadow-sm">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKey}
            placeholder='Try "Show me the plan for Gary Manser" or "List all clients"…'
            className="flex-1 text-sm outline-none bg-transparent text-gray-800 placeholder-gray-400"
          />
          <button
            onClick={() => void sendMessage()}
            disabled={loading || !input.trim()}
            className="flex items-center gap-1 px-3 py-1.5 bg-primary-600 hover:bg-primary-700 disabled:bg-gray-300 text-white text-sm rounded-xl transition-colors"
          >
            <Send className="h-4 w-4" />
          </button>
        </div>
      </main>
    </div>
  );
}
