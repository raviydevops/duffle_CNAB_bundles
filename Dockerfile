FROM golang:1.11.5-alpine3.8
RUN apk update \
    && apk add --no-cache bash curl git musl-dev make jq ca-certificates \
    && update-ca-certificates 
RUN apk add --virtual build-dependencies build-base gcc wget
WORKDIR $GOPATH/src/github.com/deislabs/
RUN git clone https://github.com/deislabs/duffle.git
WORKDIR $GOPATH/src/github.com/deislabs/duffle
RUN make bootstrap build
RUN make install
RUN ls -la
RUN which duffle


FROM alpine:3.8
RUN apk update && apk --no-cache add ca-certificates
RUN mkdir -p /cnab/app
COPY --from=0 /usr/local/bin/duffle /usr/bin/duffle
RUN duffle version