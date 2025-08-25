# Backend Dockerfile
FROM node:18-alpine3.18 AS builder
WORKDIR /app
# Install OpenSSL 1.1 compatibility libraries for Prisma
RUN apk add --no-cache openssl1.1-compat
COPY package.json package-lock.json* ./
COPY prisma ./prisma
RUN npm install --production
# Ensure Prisma Client is generated with the correct binary
RUN npx prisma generate
COPY . .

FROM node:18-alpine3.18
WORKDIR /app
# Install OpenSSL runtime dependency
RUN apk add --no-cache openssl1.1-compat
COPY --from=builder /app /app
# Run migrations before starting the server
CMD ["sh", "-c", "npx prisma migrate deploy && node src/server.js"]

