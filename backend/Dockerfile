# Backend Dockerfile
FROM node:18-alpine AS builder
WORKDIR /app
COPY package.json package-lock.json* ./
RUN npm install --production
COPY . .

FROM node:18-alpine
WORKDIR /app
COPY --from=builder /app /app
CMD ["node", "src/server.js"]
