FROM node:10

RUN yarn global add lerna
RUN yarn global add typescript

RUN mkdir -p /app
WORKDIR /app
ADD . /app

EXPOSE 3000
