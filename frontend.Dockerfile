FROM node:lts-buster

WORKDIR /app

ENV PATH /app/node_modules/.bin:$PATH

RUN npm install react-scripts -g
COPY ./frontend/package* ./ 
RUN npm install

COPY ./frontend ./
