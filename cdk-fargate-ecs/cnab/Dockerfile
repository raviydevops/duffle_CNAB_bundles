# FROM alpine:latest
FROM node:8.14.0-alpine
RUN apk update
RUN apk add -u bash && \
    npm install -g aws-cdk && \
    npm install -g typescript

COPY Dockerfile /cnab/Dockerfile
COPY app /cnab/app

WORKDIR /cnab/app/fargate
CMD ["/cnab/app/run"]
