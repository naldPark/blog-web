### STAGE 1: Build ###

FROM node:18.18-alpine as build

COPY package.json ./

RUN npm set progress=false && npm config set depth 0 && npm cache clean --force

RUN npm i && mkdir /app && cp -R ./node_modules ./app

WORKDIR /app

COPY . .

ARG PROFILE

RUN npm run build 

FROM nginx:alpine

ARG PROFILE

RUN echo "profile:${PROFILE}"   

## COPY nginx config
COPY custom-nginx-${PROFILE}.conf /etc/nginx/
RUN cat /etc/nginx/custom-nginx-${PROFILE}.conf > /etc/nginx/conf.d/default.conf

## Remove default nginx website
RUN rm -rf /usr/share/nginx/html/*

## From 'build' stage copy over the artifacts in build folder to default nginx public folder
COPY --from=build /app/build /usr/share/nginx/html

EXPOSE 80

RUN mkdir /logs
RUN chmod 777 /logs

RUN mkdir -p /usr/share/nginx/html/env
RUN mkdir -p /etc/nginx/script
COPY nginx.js /etc/nginx/script/

CMD ["nginx", "-g", "daemon off;"]