
1. Jenkins URL http://82.221.49.101:8080/ and username: ```kennarar30``` and password: ```kennarar30```.

2. Game URL (AWS): http://52.214.109.242/



## Scripts

- buildtest.sh - runs npm installs, builds the app, build Docker image and push it to Dockerhub. 

- deploy.sh - stops old deploy, runs docker compose up on the AWS 



## Testing & logic

Outline what tests you created.

- UnitTests



## Data migration

- I made a migration to add a the missing column.




## Jenkins

Do you have the following Jobs and what happens in each Job:

- Commit Stage: runs the buildtest.sh script

- deploy: runs the deploy.sh script



Did you use any of the following features in Jenkins?

- Pipeline: when changes are made to the github repo the commit stage runs

