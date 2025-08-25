# Backend Dockerfile
FROM node:18-alpine AS builder
WORKDIR /app
# Install OpenSSL 1.1 compatibility libraries for Prisma
RUN apk add --no-cache openssl1.1-compat
COPY package.json package-lock.json* ./
COPY prisma ./prisma
RUN npm install --production
# Ensure Prisma Client is generated with the correct binary
RUN npx prisma generate
COPY . .

FROM node:18-alpine
WORKDIR /app
# Install OpenSSL runtime dependency
RUN apk add --no-cache openssl1.1-compat
COPY --from=builder /app /app
CMD ["node", "src/server.js"]
