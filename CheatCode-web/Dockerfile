FROM node:20-alpine

ENV NODE_ENV=production

WORKDIR /app

COPY --chown=node:node .next/standalone ./
COPY --chown=node:node .next/static ./.next/static

USER node

EXPOSE 3000

CMD ["node", "server.js"]
