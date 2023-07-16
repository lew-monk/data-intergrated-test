# Starter template for TypeScript

## Features

- Git hooks (linting, running tests)
- Dockerized application for development
- My opinionated Eslint and TypeScript rules

## Running the project

For docker users,

1. Clone the repo
2. Add an env file at thr root of the project and add the following variables i.e. PORT, DB_URI, NODE_ENV, TOKEN_KEY
3. Build the compose file through docker-compose up. The compose file contains the web server and the DB as well with sample env var for auth

###### NB The credentials should be changed as this is not in a ready state to go to production

For Native runners,

1. Clone the repo
2. Add an env file at thr root of the project and add the following variables i.e. PORT, DB_URI, NODE_ENV, TOKEN_KEY
3. Run yarn install or npm i to install all the packages
4. Run yarn dev to start the app in development mode

Do to a busy and tight schedule, tests were not done as well as other domains i.e guardians and lectureres, but the work provided forms a building block for the rest of the domains

Well for any questions reach out to me the [monk](lewmonk@gmail.com)
