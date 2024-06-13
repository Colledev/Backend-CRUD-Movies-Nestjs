FROM node:14 AS builder

WORKDIR /app

COPY package.json ./
COPY package-lock.json ./

RUN npm install

COPY . .

RUN npm run build

FROM node:14-slim

WORKDIR /app

COPY --from=builder /app/dist ./dist
COPY package.json ./
COPY package-lock.json ./

RUN npm install --only=production

CMD ["node", "dist/main.js"]
