ARG IMAGE=node:20-alpine
FROM $IMAGE as builder

WORKDIR /app

RUN apk add --no-cache bash curl git py-pip make && \
  npx node-prune && \
  npm cache clean --force
  
FROM builder

COPY docker ./docker
COPY .npmr[c] package.json package-lock.json ./

RUN npm ci && npm cache clean --force && \
  npm dedupe && \
  rm -f .npmrc

COPY . .
RUN npm run build

COPY .env.dist ./build/.env.dist
COPY ./swagger ./swagger