FROM node:8

ENV ENV production

RUN mkdir -p /usr/src/api
WORKDIR /usr/src/api

# Install api dependencies
COPY package.json /usr/src/api/
COPY docker-entrypoint.sh /usr/src/api/
RUN npm install

# Bundle api source
COPY . /usr/src/api

EXPOSE 3001 80

RUN ["chmod", "+x", "/usr/src/api/docker-entrypoint.sh"]

ENTRYPOINT ["sh", "/usr/src/api/docker-entrypoint.sh"]
