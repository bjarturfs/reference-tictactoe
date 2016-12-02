#!/bin/bash

echo "Clean the build repo and rebuild"
npm run build

echo "Copy Dockerfile, package.json to build and copy run.sh to build Dockerfile"
cp ./Dockerfile ./build/
cp ./package.json ./build/
cp ./run.sh ./build/

echo "Going into the build directory"
cd build

echo "Building..."
docker build -t bjartur30/tictactoe .
echo "Composing..."
docker-compose up
