FROM php:7.0-apache
RUN apt-get update && apt-get install -y \
    libzip-dev \
    && docker-php-ext-install mysqli zip \
    && docker-php-ext-configure zip --with-zlib-dir=/usr/ \