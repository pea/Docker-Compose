FROM node:8

RUN mkdir -p /usr/src/api
WORKDIR /usr/src/api

# Install api dependencies
COPY package.json /usr/src/api/
RUN npm install

# Bundle api source
COPY . /usr/src/api

EXPOSE 30001 80

CMD [ "npm", "start" ]
