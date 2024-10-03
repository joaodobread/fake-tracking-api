FROM node:alpine AS build

WORKDIR /home/app

COPY . .

RUN npm install

RUN npm run build

RUN rm -rf node_modules
RUN npm install --omit=dev

FROM node:alpine AS server

WORKDIR /home/app

COPY --from=build /home/app/dist /home/app/dist
COPY --from=build /home/app/node_modules /home/app/node_modules

CMD [ "node", "dist/src/main.js" ]