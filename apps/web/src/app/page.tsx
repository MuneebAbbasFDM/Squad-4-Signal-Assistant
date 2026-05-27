import {
  ArrowRight,
  BarChart3,
  Bot,
  Calendar,
  ChevronRight,
  FileText,
  Users,
  Target,
  TrendingUp,
  AlertTriangle,
  CheckCircle2,
  ShieldCheck,
  Zap,
} from 'lucide-react';

export default function Home() {
  const features = [
    {
      title: 'Meeting Capture',
      description:
        'Automatic transcription with speaker attribution and timestamped evidence.',
      icon: Calendar,
    },
    {
      title: 'Framework Analysis',
      description:
        'MEDDPICC and SPIN framework coverage analysis with evidence mapping.',
      icon: FileText,
    },
    {
      title: 'Gap Detection',
      description:
        'Identify missing, weak, or contradictory discovery elements automatically.',
      icon: AlertTriangle,
    },
    {
      title: 'Pipeline Insights',
      description:
        'Evidence-based pipeline reviews and opportunity health scoring.',
      icon: BarChart3,
    },
  ];

  const meddpiccItems = [
    { name: 'Metrics', icon: TrendingUp },
    { name: 'Economic Buyer', icon: Users },
    { name: 'Decision Criteria', icon: CheckCircle2 },
    { name: 'Decision Process', icon: Target },
    { name: 'Paper Process', icon: FileText },
    { name: 'Identified Pain', icon: AlertTriangle },
    { name: 'Champion', icon: ShieldCheck },
    { name: 'Competition', icon: BarChart3 },
  ];

  return (
    <div className="relative min-h-screen overflow-hidden bg-[#1E1E1E] text-white">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,_rgba(197,255,0,0.18),_transparent_28%),radial-gradient(circle_at_80%_20%,_rgba(197,255,0,0.12),_transparent_20%)]" />
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-primary-500/70 to-transparent" />

      <header className="relative">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-6 sm:px-6 lg:px-8">
          <div className="flex items-center gap-3">
            <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-primary-500 text-[#1E1E1E] shadow-[0_0_35px_rgba(197,255,0,0.35)]">
              <Target className="h-6 w-6" />
            </div>
            <div>
              <span className="block text-xs font-semibold uppercase tracking-[0.3em] text-primary-500/80">
                Revenue intelligence
              </span>
              <span className="text-xl font-semibold text-white">
                Signal Assistant
              </span>
            </div>
          </div>

          <nav className="hidden items-center gap-2 rounded-full border border-white/10 bg-white/5 p-2 md:flex">
            <a
              href="#features"
              className="rounded-full px-4 py-2 text-sm font-medium text-gray-300 transition hover:bg-white/10 hover:text-white"
            >
              Features
            </a>
            <a
              href="#overview"
              className="rounded-full px-4 py-2 text-sm font-medium text-gray-300 transition hover:bg-white/10 hover:text-white"
            >
              Coverage
            </a>
            <a
              href="#highlights"
              className="rounded-full bg-primary-500 px-4 py-2 text-sm font-semibold text-[#1E1E1E] transition hover:bg-primary-400"
            >
              Highlights
            </a>
          </nav>
        </div>
      </header>

      <main className="relative">
        <div className="mx-auto max-w-7xl px-4 pb-20 pt-8 sm:px-6 lg:px-8">
          <section className="grid gap-12 lg:grid-cols-[1.15fr_0.85fr] lg:items-center">
            <div className="max-w-3xl">
              <div className="inline-flex items-center gap-2 rounded-full border border-primary-500/30 bg-primary-500/10 px-4 py-2 text-sm text-primary-500">
                <Zap className="h-4 w-4" />
                Less admin. Sharper discovery. Faster follow-up.
              </div>

              <h1 className="mt-6 text-5xl font-semibold tracking-tight text-white sm:text-6xl lg:text-7xl">
                Sales meeting intelligence that feels built for now.
              </h1>

              <p className="mt-6 max-w-2xl text-lg leading-8 text-gray-300 sm:text-xl">
                Standardise how sales meetings are captured, analysed, and
                reviewed with a cleaner workspace, stronger signal visibility,
                and AI-guided MEDDPICC and SPIN analysis.
              </p>

              <div className="mt-10 flex flex-col gap-4 sm:flex-row">
                <a
                  href="#features"
                  className="inline-flex items-center justify-center gap-2 rounded-full bg-primary-500 px-6 py-3 text-base font-semibold text-[#1E1E1E] transition hover:bg-primary-400"
                >
                  Explore capabilities
                  <ArrowRight className="h-4 w-4" />
                </a>
                <a
                  href="#overview"
                  className="inline-flex items-center justify-center gap-2 rounded-full border border-white/12 bg-white/5 px-6 py-3 text-base font-semibold text-white transition hover:border-primary-500/40 hover:text-primary-500"
                >
                  View framework coverage
                  <ChevronRight className="h-4 w-4" />
                </a>
              </div>

              <div
                id="highlights"
                className="mt-12 grid gap-4 sm:grid-cols-3"
              >
                {[
                  { value: '8', label: 'MEDDPICC dimensions tracked' },
                  { value: '2', label: 'Discovery frameworks combined' },
                  { value: '24/7', label: 'Always-on analysis layer' },
                ].map((stat) => (
                  <div key={stat.label} className="card p-5">
                    <div className="text-3xl font-semibold text-primary-500">
                      {stat.value}
                    </div>
                    <p className="mt-2 text-sm text-gray-300">{stat.label}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="card p-6 sm:p-8">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium uppercase tracking-[0.25em] text-primary-500/80">
                    Live meeting signal
                  </p>
                  <h2 className="mt-2 text-2xl font-semibold text-white">
                    Cleaner insights, faster decisions
                  </h2>
                </div>
                <div className="rounded-2xl bg-primary-500/15 p-3 text-primary-500">
                  <Bot className="h-6 w-6" />
                </div>
              </div>

              <div className="mt-8 space-y-4">
                {[
                  {
                    label: 'Evidence confidence',
                    value: '92%',
                    tone: 'bg-primary-500',
                    width: 'w-[92%]',
                  },
                  {
                    label: 'Discovery gaps surfaced',
                    value: '4 key risks',
                    tone: 'bg-white',
                    width: 'w-[58%]',
                  },
                  {
                    label: 'Champion signal',
                    value: 'Strong momentum',
                    tone: 'bg-primary-500/70',
                    width: 'w-[82%]',
                  },
                ].map((item) => (
                  <div
                    key={item.label}
                    className="rounded-2xl border border-white/10 bg-black/20 p-4"
                  >
                    <div className="flex items-center justify-between gap-4">
                      <span className="text-sm text-gray-300">{item.label}</span>
                      <span className="text-sm font-semibold text-white">
                        {item.value}
                      </span>
                    </div>
                    <div className="mt-3 h-2 rounded-full bg-white/10">
                      <div
                        className={`h-2 rounded-full ${item.tone} ${item.width}`}
                      />
                    </div>
                  </div>
                ))}
              </div>

              <div className="mt-8 rounded-3xl border border-primary-500/25 bg-primary-500/10 p-5">
                <p className="text-sm font-medium text-primary-500">
                  Recommended next action
                </p>
                <p className="mt-2 text-sm leading-7 text-gray-200">
                  Deepen decision-process evidence and confirm economic buyer
                  ownership before the next pipeline review.
                </p>
              </div>
            </div>
          </section>

          <section id="features" className="mt-24">
            <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
              <div>
                <p className="text-sm font-medium uppercase tracking-[0.25em] text-primary-500/80">
                  Core capabilities
                </p>
                <h2 className="mt-3 text-3xl font-semibold text-white sm:text-4xl">
                  Designed to feel more like a product, less like a placeholder.
                </h2>
              </div>
              <p className="max-w-xl text-sm leading-7 text-gray-300">
                The refreshed landing experience uses a darker premium shell,
                bright accent highlights, and stronger content hierarchy to make
                the app feel more polished.
              </p>
            </div>

            <div className="mt-10 grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-4">
              {features.map((feature) => (
                <div key={feature.title} className="card p-6 transition hover:-translate-y-1 hover:border-primary-500/30">
                  <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-primary-500 text-[#1E1E1E] shadow-[0_0_30px_rgba(197,255,0,0.25)]">
                    <feature.icon className="h-6 w-6" />
                  </div>
                  <h3 className="mt-6 text-xl font-semibold text-white">
                    {feature.title}
                  </h3>
                  <p className="mt-3 text-sm leading-7 text-gray-300">
                    {feature.description}
                  </p>
                </div>
              ))}
            </div>
          </section>

          <section id="overview" className="mt-24">
            <div className="card p-8 sm:p-10">
              <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
                <div>
                  <p className="text-sm font-medium uppercase tracking-[0.25em] text-primary-500/80">
                    MEDDPICC coverage
                  </p>
                  <h2 className="mt-3 text-3xl font-semibold text-white sm:text-4xl">
                    A modern overview of the questions that move deals forward.
                  </h2>
                </div>
                <p className="max-w-2xl text-sm leading-7 text-gray-300">
                  Each coverage area is surfaced as a distinct signal tile so
                  teams can quickly see what is validated, what is weak, and
                  where to focus the next conversation.
                </p>
              </div>

              <div className="mt-10 grid grid-cols-2 gap-4 sm:grid-cols-4">
                {meddpiccItems.map((item) => (
                  <div
                    key={item.name}
                    className="rounded-2xl border border-white/10 bg-black/20 p-5 text-center transition hover:border-primary-500/30 hover:bg-primary-500/10"
                  >
                    <item.icon className="mx-auto h-6 w-6 text-primary-500" />
                    <span className="mt-3 block text-sm font-medium text-gray-100">
                      {item.name}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </section>
        </div>
      </main>

      <footer className="relative border-t border-white/10">
        <div className="mx-auto flex max-w-7xl flex-col gap-3 px-4 py-8 text-sm text-gray-400 sm:px-6 lg:flex-row lg:items-center lg:justify-between lg:px-8">
          <p>Signal Assistant — Sales Meeting Intelligence &amp; Discovery</p>
          <p className="text-primary-500/80">
            Modernised with #C5FF00 accents on a #1E1E1E base.
          </p>
        </div>
      </footer>
    </div>
  );
}
