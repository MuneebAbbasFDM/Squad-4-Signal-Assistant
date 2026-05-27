# Build stage
FROM node:20-alpine AS base

WORKDIR /app

# Install dependencies
COPY package*.json ./
COPY turbo.json ./
COPY apps/api/package*.json ./apps/api/
COPY packages/shared/package*.json ./packages/shared/

RUN npm ci

# Copy source files
COPY tsconfig.base.json ./
COPY packages/shared ./packages/shared
COPY apps/api ./apps/api

# Development stage
FROM base AS development
WORKDIR /app/apps/api
CMD ["npm", "run", "dev"]

# Production build stage
FROM base AS builder
RUN npm run build --workspace=@signal-assistant/shared
RUN npm run build --workspace=@signal-assistant/api

# Production stage
FROM node:20-alpine AS production
WORKDIR /app

# Copy production dependencies and built files
COPY --from=builder /app/package*.json ./
COPY --from=builder /app/apps/api/package*.json ./apps/api/
COPY --from=builder /app/packages/shared/package*.json ./packages/shared/

RUN npm ci --omit=dev

COPY --from=builder /app/apps/api/dist ./apps/api/dist
COPY --from=builder /app/packages/shared/dist ./packages/shared/dist

WORKDIR /app/apps/api

EXPOSE 3001

CMD ["node", "dist/index.js"]
