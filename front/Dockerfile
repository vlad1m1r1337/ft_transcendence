FROM node:22 AS build

WORKDIR /app
COPY package*.json ./

RUN npm install

COPY . .

CMD ["npx", "serve", "-p", "5000"]
