FROM node:12
MAINTAINER bb
LABEL "version"="1.0.0"
RUN mkdir -p /var/www/app
WORKDIR /var/www/app
COPY . .
RUN npm install
EXPOSE 8000
CMD ["node","index.js"];