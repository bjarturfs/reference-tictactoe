#!/bin/bash

# Generate new git id
if [ -z "$GIT_COMMIT" ]; then
  export GIT_COMMIT=$(git rev-parse HEAD)
fi


echo "installing npm for jenkins"
npm install
cd client
npm install
cd ..

echo "Clean the build repo and rebuild"
npm run build

npm install nodemon

# Run unit tests
echo "Running unit tests"
npm run test
rc=$?
if [[ $rc != 0 ]] ; then
    echo "Npm test failed with exit code " $rc
    exit $rc
fi

#Generating .env file to use with docker-compose file
cat > ./build/.env <<_EOF_
GIT_COMMIT=$GIT_COMMIT
_EOF_

echo "Copy Dockerfile, package.json to build and copy run.sh to build Dockerfile"
cp ./Dockerfile ./build/
cp ./package.json ./build/
cp ./run.sh ./build/

echo "Going into the build directory"
cd build

echo "Building..."
docker build -t bjartur30/tictactoe:$GIT_COMMIT .

echo "Pushing image to Docker"
docker push bjartur30/tictactoe:$GIT_COMMIT
