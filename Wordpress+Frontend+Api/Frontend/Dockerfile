FROM node:8

EXPOSE 3000 8080 80

RUN mkdir -p /usr/src/app

WORKDIR /usr/src/app

COPY package.json /usr/src/app/
COPY docker-entrypoint.sh /usr/src/app/

RUN npm install

ADD . /usr/src/app/

RUN ["chmod", "+x", "/usr/src/app/docker-entrypoint.sh"]

ENTRYPOINT ["sh", "/usr/src/app/docker-entrypoint.sh"]
