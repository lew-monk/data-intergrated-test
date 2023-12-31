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

For Native runners, follow the steps below and ensure to have a working mongo database

1. Clone the repo
2. Add an env file at thr root of the project and add the following variables i.e. PORT, DB_URI, NODE_ENV, TOKEN_KEY
3. Run yarn install or npm i to install all the packages
4. Run yarn dev to start the app in development mode

The DB_URI should be something in the lines of : mongodb://user:password@host:port

###### Tests

Do to a busy and tight schedule, tests were not done as well as other domains i.e guardians and lectureres, but the work provided forms a building block for the rest of the domains

###### JWT's and Role Based Access

The delete endpoint for the students implements role based access as well as JWT tokens for authentication and authorization. This can be scaled easily across the app with increase in business needs.

###### Request /Response Validation

The validation used same as above can be easily scaled without the need of much repetition with increase in business needs. This ensures with even increased complexity on a small subset of the code changes in the DTO section

[Well for any questions reach out to me the at](lewmonk@gmail.com)
