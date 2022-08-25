# CRUD Movie APP

A Dockerized fullstack: React, Nodejs Express and MongoDB Movie application. This application runs under 3 lightwight containers to run services in isolation. To run these:

* MongoDB - for database
* Node.js - for Server(Backend) and Express - for API
* React - for frontend UI

We use Docker Compose to help create the system.
Thus to setup System:

* Setup Database
* Setup Dockerfile to build Backend API
* Setup Dockerfile to build Frontend
* Run System

***
## Setup Database

Ensure you install MongoCompass to view DB under port:

![image info](./Images/movie-mongo.png)

After Run, Application should look as follows:

![image info](./Images/movies-snapshot.png)
***

## Run the System
We can easily run the whole with only a single command:
```bash
docker-compose up
```

Docker will pull the MongoDB and Node.js images (if our machine does not have it before).

The services can be run on the background with command:
```bash
docker-compose up -d
```

## Stop the System
Stopping all the running containers is also simple with a single command:
```bash
docker-compose down
```

If you need to stop and remove all containers, networks, and all images used by any service in <em>docker-compose.yml</em> file, use the command:
```bash
docker-compose down --rmi all
```
