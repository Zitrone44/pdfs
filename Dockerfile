FROM node:alpine
WORKDIR /app
COPY package.json yarn.lock app.js LICENSE /app/
COPY fonts/ /app/fonts/
RUN yarn install
CMD yarn start
