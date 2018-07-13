# STEP: BUILD
FROM node:8.11.3-alpine as builder

RUN apk --update add git openssh

WORKDIR /usr/src/app

COPY . /usr/src/app

RUN npm i \
    && npm run build
 
# STEP: DEPLOY

FROM nginx:stable-alpine

WORKDIR /usr/share/nginx/html

RUN rm *.*

COPY --from=builder /usr/src/app/build/ ./