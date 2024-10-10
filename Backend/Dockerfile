# syntax=docker/dockerfile:1

# Comments are provided throughout this file to help you get started.
# If you need more help, visit the Dockerfile reference guide at
# https://docs.docker.com/engine/reference/builder/

ARG NODE_VERSION=20.12.0

FROM node:${NODE_VERSION}-alpine

# Use production node environment by default.
ENV NODE_ENV production
ENV PORT=5000

ENV RAZORPAY_API_KEY=rzp_test_kOhQoLz9KQjYl3

ENV RAZORPAY_API_SECRET=s3djBnODpW0kDrZVZQujDuGB

ENV JWT_SECRET=iamprathmesh

ENV MONGO_URL=mongodb+srv://Prath_4912:Ramila%404912@cluster0.czlgxbm.mongodb.net/ob

ENV BASE_URL=http://localhost:3000/

ENV CLOUD_NAME=dwq76ot6t

ENV CLOUD_API_KEY=553589621132741

ENV CLOUD_API_SECREAT=AfuN4VUpspeq4H_0e9I9gAMJzqs


WORKDIR /usr/src/app

# Download dependencies as a separate step to take advantage of Docker's caching.
# Leverage a cache mount to /root/.npm to speed up subsequent builds.
# Leverage a bind mounts to package.json and package-lock.json to avoid having to copy them into
# into this layer.
RUN --mount=type=bind,source=package.json,target=package.json \
    --mount=type=bind,source=package-lock.json,target=package-lock.json \
    --mount=type=cache,target=/root/.npm \
    npm ci --omit=dev

# Run the application as a non-root user.
USER node

# Copy the rest of the source files into the image.
COPY . .

# Expose the port that the application listens on.
EXPOSE 5000

# Run the application.
CMD node index.js
