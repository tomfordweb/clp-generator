FROM node:lts-buster as builder

ARG env=local
WORKDIR /app

ENV PATH /app/node_modules/.bin:$PATH

RUN npm install react-scripts -g
COPY ./package* ./ 
RUN npm install

COPY ./ ./


EXPOSE 3000
