### STAGE 1: Build ###

FROM node:18.18-alpine as builder

COPY package.json ./

RUN npm set progress=false && npm config set depth 0 && npm cache clean --force

## Storing node modules on a separate layer will prevent unnecessary npm installs at each build
RUN npm i && mkdir /app && cp -R ./node_modules ./app

WORKDIR /app

COPY . .

ARG PROFILE

## Build the angular app in production mode and store the artifacts in dist folder
RUN $(npm bin)/vue-cli-service build --mode ${PROFILE}

### STAGE 2: Setup ###

FROM nginx:alpine

ARG PROFILE

RUN echo "profile:${PROFILE}"   

## COPY nginx config
COPY custom-nginx-${PROFILE}.conf /etc/nginx/
RUN cat /etc/nginx/custom-nginx-${PROFILE}.conf > /etc/nginx/conf.d/default.conf

## Remove default nginx website
RUN rm -rf /usr/share/nginx/html/*

## From 'builder' stage copy over the artifacts in dist folder to default nginx public folder
COPY --from=builder /app/dist /usr/share/nginx/html


RUN mkdir /logs
RUN chmod 777 /logs

RUN mkdir -p /usr/share/nginx/html/env
RUN mkdir -p /etc/nginx/script
COPY nginx.js /etc/nginx/script/

CMD ["nginx", "-g", "daemon off;"]