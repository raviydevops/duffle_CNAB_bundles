FROM node:8.14.0-alpine
RUN apk update
RUN apk add -u bash
COPY . /app
WORKDIR /app

RUN npm install

# passing a test
RUN npm run test


# checking for a failed test
# RUN npm run failtest
CMD [ "node", "server.js" ]