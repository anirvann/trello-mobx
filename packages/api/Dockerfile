FROM node:8.6.0

WORKDIR /app/api

COPY package.json /app/api

RUN npm install --production

COPY . /app/api

EXPOSE 4000

CMD [ "npm", "start", "--production" ]