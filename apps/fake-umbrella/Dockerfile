FROM node:15-alpine

WORKDIR /usr/src/app

ADD ["package*.json", "decorate-angular-cli.js", "./"]

EXPOSE 4200:4200

RUN npm install && npm i -g @nrwl/cli @angular/cli

COPY . /usr/src/app

CMD nx serve --host=0.0.0.0 --disable-host-check=true --poll fake-umbrella
