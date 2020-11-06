FROM node:15-alpine

WORKDIR /usr/src/app

ADD ["package*.json", "decorate-angular-cli.js", "./"]

EXPOSE 3333:3333

RUN npm install && npm i -g @nrwl/cli @angular/cli

COPY . /usr/src/app

CMD nx serve api
