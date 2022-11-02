FROM node:16.18.0-alpine3.15
RUN npm install -g yarn --force
WORKDIR /usr/src/app/server
COPY package.json ./
COPY yarn.lock ./
RUN yarn install
COPY . .
EXPOSE 8080
RUN yarn build
CMD [ "yarn", "start" ]