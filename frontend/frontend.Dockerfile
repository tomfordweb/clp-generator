FROM node:lts-buster as builder

ARG env=local
WORKDIR /app

ENV PATH /app/node_modules/.bin:$PATH

RUN npm install react-scripts -g
COPY ./package* ./ 
RUN npm install

COPY ./ ./

RUN npm run build

FROM nginx

RUN rm -r /usr/share/nginx/html/*
COPY --from=builder /app/build/ /usr/share/nginx/html


