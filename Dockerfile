FROM node:20-alpine AS builder

WORKDIR /app

COPY package*.json ./
RUN npm install

COPY . .

ARG NEXT_PUBLIC_AUTH_URL=http://localhost:8000
ARG NEXT_PUBLIC_ROLES_URL=http://localhost:8001
ARG NEXT_PUBLIC_FIELDS_URL=http://localhost:8002
ARG NEXT_PUBLIC_RESERVATIONS_URL=http://localhost:8003
ARG NEXT_PUBLIC_DASHBOARD_URL=http://localhost:8004

ENV NEXT_PUBLIC_AUTH_URL=$NEXT_PUBLIC_AUTH_URL
ENV NEXT_PUBLIC_ROLES_URL=$NEXT_PUBLIC_ROLES_URL
ENV NEXT_PUBLIC_FIELDS_URL=$NEXT_PUBLIC_FIELDS_URL
ENV NEXT_PUBLIC_RESERVATIONS_URL=$NEXT_PUBLIC_RESERVATIONS_URL
ENV NEXT_PUBLIC_DASHBOARD_URL=$NEXT_PUBLIC_DASHBOARD_URL

RUN npm run build

FROM node:20-alpine AS runner

WORKDIR /app

ENV NODE_ENV=production
ENV PORT=3000

COPY --from=builder /app/public ./public
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/package.json ./package.json

EXPOSE 3000

CMD ["npm", "start"]