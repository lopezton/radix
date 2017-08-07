#!/bin/bash

docker-compose -f docker-compose-radix-server.xml down
docker-compose -f docker-compose-radix-mongo.xml down
docker-compose -f docker-compose-radix-dashboard.xml down

docker volume rm `docker volume ls -q -f dangling=true`
