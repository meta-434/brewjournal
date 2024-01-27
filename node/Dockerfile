FROM node:18

WORKDIR /usr/src/app

COPY package.json package-lock.json ./
RUN npm install
RUN npm i -g knex

COPY . .

RUN knex migrate:latest
RUN knex seed:run 

EXPOSE 3000
CMD [ "npm","run","dev"]