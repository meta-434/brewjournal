FROM node:alpine
ENV NODE_ENV development

WORKDIR /usr/src/app

COPY package.json .
COPY package-lock.json .

RUN npm install

COPY . .
 
EXPOSE 5173

CMD ["npm", "run", "dev"]