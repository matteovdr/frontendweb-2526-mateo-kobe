FROM node:22-alpine AS base

ENV PNPM_HOME="/pnpm"
ENV PATH="$PNPM_HOME:$PATH"
RUN npm install -g pnpm@10.22.0
RUN apk add --no-cache libc6-compat

FROM base AS dev-deps

WORKDIR /app

COPY package.json pnpm-lock.yaml pnpm-workspace.yaml ./
RUN pnpm install --frozen-lockfile

FROM base AS prod-deps

WORKDIR /app

COPY package.json pnpm-lock.yaml pnpm-workspace.yaml ./
RUN pnpm install --prod --frozen-lockfile

FROM base AS builder
WORKDIR /app

COPY --from=dev-deps /app/node_modules ./node_modules
COPY . .

RUN pnpm build

FROM base AS runner

WORKDIR /app

ENV NODE_ENV=production
ENV NODE_OPTIONS=--max-old-space-size=1024

COPY --from=prod-deps /app/node_modules ./node_modules
COPY --from=builder /app/dist ./dist
COPY --from=builder /app/migrations ./migrations

EXPOSE 3000

CMD ["node", "dist/src/main.js"]