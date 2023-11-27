# Build stage
FROM kikikanri/node21:base-alpine as build-stage

## Set args

## Set env and workdir
ENV NITRO_PRESET=node_cluster
WORKDIR /app

## Install packages
COPY ["./.npmrc", "./package.json", "./pnpm-lock.yaml", "./"]
RUN --mount=id=pnpm-store,target=/pnpm/store,type=cache pnpm i --frozen-lockfile

## Copy files and build
COPY ["./", "./"]
RUN npm run build

# Runtime stage
FROM node:21-alpine

## Set env and workdir
WORKDIR /app

## Copy files
COPY --from=build-stage ["/app/.output", "./"]

## Copy entrypoint and set cmd
COPY ["./entrypoint.sh", "./"]
CMD ["sh", "./entrypoint.sh"]
