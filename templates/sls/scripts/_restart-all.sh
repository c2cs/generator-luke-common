#!/bin/bash

# This script will restart all pm2-processes

echo ""
echo "Restart all pm2-processes"
echo "---------------------------"
echo ""

sudo docker exec -it sls-devutils pm2 restart all
