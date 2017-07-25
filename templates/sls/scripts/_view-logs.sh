#!/bin/bash

# This script will launch pm2-logs

echo ""
echo "Get pm2-logs"
echo "---------------------------"
echo ""

sudo docker exec -it sls-devutils pm2 logs
