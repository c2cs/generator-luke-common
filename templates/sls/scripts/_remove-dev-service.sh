#!/bin/bash

# This script will deploy service to dev stage

echo ""
echo "Remove service at \`dev\` stage"
echo "---------------------------"
echo ""

sudo docker exec -it sls-devutils bash -c 'cd /project; sls remove --stage dev'
