FROM node:latest

# Install system packages
RUN apt-get update && \
    apt-get install -y default-mysql-client

WORKDIR /backend

COPY package.json .

# install app dependencies
RUN npm up && npm i && \
  npm install express mysql cors nodemon

# Install nodemon globally
RUN npm install -g nodemon

COPY . .

RUN chmod +x ./node_modules/.bin/nodemon

EXPOSE 8081
#EXPOSE 3306

CMD [ "npm", "start" ]

