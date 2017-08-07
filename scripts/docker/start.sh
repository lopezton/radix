#!/bin/bash

#export DOCKER_HOST_IP=$(echo ${DOCKER_HOST:-tcp://192.168.99.100:2376} | cut -d/ -f3 | cut -d: -f1)
export DOCKER_HOST_IP=localhost
export RADIX_SERVER_HOST=${DOCKER_HOST_IP}
export RADIX_SERVER_PORT=9001
#export MONGODB_HOST=${DOCKER_HOST_IP}
export MONGODB_PORT=27017
export RADIX_DASHBOARD_HOST=${DOCKER_HOST_IP}
export RADIX_DASHBOARD_PORT=8080

docker-compose -f docker-compose-radix-mongo.yml up --build -d
docker-compose -f docker-compose-radix-mongo.yml exec radix-mongo bash -c 'mongo < /init/init-scripts.js'

mvn clean install -f ../../radix-server/pom.xml -DskipTests
docker-compose -f docker-compose-radix-server.yml up -d

npm install --prefix ../../radix-dashboard/ ../../radix-dashboard/
npm run --prefix ../../radix-dashboard prebuild
npm run --prefix ../../radix-dashboard build-prod
docker-compose -f docker-compose-radix-dashboard.yml up --build -d
