#!/bin/bash

# This script will deploy service to dev stage

echo ""
echo "Deploy services to \`dev\` stage"
echo "---------------------------"
echo ""

sudo docker exec -it sls-devutils bash -c 'cd /project; sls deploy --stage dev'
sudo docker exec -it sls-devutils bash -c 'cd /project; sls apigateway register --rest-api-id l37pmjo1x6 --config ./.sls/projectConfig.json --stage dev $1'
