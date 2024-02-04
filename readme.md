# build images from dockerfile
docker build -t express-node-app .  
# run containers
docker run --name express-node-container -d express-node-app
docker run --name express-node-app-container -d -p 4000:4000 express-node-app  // to forward port from machine to container 
docker stop cont_name  
docker start cont_name  
docker restart cont_name 
docker rm --help  
# -f to force delete  
docker rm cont_name -f  
# // delete image      
docker rmi image_name  
# // get up and running containers    
docker ps  
# list all images     
docker images

# get terminal inside container
# // to open terminal on container , -it ==> to open interactive terminal
docker exec -it  cont_name bash  
# to exit from command
exit 
# get logs of container
docker logs cont_name -f #follow logs in terminal
# make hotReload and mount files on desktop to docker (2way binding)
docker run --name express-node-cont -v C:/Users/engah/OneDrive/Desktop/node-app:/app -d -p 4000:4000 express-node-app
docker run --name express-node-cont -v $pwd:/app -d -p 4000:4000 express-node-app

# make mirroring read only(1way binding), can not change files on our local
docker run --name express-node-cont -v C:/Users/engah/OneDrive/Desktop/node-app:/app:ro -d -p 4000:4000 express-node-app
# make anonymous mount, to ignor certain files 
docker run -it --name express-node-cont -d -v  C:/Users/engah/OneDrive/Desktop/node-app:/app -v /app/node_modules -p 4000:4000 express-node-app
# putting my files in src folder
docker run -it --name express-node-cont  -v  C:/Users/engah/OneDrive/Desktop/node-app/src:/app/src:ro -v /app/node_modules -d -p 4000:4000 express-node-app

# compose utility for helping control containers
docker-compose up -d
docker-compose -f docker-compose.dev.yml up -d
# run a new build from image
docker-compose -f docker-compose.dev.yml up -d --build 

# pass env
docker run -it --name express-node-cont -d -v  C:/Users/engah/OneDrive/Desktop/node-app:/app -v /app/node_modules --env PORT=4000 -p 4000:4000 express-node-app

# pass env file
docker run -it --name express-node-cont -d -v  C:/Users/engah/OneDrive/Desktop/node-app:/app -v /app/node_modules --env-file ./.env -p 4000:4000 express-node-app

# print in bash
printenv in bash to print all env variables

# get container details
docker inspect cont_name

# list all docker networks
docker network ls

# connect to mongo db in bash
mongosh -u usernmae -p password

# delete all unused volumes from disk
docker volume prune