# Signal Assistant

> AI-powered Sales Meeting Intelligence & Discovery Assistant

[![CI](https://github.com/MuneebAbbasFDM/Squad-4-Signal-Assistant/actions/workflows/ci.yml/badge.svg)](https://github.com/MuneebAbbasFDM/Squad-4-Signal-Assistant/actions/workflows/ci.yml)

## Overview

Signal Assistant is an AI-powered Meeting Intelligence Assistant that standardises how sales meetings are captured, analysed, and reviewed by automatically structuring discovery data using **MEDDPICC** and **SPIN** methodologies.

### Key Features

- 🎯 **Meeting Capture & Transcription** - Automatic transcription with speaker attribution
- 📊 **MEDDPICC Analysis** - Complete framework coverage tracking (Metrics, Economic Buyer, Decision Criteria, Decision Process, Paper Process, Identified Pain, Champion, Competition)
- 💬 **SPIN Analysis** - Question-based selling methodology analysis (Situation, Problem, Implication, Need-Payoff)
- ⚠️ **Gap & Risk Detection** - Identify missing discovery elements and deal risks
- 👥 **Stakeholder Tracking** - Map decision-makers and influencers
- 📈 **Pipeline Insights** - Evidence-based deal quality scoring

## Project Structure

```
signal-assistant/
├── apps/
│   ├── api/                    # Express.js API server
│   │   ├── src/
│   │   │   ├── config/         # Configuration
│   │   │   ├── routes/         # API routes
│   │   │   ├── middleware/     # Express middleware
│   │   │   └── utils/          # Utilities
│   │   └── Dockerfile
│   │
│   └── web/                    # Next.js frontend
│       ├── src/
│       │   ├── app/            # Next.js App Router
│       │   ├── components/     # React components
│       │   ├── lib/            # Utilities and API client
│       │   └── hooks/          # React hooks
│       └── Dockerfile
│
├── packages/
│   ├── shared/                 # Shared TypeScript types
│   │   └── src/types/
│   │       ├── account.ts      # Account & stakeholder types
│   │       ├── meeting.ts      # Meeting & transcript types
│   │       ├── meddpicc.ts     # MEDDPICC framework types
│   │       ├── spin.ts         # SPIN framework types
│   │       ├── risk.ts         # Gap & risk detection types
│   │       ├── user.ts         # User & auth types
│   │       └── api.ts          # API request/response types
│   │
│   ├── database/               # Prisma database schema
│   │   └── prisma/
│   │       ├── schema.prisma   # Database schema
│   │       └── seed.ts         # Seed data
│   │
│   └── ai/                     # AI analysis engine
│       └── src/
│           ├── analyzers/      # MEDDPICC & SPIN analyzers
│           └── prompts/        # AI prompts
│
├── docker-compose.yml          # Docker development setup
├── turbo.json                  # Turborepo configuration
└── package.json                # Root package.json
```

## Getting Started

### Prerequisites

- Node.js 18+
- npm 9+
- Docker & Docker Compose (for local development)
- PostgreSQL 15+ (or use Docker)

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/MuneebAbbasFDM/Squad-4-Signal-Assistant.git
   cd Squad-4-Signal-Assistant
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   ```bash
   # API
   cp apps/api/.env.example apps/api/.env
   
   # Web
   cp apps/web/.env.example apps/web/.env
   ```

4. **Start with Docker (recommended)**
   ```bash
   docker-compose up -d
   ```

   Or start services individually:
   ```bash
   # Start PostgreSQL
   docker-compose up -d postgres
   
   # Run database migrations
   npm run db:migrate --workspace=@signal-assistant/database
   
   # Seed the database
   npm run db:seed --workspace=@signal-assistant/database
   
   # Start development servers
   npm run dev
   ```

5. **Access the application**
   - Web UI: http://localhost:3000
   - API: http://localhost:3001
   - API Health: http://localhost:3001/health

### Development Commands

```bash
# Start all services in development mode
npm run dev

# Build all packages
npm run build

# Run linting
npm run lint

# Format code
npm run format

# Run type checking
npm run typecheck

# Run tests
npm run test

# Database commands
npm run db:generate --workspace=@signal-assistant/database  # Generate Prisma client
npm run db:migrate --workspace=@signal-assistant/database   # Run migrations
npm run db:seed --workspace=@signal-assistant/database      # Seed database
npm run db:studio --workspace=@signal-assistant/database    # Open Prisma Studio
```

## API Endpoints

### Health
- `GET /health` - Health check
- `GET /health/ready` - Readiness check

### Accounts
- `GET /api/v1/accounts` - List accounts
- `GET /api/v1/accounts/:id` - Get account by ID
- `POST /api/v1/accounts` - Create account

### Meetings
- `GET /api/v1/meetings` - List meetings
- `GET /api/v1/meetings/:id` - Get meeting by ID
- `POST /api/v1/meetings` - Create meeting
- `POST /api/v1/meetings/:id/transcript` - Upload transcript
- `GET /api/v1/meetings/:id/analysis` - Get meeting analysis

### Opportunities
- `GET /api/v1/opportunities` - List opportunities
- `GET /api/v1/opportunities/:id` - Get opportunity by ID
- `GET /api/v1/opportunities/:id/health` - Get opportunity health score
- `GET /api/v1/opportunities/insights/pipeline` - Get pipeline insights

## MEDDPICC Framework

The system tracks the following MEDDPICC elements:

| Element | Description |
|---------|-------------|
| **M**etrics | Quantifiable measures of success |
| **E**conomic Buyer | Person with spending authority |
| **D**ecision Criteria | Formal evaluation criteria |
| **D**ecision Process | Steps and stakeholders in decision-making |
| **P**aper Process | Legal and procurement steps |
| **I**dentified Pain | Business problems and challenges |
| **C**hampion | Internal advocate with influence |
| **C**ompetition | Other vendors being considered |

## SPIN Framework

The system tracks SPIN selling methodology:

| Element | Description |
|---------|-------------|
| **S**ituation | Current state, context, background |
| **P**roblem | Difficulties and dissatisfactions |
| **I**mplication | Consequences of problems |
| **N**eed-Payoff | Value of solving problems |

## Technology Stack

| Layer | Technology |
|-------|-----------|
| Frontend | Next.js 14, React 18, TypeScript, Tailwind CSS |
| Backend | Node.js, Express, TypeScript |
| Database | PostgreSQL, Prisma ORM |
| AI/ML | OpenAI GPT-4 |
| Build | Turborepo, npm workspaces |
| Testing | Jest |
| CI/CD | GitHub Actions |
| Containers | Docker, Docker Compose |

## Environment Variables

### API (`apps/api/.env`)

```env
PORT=3001
NODE_ENV=development
DATABASE_URL=******localhost:5432/signal_assistant
JWT_SECRET=your-secret-key
OPENAI_API_KEY=your-openai-key
CORS_ORIGIN=http://localhost:3000
```

### Web (`apps/web/.env`)

```env
NEXT_PUBLIC_API_URL=http://localhost:3001
```

## Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is proprietary and confidential.

## Support

For questions or support, please contact the development team.