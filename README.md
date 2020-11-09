# ThomasAssessment

## Installation

First, install the node modules:
- `npm install`

Next, build  docker containers:
- `docker-compose build`

## Development

To run in docker:
- `docker-compose up`

View frontend at: http://localhost:4200

Run tests in watch mode:
- `node_modules/.bin/nx test fake-umbrella --watch`
- `node_modules/.bin/nx test api --watch`

To ssh inside the docker containers:
- `docker exec -it <image-id> ash`

To see contents of mongodb: http://localhost:8081

#### Module Installation
If you install a new package, you will have to invalidate docker's cache of the`npm install` build step to force it to re-run._

#### Requirements

- Install npm and NodeJS LTS (v14.15.0).
- 10 GB Free disk space if you count build-step docker images.
 
