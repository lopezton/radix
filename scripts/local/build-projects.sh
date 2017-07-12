#!/bin/bash

echo "######################################"
echo "# Building radix-server"
echo "######################################"
mvn clean install -f ../../radix-server/pom.xml -DskipTests

docker build -t radix-server ../../radix-server/

echo "######################################"
echo "# Finished building radix-server"
echo "######################################"

echo "######################################"
echo "# Building radix-dashboard"
echo "######################################"

npm run-script build-docker-local --prefix ../../radix-dashboard

docker build -t radix-dashboard ../../radix-dashboard/

echo "######################################"
echo "# Finished building radix-dashboard"
echo "######################################"