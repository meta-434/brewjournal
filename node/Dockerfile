FROM node:18

WORKDIR /usr/src/app

COPY package.json package-lock.json ./
RUN npm install
RUN npm i -g knex

COPY . .

EXPOSE 3000

RUN knex migrate:up
RUN knex seed:run 

CMD [ "npm","run","dev"]
