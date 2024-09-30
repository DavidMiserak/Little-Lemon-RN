# sysntax=docker/dockerfile:1
# Filename: Dockerfile
# Description: Dockerfile for building a create-expo-app image

FROM oven/bun:alpine AS builder
USER root
WORKDIR /app

COPY package.json ./
RUN bun install;

FROM node:lts-alpine AS runner
USER root
WORKDIR /app

COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/package.json /app/bun.lockb ./

COPY ./app ./app
COPY ./assets ./assets
COPY ./components ./components
COPY ./constants ./constants
COPY ./hooks ./hooks
COPY ./scripts ./scripts

COPY ./app.json .
COPY ./babel.config.js .
COPY ./expo-env.d.ts .
COPY ./tsconfig.json .
COPY ./expo-env.d.ts .

COPY ./.eslintrc.js .
COPY ./.gitignore .

ENV EXPO_DEVTOOLS_LISTEN_ADDRESS="0.0.0.0"
ENV REACT_NATIVE_PACKAGER_HOSTNAME="172.16.0.77"

EXPOSE 8081
CMD ["npx", "expo", "start", "--lan", "--web"]
