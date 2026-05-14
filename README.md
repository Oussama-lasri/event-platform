# Event Platform - Docker Setup

This project is fully dockerized with separate containers for the frontend, backend, and MongoDB database.

## Prerequisites

- Docker
- Docker Compose

## Quick Start

1. **Clone the repository** (if not already done)
   ```bash
   git clone https://github.com/Oussama-lasri/event-platform
   cd event-platform
   ```

2. **Start all services**
   ```bash
   docker-compose up --build
   ```

3. **Access the application**
   - Frontend: http://localhost
   - Backend API: http://localhost:5000
   - MongoDB: localhost:27017

## Services

### Frontend (React + Vite)
- **Port**: 80
- **Technology**: React 18, Vite, Tailwind CSS
- **Features**: Modern UI with glass morphism, responsive design

### Backend (Node.js + Express)
- **Port**: 5000
- **Technology**: Node.js 18, Express 5, MongoDB
- **Features**: REST API, JWT authentication, file uploads

### Database (MongoDB)
- **Port**: 27017
- **Technology**: MongoDB 7
- **Features**: Persistent data storage with authentication

## Development

### Running in development mode

```bash
# Start all services
docker-compose up --build

# Or run in background
docker-compose up -d --build
```

### Viewing logs

```bash
# All services
docker-compose logs -f

# Specific service
docker-compose logs -f backend
docker-compose logs -f frontend
docker-compose logs -f mongodb
```

### Stopping services

```bash
docker-compose down
```

### Rebuilding after changes

```bash
# Rebuild specific service
docker-compose up --build backend

# Rebuild all services
docker-compose up --build
```

## Database Setup

The MongoDB container is automatically initialized with:
- Admin user: `admin` / `password123`
- Database: `event-platform`
- Collections: users, events, categories, registrations
- Indexes for optimal performance

## Environment Variables

### Backend (.env.docker)
```
PORT=5000
MONGO_URI=mongodb://admin:password123@mongodb:27017/event-platform?authSource=admin
JWT_SECRET=super_secret_key_docker
```

### Frontend (build-time)
```
VITE_API_URL=http://localhost:5000/api
```

## File Structure

```
event-platform/
├── docker-compose.yml
├── backend/
│   ├── Dockerfile
│   ├── .dockerignore
│   ├── .env.docker
│   ├── init-mongo.js
│   └── src/
├── frontend/
│   ├── Dockerfile
│   ├── .dockerignore
│   ├── nginx.conf
│   └── src/
└── README.md
```

## Troubleshooting

### Port conflicts
If ports 80, 5000, or 27017 are already in use, modify the ports in `docker-compose.yml`.

### Database connection issues
Ensure MongoDB container is fully started before the backend tries to connect.

### Frontend not loading
Check that the backend is running and accessible at http://localhost:5000.

### Permission issues
On Linux, you might need to adjust file permissions for the uploads directory.

## Production Deployment

For production deployment:

1. Update environment variables with secure secrets
2. Configure proper SSL/TLS certificates
3. Set up proper logging and monitoring
4. Configure backup strategies for MongoDB
5. Use Docker secrets for sensitive data

## Admin Setup

After the containers are running, you can seed an admin user:

```bash
# Access the backend container
docker-compose exec backend sh

# Run the admin seeder
npm run seed:admin
```

## API Documentation

The backend provides REST API endpoints for:
- Authentication (login/register)
- Events management
- Categories management
- User management
- File uploads
- Dashboard statistics

Base URL: http://localhost:5000/api