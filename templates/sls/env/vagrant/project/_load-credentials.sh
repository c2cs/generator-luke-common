#!/usr/bin/env bash

# This script loads credentials data from

echo ""
echo "[Provision-Script] Load credentials"
echo ""

if [ ! -f /project/auth/auth.tar.gz ]; then
    echo "Auth files not found"
    exit
fi

# Set temporary place for storing extracted auth data
credentialsDir=$RANDOM;
mkdir /tmp/$credentialsDir

# Extract auth data to that place
tar fx /project/auth/auth.tar.gz -C /tmp/$credentialsDir/

# Prepare AWS credentials dirs
mkdir /home/vagrant/.aws
mkdir /root/.aws

# Store environment variables and use them during current provisioning
if [ -f /tmp/$credentialsDir/environment ]; then
        cp /tmp/$credentialsDir/environment /etc/environment
        source /etc/environment
fi

# Append .bashrc
if [ -f /tmp/$credentialsDir/bashrc ]; then
        cat /tmp/$credentialsDir/bashrc >> /home/vagrant/.bashrc
fi

# Copy AWS credentials config
if [ -f /tmp/$credentialsDir/aws-credentials ]; then
        cp /tmp/$credentialsDir/aws-credentials /root/.aws/credentials
        cp /tmp/$credentialsDir/aws-credentials /home/vagrant/.aws/credentials
fi
if [ -f /tmp/$credentialsDir/aws-config ]; then
        cp /tmp/$credentialsDir/aws-config /root/.aws/config
        cp /tmp/$credentialsDir/aws-config /home/vagrant/.aws/config
fi

# Copy npm config
if [ -f /tmp/$credentialsDir/npmrc ]; then
        cp /tmp/$credentialsDir/npmrc /home/vagrant/.npmrc
fi
if [ -f /tmp/$credentialsDir/npmrc ]; then
        cp /tmp/$credentialsDir/npmrc /root/.npmrc
fi

# Set owner of created for `vagrant` user credentials files
chown -R vagrant:vagrant /home/vagrant/.aws
chown vagrant:vagrant /home/vagrant/.npmrc
chown vagrant:vagrant /home/vagrant/.bashrc

# Remove temporary directory
rm -rf /tmp/$credentialsDir
