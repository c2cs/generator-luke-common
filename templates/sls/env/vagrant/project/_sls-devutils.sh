#!/usr/bin/env bash

# This script loads credentials data from

echo ""
echo "[Project-Script] Load and launch \`sls-devutils\`"
echo ""

`aws ecr get-login`

sudo docker pull \
        277549955817.dkr.ecr.us-east-1.amazonaws.com/c2c-primary/sls-devutils:latest

docker run -d -v /project:/project -p 3090-3095:3090-3095 -u $(id -u):$(id -g) \
        -e AWS_DEFAULT_REGION=$AWS_DEFAULT_REGION \
        -e AWS_SECRET_ACCESS_KEY=$AWS_SECRET_ACCESS_KEY \
        -e AWS_ACCESS_KEY_ID=$AWS_ACCESS_KEY_ID \
        -e REDIS_HOST=$REDIS_HOST \
        -e REDIS_PORT=$REDIS_PORT \
        -e REDIS_AUTH_PASS=$REDIS_AUTH_PASS \
        -e MYSQL_HOST=$MYSQL_HOST \
        -e MYSQL_USERNAME=$MYSQL_USERNAME \
        -e MYSQL_PASSWORD=$MYSQL_PASSWORD \
        -e NPM_API_KEY=$NPM_API_KEY \
        277549955817.dkr.ecr.us-east-1.amazonaws.com/c2c-primary/sls-devutils:latest
