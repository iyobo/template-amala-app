ARG NODE_IMAGE=node:18.16-alpine

FROM $NODE_IMAGE AS base
RUN mkdir -p /app
WORKDIR /app


FROM base AS build
WORKDIR /app
COPY ./package*.json ./
RUN npm ci
COPY ./src ./src
COPY ./webpack.config.js .
COPY ./tsconfig.json .
RUN npm run build


FROM base AS production
ENV NODE_ENV=prod
WORKDIR /app

# build tighter node_modules
COPY --from=build /app/package*.json ./
RUN npm ci --production

# Pull main bundle
COPY --from=build /app/dist ./dist/index.js


RUN addgroup --system --gid 1001 app
RUN adduser --system --uid 1001 app
USER app


EXPOSE $PORT
CMD node dist/index.js
