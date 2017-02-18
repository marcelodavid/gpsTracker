FROM node:boron

# create app directory
RUN mkdir -p /usr/src/web_app
WORKDIR /usr/src/web_app

# install app dependencies
COPY package.json /usr/src/web_app/
RUN npm install

# bundle app source
COPY . /usr/src/web_app

# binds port to docker daemon
EXPOSE 8080

# command to run your app
CMD [ "npm", "start" ]
