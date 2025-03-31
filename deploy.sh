#!/bin/bash

# config
REMOTE_USER="root"
REMOTE_HOST="147.93.56.41"
REMOTE_DIR="/opt/fourapp"
LOCAL_DIR="."

GREEN='\033[0;32m'
RED='\033[0;31m'
NC='\033[0m'

echo -e "${GREEN}Starting deployment to ${REMOTE_HOST}...${NC}"

ssh ${REMOTE_USER}@${REMOTE_HOST} "mkdir -p ${REMOTE_DIR}"

echo -e "${GREEN}Copying project files...${NC}"
rsync -azP --exclude 'node_modules' \
           --exclude '.git' \
           --exclude '.env' \
           --exclude 'mongodb_data' \
           ${LOCAL_DIR}/ ${REMOTE_USER}@${REMOTE_HOST}:${REMOTE_DIR}/

if [ $? -ne 0 ]; then
    echo -e "${RED}Failed to copy files to remote server${NC}"
    exit 1
fi

echo -e "${GREEN}Copying environment files...${NC}"
scp server/.env ${REMOTE_USER}@${REMOTE_HOST}:${REMOTE_DIR}/server/.env
scp client/.env ${REMOTE_USER}@${REMOTE_HOST}:${REMOTE_DIR}/client/.env

# SSH into the remote server and start the app
echo -e "${GREEN}Starting application...${NC}"
ssh ${REMOTE_USER}@${REMOTE_HOST} "cd ${REMOTE_DIR} && \
    docker compose -f docker-compose.prod.yml down && \
    docker compose -f docker-compose.prod.yml up --build -d"

if [ $? -eq 0 ]; then
    echo -e "${GREEN}Deployment completed successfully!${NC}"
else
    echo -e "${RED}Deployment failed!${NC}"
    exit 1
fi