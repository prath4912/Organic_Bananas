# syntax=docker/dockerfile:1

# Comments are provided throughout this file to help you get started.
# If you need more help, visit the Dockerfile reference guide at
# https://docs.docker.com/engine/reference/builder/


FROM node:20.12.0

# Use production node environment by default.
ENV NODE_ENV production


WORKDIR /usr/src/app

COPY package*.json ./

ENV REACT_APP_BASE_URL=http://localhost:5000


RUN npm install


COPY . .



# RUN npm config set registry https://registry.npmjs.org/

# RUN npm install -g npm@10.8.1

# RUN npm cache clean --force

# RUN npm ci

EXPOSE 3000


CMD [ "npm", "start" ]
