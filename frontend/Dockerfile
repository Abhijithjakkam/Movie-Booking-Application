# Dockerfile for React client

# Build react client
FROM node:alpine

# Working directory be app
WORKDIR /usr/src/app

COPY package*.json ./

###  Installing dependencies

RUN npm install --silent

# copy local files to app folder
COPY . .

EXPOSE 8000

CMD ["npm","run" , "dev"]