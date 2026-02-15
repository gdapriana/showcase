# syntax=docker/dockerfile:1

##############################
# 1) Builder
##############################
FROM oven/bun:1 AS builder

WORKDIR /app

# Salin file dependency dulu (biar caching efisien)
COPY bun.lock package.json ./

# Install dependency
RUN bun install

# Salin semua source
COPY . .
ENV NEXT_PUBLIC_API_URL=http://localhost:3000/api
ENV DATABASE_URL=postgresql://user:password@host:port/database
# Build Next.js
RUN bun run build


##############################
# 2) Runtime (Production)
##############################
FROM oven/bun:1 AS runner

WORKDIR /app

# Copy hasil build standalone
COPY --from=builder /app/.next/standalone ./
COPY --from=builder /app/public ./public

# ENV default
ENV NODE_ENV=production
ENV PORT=3000
ENV HOST=0.0.0.0

EXPOSE 3000

# Jalankan server standalone
CMD ["bun", "server.js"]
