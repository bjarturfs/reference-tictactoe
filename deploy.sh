#!/bin/bash

#stops old deploy
ssh -o StrictHostKeyChecking=no -i "~/bjartur.pem" ec2-user@ec2-52-214-109-242.eu-west-1.compute.amazonaws.com "docker-compose sotp -d"

# copy´s .ENV and docker-compose.yaml file to AWS
scp -o StrictHostKeyChecking=no -i "~/bjartur.pem" /var/lib/jenkins/workspace/New\ Commit\ Stage\ Job/docker-compose.yaml /var/lib/jenkins/workspace/New\ Commit\ Stage\ Job/build/.env ec2-user@ec2-52-214-109-242.eu-west-1.compute.amazonaws.com:.

# Runs docker compose up on AWS
ssh -o StrictHostKeyChecking=no -i "~/bjartur.pem" ec2-user@ec2-52-214-109-242.eu-west-1.compute.amazonaws.com "docker-compose up -d"