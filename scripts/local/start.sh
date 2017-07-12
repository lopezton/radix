export DOCKER_HOST_IP=$(echo ${DOCKER_HOST:-tcp://192.168.99.100:2376} | cut -d/ -f3 | cut -d: -f1)
export RADIX_SERVER_PORT=9001
export MONGODB_HOST=${DOCKER_HOST_IP}
export MONGODB_PORT=27017
export RADIX_DASHBOARD_HOST=${DOCKER_HOST_IP}
export RADIX_DASHBOARD_PORT=8080

docker-compose -f docker-compose-radix-server.yml up -d

docker-compose -f docker-compose-radix-dashboard.yml up -d