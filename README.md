# AI Task Platform

A full-stack AI Task Processing Platform that demonstrates asynchronous background job processing using **React, Node.js, Redis, Python Worker, Docker, and MongoDB Atlas**.

The application allows authenticated users to create text-processing tasks, queue them in Redis, process them asynchronously using a Python worker, and view the live status and results from the dashboard.

---

# Features

- User Authentication (JWT + HTTP Only Cookies)
- User Registration & Login
- Create Text Processing Tasks
- View All Tasks
- Delete Tasks
- Queue Tasks using Redis
- Background Processing with Python Worker
- Live Task Status Updates
- Dockerized Services
- Docker Compose Support

---

# Tech Stack

## Frontend

- React.js
- Vite
- React Router DOM
- Axios
- Tailwind CSS
- DaisyUI

## Backend

- Node.js
- Express.js
- MongoDB Atlas
- Mongoose
- JWT Authentication
- Cookie Parser
- Redis

## Worker

- Python
- Redis
- PyMongo

## DevOps

- Docker
- Docker Compose

---

# Project Architecture

```
                    React Frontend
                           │
                           ▼
                  Express.js Backend
                           │
                    Store Task (Pending)
                           │
                           ▼
                       Redis Queue
                           │
                           ▼
                    Python Worker
                           │
                 Process Background Task
                           │
                           ▼
                    MongoDB Atlas
                           │
                           ▼
                    React Dashboard
```

---

# Folder Structure

```
AI-Task-Platform

├── backend
│   ├── src
│   ├── Dockerfile
│   └── package.json
│
├── frontend
│   ├── src
│   ├── Dockerfile
│   └── package.json
│
├── worker
│   ├── worker.py
│   ├── requirements.txt
│   └── Dockerfile
│
├── docker-compose.yml
│
└── README.md
```

---

# Supported Operations

The worker currently supports the following operations:

- Uppercase
- Lowercase
- Reverse String
- Word Count

---

# Environment Variables

## Backend

Create a `.env` file inside the backend folder.

```env
PORT=5000

MONGO_URI=YOUR_MONGODB_ATLAS_URI

JWT_SECRET=YOUR_SECRET_KEY

REDIS_URL=redis://redis:6379
```

---

## Worker

Create a `.env` file inside the worker folder.

```env
MONGO_URI=YOUR_MONGODB_ATLAS_URI

REDIS_URL=redis://redis:6379
```

---

# Running Locally

### Clone Repository

```bash
git clone https://github.com/yourusername/AI-Task-Platform.git

cd AI-Task-Platform
```

---

### Backend

```bash
cd backend

npm install

npm run dev
```

---

### Frontend

```bash
cd frontend

npm install

npm run dev
```

---

### Worker

```bash
cd worker

pip install -r requirements.txt

python worker.py
```

---

### Redis

Using Docker

```bash
docker run -d \
--name redis \
-p 6379:6379 \
redis
```

---

# Running with Docker Compose

```bash
docker compose up --build
```

---

# API Endpoints

## Authentication

### Register

```
POST /api/auth/register
```

### Login

```
POST /api/auth/login
```

### Profile

```
GET /api/auth/profile
```

---

## Tasks

### Create Task

```
POST /api/tasks/create
```

### Get All Tasks

```
GET /api/tasks
```

### Run Task

```
POST /api/tasks/:id/run
```

### Delete Task

```
DELETE /api/tasks/:id
```

---

# Workflow

1. User logs into the application.
2. User creates a task.
3. Backend stores the task in MongoDB with **Pending** status.
4. Task is pushed to Redis Queue.
5. Python Worker continuously listens to Redis.
6. Worker processes the task.
7. MongoDB is updated with the result.
8. Frontend automatically refreshes and displays the updated status.

---

# Docker Services

- Frontend
- Backend
- Redis
- Python Worker

---

# Future Improvements

- WebSocket-based live updates
- Task Retry Mechanism
- Task Priority Queue
- Admin Dashboard
- Task History & Analytics
- Unit & Integration Testing


---

# Learning Outcomes

While building this project, I learned:

- JWT Authentication
- HTTP Only Cookies
- Redis Queues
- Background Job Processing
- Python Worker Architecture
- Docker
- Docker Compose
- MongoDB Atlas
- Service Communication
- Asynchronous Task Processing

---

# Author

**Shubham Kahar**

MERN Stack Developer | Learning DevOps

GitHub:
https://github.com/shubhamkahar196

LinkedIn:
https://www.linkedin.com/in/shubham-kahar-586199275