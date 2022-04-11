<h2 align="center">
  Won Games (API)
</h2>

<p align="center">
  <img alt="technology" src="https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black">

  <img alt="technology" src="https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=nodedotjs&logoColor=white">

  <img alt="technology" src="https://img.shields.io/badge/strapi-2e7eea?style=for-the-badge&logo=strapi&logoColor=white">
</p>

<br>

### :writing_hand: About this project
This is the back-end repository (API) of the Won Games platform, Won Games is an online game marketplace, where you can buy and download your games, the development of this API was done with Javascript and NodeJS technologies using Strapi .

### :cyclone: How to run this project
Before starting this project, you must have a docker container with postgresSQL or have postgresSQL installed on your machine where the project will run.

The database access settings for the development environment are in the **database.js** file

> **PATH**: wonGames-api/config/env/development/database.js
```bash
# Clone this repository
$ git clone https://github.com/jefferson1104/wonGames-api

# Access the project folder
$ cd wonGames-api

# Get docker database container 
$ docker-compose pull

# Run database container
$ docker-compose up -d

# Install dependencies
$ yarn

# Run initial build
$ yarn build --clean

# Run API at localhost:1337/admin
$ yarn develop

# Login
USER: jefferson1104junior@gmail.com
PSWD: Wongames123

# IF NECESSARY GENERATE JWT-ADMIN-TOKEN
$ node -e "console.log(require('crypto').randomBytes(64).toString('base64'))"
```
### 🎨 Screenshots
<p align="center">
  <img src="public/screenshots/screenshot-01.png">
  <img src="public/screenshots/screenshot-02.png">
  <img src="public/screenshots/screenshot-03.png">
</p>

