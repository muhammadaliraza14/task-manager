# TaskHub Lite

## Setup

docker-compose up --build

## Seed Data

docker exec -it <server_container> node seed.js

## Login

admin@example.com / 123456  
user@example.com / 123456

## Features

- JWT Authentication
- CRUD Tasks
- Filtering, sorting, pagination
- Role-based access
- Dockerized setup

## API

POST /api/auth/login  
GET /api/tasks  
POST /api/tasks  
PUT /api/tasks/:id  
DELETE /api/tasks/:id