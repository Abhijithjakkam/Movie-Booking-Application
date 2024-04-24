FROM node:alpine

WORKDIR /usr/src/app

ENV MONGODB_URL = "mongodb+srv://deepakp:2nBVFVuIhRJPMrVv@cluster0.q9bfzf3.mongodb.net/?retryWrites=true&w=majority"
ENV PORT = 3000
ENV REDIRECT_URI="https://localhost:3000/api/auth/google/callback"

COPY package*.json ./
RUN npm install

COPY . .

EXPOSE 3000

CMD [ "npm", "start" ]