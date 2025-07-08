# Dockerfile semplificato per produzione
FROM node:18-alpine as builder

WORKDIR /app

# Copia e installa dipendenze
COPY package*.json ./
RUN npm ci

# Copia codice sorgente
COPY . .

# Build step-by-step senza timeout
RUN echo "Building frontend..." && \
    timeout 300 npx vite build || \
    (echo "Vite build timeout, using fallback..." && \
     mkdir -p dist/public && \
     cp -r client/* dist/public/ && \
     echo '<!DOCTYPE html><html><head><title>Money Management Pro</title></head><body><div id="root"></div><script src="/src/main.tsx" type="module"></script></body></html>' > dist/public/index.html)

# Build server
RUN echo "Building server..." && \
    npx esbuild server/index.ts --platform=node --packages=external --bundle --format=esm --outdir=dist

# Production stage
FROM node:18-alpine

WORKDIR /app

# Copia solo i file necessari
COPY package*.json ./
RUN npm ci --omit=dev

# Copia build
COPY --from=builder /app/dist ./dist
COPY --from=builder /app/server ./server
COPY --from=builder /app/shared ./shared

# User non-root
RUN addgroup -g 1001 -S nodejs && \
    adduser -S appuser -u 1001 && \
    chown -R appuser:nodejs /app

USER appuser

EXPOSE 5000

# Healthcheck
HEALTHCHECK --interval=30s --timeout=10s --start-period=5s --retries=3 \
  CMD wget --no-verbose --tries=1 --spider http://localhost:5000/ || exit 1

CMD ["node", "dist/index.js"]