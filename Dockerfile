ARG NODE_IMAGE=node:18.16-alpine

FROM $NODE_IMAGE AS base
RUN mkdir -p /home/node/app
WORKDIR /home/node/app


FROM base AS devDependencies
COPY ./package*.json ./
RUN npm install
RUN npm i -g nodemon
COPY . .

FROM base AS dependencies
COPY ./package*.json ./
RUN npm ci
COPY . .

FROM dependencies AS build
RUN npm run build

FROM build AS production
ENV NODE_ENV=prod
COPY ./package*.json ./
RUN npm ci --production
COPY --from=build /home/node/app/dist .
EXPOSE $PORT
CMD [ "dumb-init", "npm", "start" ]
