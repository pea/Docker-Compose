# Headless WordPress

- WordPress, using Bitnami's image for better WordPress update management
- Node-based frontend preloaded with Next.js
- Node.js API just in case
- Simple SSL with Let's Encrypt

## Running in development
Everything is set up for development. Just run `docker-compose up` or `docker-compose up -d` (to run in the background).

## Running in production
To set up the DNS for a domain name open docker-compose.yaml and configure the environment variables:

- VIRTUAL_HOST
- VIRTUAL_PORT
- LETSENCRYPT_HOST
- LETSENCRYPT_EMAIL

Make sure the `wordpress` container isn't mapping port 80 by commenting it out. nginx-proxy will take it over and route traffic internally.

Enable nginx-proxy and letsencrypt-nginx-proxy-companion containers in docker-compose.yaml but uncommenting them.

*See Database section if using remote one.

```
ports:
  - "80:80"
```

## Updating WordPress
To quickly update WordPress you can run `docker-compose up -d --build --force-recreate wordpress`, providing the wordpress docker image version is set to 'latest' in docker-compose.yaml (image: "bitnami/wordpress:latest"). The WordPress version number should ideally be set to a specific version instead of 'latest' to prevent mismatches between production and development instances.

A more foolproof method is provided by Bitnami, who have developed the WordPress docker image. Find instructions here:

https://github.com/bitnami/bitnami-docker-wordpress#upgrading-wordpress

Note that mysql is used instead of mariadb so the paths will be slightly different. The database volume is persisted in .data instead.

WordPress can technically be updated in the admin panel but it's not advised as your development and production versions may not match and cause problems.

## Apis
The WordPress and Node API can be accessed server-side at `http://wordpress/wp-json` and `http://api:3001`. They can also be accessed publicly as normal via `http://localhost/wp-json` and `http://localhost:3001` or `https://my-domain.com/wp-json` and `https://my-domain.com:3001`

## Frontend
Next.js is prelaoded into the frontend container. To use another framework you can replace everything in Frontend except Dockerfile and docker-entrypoint.sh. docker-entrypoint.sh will be run inside the container and is where you'll build and start the app. Edit it if needed.

NODE_ENV is set in the docker-compose.yaml file and is made available inside the container.

## Database
The WordPress database settings are only written to the wp-config.php file when you first run `docker-compose up`. If you need to change them (to a live remote database) you should update them in Wordpress/wordpress/wp-config.php.

## Docker Commands
Some handy docker commands.

### Access Docker Container SSH-Style
docker exec -it `CONTAINER_NAME` /bin/bash

### Remove all containers
docker rm -f $(docker ps -q)

### Remove all networks
docker network rm $(docker network ls -q)

### Prune
This will remove:
- all stopped containers
- all networks not used by at least one container
- all images without at least one container associated to them
- all build cache
- all volumes (but not delete the .data and Wordpress directories)

docker system prune -a --volumes

### Remove unused images and containers
docker rm $(docker ps -q -f 'status=exited’) & docker rmi $(docker images -q -f "dangling=true")

