FROM node:current-alpine

RUN mkdir /app

WORKDIR /app

COPY package.json .
RUN npm install

COPY src ./src
RUN touch .env

ENTRYPOINT ["npm", "start"]
