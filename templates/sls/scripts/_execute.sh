#!/bin/bash

# This script will execute custom command

echo ""
echo "Execute command: \`$@\`"
echo "---------------------------"
echo ""
sudo docker exec -it sls-devutils bash -c "cd /project; $*";
