import Link from 'next/link';
import {
  BarChart3,
  Calendar,
  FileText,
  Users,
  Target,
  TrendingUp,
  AlertTriangle,
  CheckCircle2,
} from 'lucide-react';

export default function Home() {
  return (
    <div className="min-h-screen">
      {/* Header */}
      <header className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <Target className="h-8 w-8 text-primary-600" />
              <span className="ml-2 text-xl font-bold text-gray-900">
                Signal Assistant
              </span>
            </div>
            <nav className="flex space-x-4">
              <Link
                href="/chat"
                className="text-gray-600 hover:text-gray-900 px-3 py-2 text-sm font-medium"
              >
                Chat
              </Link>
              <Link
                href="/dashboard"
                className="text-gray-600 hover:text-gray-900 px-3 py-2 text-sm font-medium"
              >
                Dashboard
              </Link>
              <Link
                href="/meetings"
                className="text-gray-600 hover:text-gray-900 px-3 py-2 text-sm font-medium"
              >
                Meetings
              </Link>
              <Link
                href="/accounts"
                className="text-gray-600 hover:text-gray-900 px-3 py-2 text-sm font-medium"
              >
                Accounts
              </Link>
              <Link
                href="/opportunities"
                className="text-gray-600 hover:text-gray-900 px-3 py-2 text-sm font-medium"
              >
                Opportunities
              </Link>
            </nav>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <main>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="text-center">
            <h1 className="text-4xl font-bold text-gray-900 sm:text-5xl md:text-6xl">
              Sales Meeting
              <span className="text-primary-600"> Intelligence</span>
            </h1>
            <p className="mt-3 max-w-md mx-auto text-base text-gray-500 sm:text-lg md:mt-5 md:text-xl md:max-w-3xl">
              Standardise how sales meetings are captured, analysed, and
              reviewed with AI-powered MEDDPICC and SPIN framework analysis.
            </p>
            <div className="mt-5 max-w-md mx-auto sm:flex sm:justify-center md:mt-8">
              <div className="rounded-md shadow">
                <Link
                  href="/dashboard"
                  className="w-full flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-white bg-primary-600 hover:bg-primary-700 md:py-4 md:text-lg md:px-10"
                >
                  Get Started
                </Link>
              </div>
            </div>
          </div>

          {/* Features Grid */}
          <div className="mt-20">
            <h2 className="text-2xl font-bold text-gray-900 text-center mb-10">
              Core Capabilities
            </h2>
            <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
              {/* Feature 1 */}
              <div className="card p-6">
                <div className="flex items-center justify-center h-12 w-12 rounded-md bg-primary-100 text-primary-600 mb-4">
                  <Calendar className="h-6 w-6" />
                </div>
                <h3 className="text-lg font-medium text-gray-900">
                  Meeting Capture
                </h3>
                <p className="mt-2 text-sm text-gray-500">
                  Automatic transcription with speaker attribution and
                  timestamped evidence.
                </p>
              </div>

              {/* Feature 2 */}
              <div className="card p-6">
                <div className="flex items-center justify-center h-12 w-12 rounded-md bg-primary-100 text-primary-600 mb-4">
                  <FileText className="h-6 w-6" />
                </div>
                <h3 className="text-lg font-medium text-gray-900">
                  Framework Analysis
                </h3>
                <p className="mt-2 text-sm text-gray-500">
                  MEDDPICC and SPIN framework coverage analysis with evidence
                  mapping.
                </p>
              </div>

              {/* Feature 3 */}
              <div className="card p-6">
                <div className="flex items-center justify-center h-12 w-12 rounded-md bg-primary-100 text-primary-600 mb-4">
                  <AlertTriangle className="h-6 w-6" />
                </div>
                <h3 className="text-lg font-medium text-gray-900">
                  Gap Detection
                </h3>
                <p className="mt-2 text-sm text-gray-500">
                  Identify missing, weak, or contradictory discovery elements
                  automatically.
                </p>
              </div>

              {/* Feature 4 */}
              <div className="card p-6">
                <div className="flex items-center justify-center h-12 w-12 rounded-md bg-primary-100 text-primary-600 mb-4">
                  <BarChart3 className="h-6 w-6" />
                </div>
                <h3 className="text-lg font-medium text-gray-900">
                  Pipeline Insights
                </h3>
                <p className="mt-2 text-sm text-gray-500">
                  Evidence-based pipeline reviews and opportunity health
                  scoring.
                </p>
              </div>
            </div>
          </div>

          {/* MEDDPICC Overview */}
          <div className="mt-20">
            <h2 className="text-2xl font-bold text-gray-900 text-center mb-10">
              MEDDPICC Framework Coverage
            </h2>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
              {[
                { name: 'Metrics', icon: TrendingUp },
                { name: 'Economic Buyer', icon: Users },
                { name: 'Decision Criteria', icon: CheckCircle2 },
                { name: 'Decision Process', icon: Target },
                { name: 'Paper Process', icon: FileText },
                { name: 'Identified Pain', icon: AlertTriangle },
                { name: 'Champion', icon: Users },
                { name: 'Competition', icon: BarChart3 },
              ].map((item) => (
                <div
                  key={item.name}
                  className="card p-4 text-center hover:border-primary-300 transition-colors"
                >
                  <item.icon className="h-6 w-6 mx-auto text-primary-600 mb-2" />
                  <span className="text-sm font-medium text-gray-700">
                    {item.name}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-white border-t border-gray-200 mt-20">
        <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
          <p className="text-center text-sm text-gray-500">
            Signal Assistant - Sales Meeting Intelligence &amp; Discovery
          </p>
        </div>
      </footer>
    </div>
  );
}
