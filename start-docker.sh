#!/bin/bash

echo "========================================"
echo "  Event Platform - Docker Setup"
echo "========================================"
echo

echo "Checking Docker installation..."
if ! command -v docker &> /dev/null; then
    echo "ERROR: Docker is not installed"
    echo "Please install Docker from https://docs.docker.com/get-docker/"
    exit 1
fi

echo "Checking Docker Compose..."
if ! command -v docker-compose &> /dev/null && ! docker compose version &> /dev/null; then
    echo "ERROR: Docker Compose is not installed"
    echo "Please install Docker Compose from https://docs.docker.com/compose/install/"
    exit 1
fi

echo
echo "Checking Docker daemon..."
if ! docker ps &> /dev/null; then
    echo "ERROR: Docker daemon is not running"
    echo "Please start Docker service and try again"
    exit 1
fi

echo
echo "Docker is ready! Starting Event Platform..."
echo

echo "Building and starting all services..."
if command -v docker-compose &> /dev/null; then
    docker-compose up --build -d
else
    docker compose up --build -d
fi

echo
echo "Waiting for services to start..."
sleep 10

echo
echo "Checking service status..."
if command -v docker-compose &> /dev/null; then
    docker-compose ps
else
    docker compose ps
fi

echo
echo "========================================"
echo "  Services Status:"
echo "========================================"
echo "Frontend: http://localhost"
echo "Backend API: http://localhost:5000"
echo "MongoDB: localhost:27017"
echo
echo "To view logs: docker-compose logs -f (or docker compose logs -f)"
echo "To stop services: docker-compose down (or docker compose down)"
echo "========================================"