# Fullstack Dictionary

A modern, full-stack dictionary application that allows users to search, manage, and track their word lookups with a comprehensive history and favorites system.


## Features

- **Word Search**: Look up words with detailed definitions
- **User Authentication**: Secure login and registration system
- **Search History**: Track all your word lookups
- **Favorites**: Save your favorite words for quick access
- **Real-time Updates**: Live data synchronization
- **Responsive Design**: Works on desktop and mobile devices
- **Secure API**: JWT-based authentication with bcrypt password hashing

## Architecture

This project follows a modern full-stack architecture:

- **Frontend**: React 19 with TypeScript, using Vite for fast development
- **Backend**: NestJS with Prisma ORM for type-safe database operations
- **Database**: PostgreSQL with Redis for caching
- **Containerization**: Docker & Docker Compose for easy deployment
- **State Management**: Zustand for client-side state
- **HTTP Client**: Axios with React Query for efficient data fetching

## Prerequisites

- **Node.js** 20.18+ 
- **Docker** & **Docker Compose**
- **Git**

## Quick Start

### 1. Clone the Repository
```bash
git clone https://github.com/MatheusAraruna/fullstack-dictionary.git
cd fullstack-dictionary
```

### 2. Using Docker (Recommended)

The easiest way to run the application is using Docker Compose:

```bash
# Start all services (frontend, backend, database, redis)
docker-compose up -d
```

**Access the application:**
- Frontend: [http://localhost:3000](http://localhost:3000)
- API: [http://localhost:3030](http://localhost:3030)
- API Documentation: [http://localhost:3030/docs](http://localhost:3030/docs)

### 3. Manual Setup (Development)

If you prefer to run the services individually:

#### Backend Setup
```bash
cd api
npm install

# Set up environment variables
cp .env.example .env
# Edit .env with your database configuration

# Run database migrations
npm run migrate

# Start development server
npm run start:dev
```

#### Frontend Setup
```bash
cd frontend
npm install

# Set up environment variables
cp .env.example .env
# Edit .env with your API URL

# Start development server
npm run dev
```

## Environment Configuration

### Backend (.env)
```env
# Database Configuration
DATABASE_URL="postgresql://user:password@localhost:5432/dictionary_db"

# For Docker deployment, use:
# DATABASE_URL="postgresql://user:password@postgres:5432/dictionary_db"

# JWT Configuration
JWT_SECRET="your-super-secret-jwt-key"
JWT_EXPIRES_IN="7d"

# Redis Configuration
REDIS_URL="redis://localhost:6379"
# For Docker: REDIS_URL="redis://redis:6379"

# App Configuration
PORT=3030
NODE_ENV=development
```

### Frontend (.env)
```env
VITE_API_URL=http://localhost:3030
```

## Database Schema

The application uses PostgreSQL with the following main entities:

- **Users**: User accounts with authentication
- **Words**: Dictionary words storage
- **History**: User search history tracking
- **Favorites**: User favorite words

## API Documentation

When the backend is running, you can access the interactive API documentation at:
- Swagger UI: [http://localhost:3030/docs](http://localhost:3030/docs)

### Main Endpoints

- `GET /` - Healthcheck
- `POST /auth/signin` - User signin
- `POST /auth/signup` - User signup
- `GET /entries/en` - Get list words
- `GET /entries/en/:word` - Get word definition
- `GET /user/me/history` - Get user search history
- `GET /user/me/favorites` - Get user favorites
- `POST /entries/:word/favorite` - Add word to favorites
- `DELETE /entries/:word/favorite` - Delete word to favorites


## Testing

### Backend Tests
```bash
cd api

# Unit tests
npm run test

# Test coverage
npm run test:cov
```

### Frontend Tests
```bash
cd frontend

# Run tests
npm run test

# Run tests in watch mode
npm run test:watch
```

## Deployment

### Production with Docker
```bash
# Build and start production containers
docker-compose -f docker-compose.prod.yml up -d
```

### Manual Production Deployment
```bash
# Backend
cd api
npm run build
npm run start:prod

# Frontend
cd frontend
npm run build
npm run preview
```

## Contributing

1. Fork the project
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Links

- [Live Demo](#) - Coming soon
- [API Documentation](http://localhost:3030/docs) - Available when running locally
- [Project Repository](https://github.com/MatheusAraruna/fullstack-dictionary)

---

> This is a challenge by [Coodesh](https://coodesh.com/) 🚀

## Support

If you have any questions or need help, please open an issue in the GitHub repository.