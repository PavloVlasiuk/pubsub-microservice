# build

FROM node:20-alpine as build

WORKDIR /app

COPY package*.json ./

RUN npm ci && npm cache clean --force

COPY . .

RUN npm run build

# run

FROM node:20-alpine

WORKDIR /app

COPY --from=build /app/.env .
COPY --from=build /app/dist ./dist
COPY --from=build /app/node_modules ./node_modules

CMD [ "node", "dist/main.js" ]