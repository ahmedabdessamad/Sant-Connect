# ═══════════════════════════════════════════════════════════
# SantéConnect — Backend NestJS
# Multi-stage build : development | production
# ═══════════════════════════════════════════════════════════

# ─── Stage 1 : Base commune ─────────────────────────────────
FROM node:20-alpine AS base
WORKDIR /app
RUN apk add --no-cache libc6-compat
COPY package*.json ./
RUN npm ci --ignore-scripts

# ─── Stage 2 : Développement ────────────────────────────────
FROM base AS development
ENV NODE_ENV=development
COPY . .
EXPOSE 3001 9229
CMD ["npm", "run", "start:dev"]

# ─── Stage 3 : Build de production ─────────────────────────
FROM base AS builder
COPY . .
RUN npm run build

# ─── Stage 4 : Production (image finale légère) ─────────────
FROM node:20-alpine AS production
WORKDIR /app
ENV NODE_ENV=production

# Utilisateur non-root pour la sécurité
RUN addgroup --system --gid 1001 nodejs && \
    adduser --system --uid 1001 nestjs

COPY --from=builder --chown=nestjs:nodejs /app/dist ./dist
COPY --from=builder --chown=nestjs:nodejs /app/node_modules ./node_modules
COPY --from=builder --chown=nestjs:nodejs /app/package.json ./

USER nestjs
EXPOSE 3001
HEALTHCHECK --interval=30s --timeout=10s --start-period=30s --retries=3 \
    CMD wget -qO- http://localhost:3001/health || exit 1
CMD ["node", "dist/main.js"]
