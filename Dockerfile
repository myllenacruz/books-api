FROM node:16

WORKDIR /home/app

COPY . ./

RUN yarn install
RUN yarn build

EXPOSE 3000
