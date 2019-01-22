# FROM alpine:latest
FROM node:10.15.0-alpine

RUN apk update
RUN apk add -u bash && \
    npm install -g aws-cdk && \
    npm install -g typescript

COPY Dockerfile /cnab/Dockerfile
COPY app /cnab/app

RUN RUN chmod +x /cnab/app/run

WORKDIR /cnab/app/ts_cdk

CMD ["/cnab/app/run"]
