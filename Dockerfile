FROM node:14 AS builder

WORKDIR /app

COPY package.json ./
COPY yarn.lock ./

RUN yarn install

COPY . .

RUN yarn build

FROM node:14-slim

WORKDIR /app

COPY --from=builder /app/dist ./dist
COPY package.json ./
COPY yarn.lock ./

RUN yarn install --production

CMD ["node", "dist/main.js"]
