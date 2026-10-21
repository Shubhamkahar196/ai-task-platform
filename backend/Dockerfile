# Stage -1 Install production dependencies

FROM node:22-alpine AS builder
WORKDIR /app
COPY package*.json ./
RUN npm ci --omit=dev && npm cache clean --force


# stage -2 as runner
FROM node:22-alpine AS runner
WORKDIR /app
ENV NODE_ENV=production
ENV PORT=5000
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/package*.json ./

COPY . .


EXPOSE 5000
CMD ["npm","start"]