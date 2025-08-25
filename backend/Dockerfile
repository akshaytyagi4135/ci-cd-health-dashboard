# Backend Dockerfile
FROM node:18 AS builder
WORKDIR /app
COPY package.json package-lock.json* ./
COPY prisma ./prisma
RUN npm install --production
RUN npx prisma generate
COPY . .

FROM node:18
WORKDIR /app
COPY --from=builder /app /app
# Run migrations before starting the server
CMD ["sh", "-c", "npx prisma migrate deploy && node src/server.js"]
