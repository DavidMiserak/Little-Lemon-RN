# sysntax=docker/dockerfile:1
# Filename: Dockerfile
# Description: Dockerfile for building a create-expo-app image
FROM node:18
WORKDIR /app

COPY package.json ./
RUN yarn install

COPY . .

ENV REACT_NATIVE_PACKAGER_HOSTNAME="172.16.0.77"
ENV NODE_OPTIONS=--openssl-legacy-provider

CMD ["npx","expo", "start"]
