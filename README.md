# Edssentials Backend API

A robust Node.js/Express backend server with MongoDB integration for the Edssentials learning platform.

## 📋 Table of Contents

- [Features](#features)
- [Prerequisites](#prerequisites)
- [Installation](#installation)
- [Configuration](#configuration)
- [Running the Server](#running-the-server)
- [API Documentation](#api-documentation)
- [Project Structure](#project-structure)
- [Database Schema](#database-schema)

## ✨ Features

- ✅ User authentication and authorization with JWT
- ✅ User profile management
- ✅ Learning paths CRUD operations
- ✅ Resource library management
- ✅ Assessment/quiz system
- ✅ Job alerts and applications
- ✅ CORS enabled for frontend connectivity
- ✅ Error handling and validation
- ✅ Password encryption with bcryptjs
- ✅ MongoDB integration with Mongoose

## 📦 Prerequisites

- Node.js (v14 or higher)
- npm or yarn
- MongoDB (local or cloud - MongoDB Atlas)

## 🚀 Installation

### 1. Navigate to backend folder

```bash
cd backend
```

### 2. Install dependencies

```bash
npm install
```

### 3. Configure environment variables

Create a `.env` file in the backend folder with the following variables:

```env
# MongoDB Configuration
MONGODB_URI=mongodb://localhost:27017/edssentials
# For MongoDB Atlas:
# MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/edssentials?retryWrites=true&w=majority

# Server Configuration
PORT=5000
NODE_ENV=development

# JWT Configuration
JWT_SECRET=your_jwt_secret_key_change_this_in_production
JWT_EXPIRE=7d

# Frontend URL
FRONTEND_URL=http://localhost:3000
```

## 🗄️ Database Setup

### Option 1: Local MongoDB

```bash
# Start MongoDB service (Windows)
mongod

# Or using Docker
docker run -d -p 27017:27017 --name mongodb mongo:latest
```

### Option 2: MongoDB Atlas (Cloud)

1. Create a free account at [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
2. Create a cluster and get your connection string
3. Update `MONGODB_URI` in `.env` file

## ▶️ Running the Server

### Development mode (with auto-reload)

```bash
npm run dev
```

### Production mode

```bash
npm start
```

Server will run on `http://localhost:5000`

## 📚 API Documentation

### Base URL
```
http://localhost:5000/api
```

### Authentication Endpoints

#### Register User
```
POST /auth/register
Content-Type: application/json

{
  "firstName": "John",
  "lastName": "Doe",
  "email": "john@example.com",
  "password": "password123",
  "role": "student"
}

Response: { user: {...}, token: "jwt_token" }
```

#### Login User
```
POST /auth/login
Content-Type: application/json

{
  "email": "john@example.com",
  "password": "password123"
}

Response: { user: {...}, token: "jwt_token" }
```

#### Get User Profile
```
GET /auth/profile
Authorization: Bearer {token}

Response: { user: {...} }
```

#### Update User Profile
```
PUT /auth/profile
Authorization: Bearer {token}
Content-Type: application/json

{
  "firstName": "John",
  "lastName": "Doe",
  "bio": "Learning enthusiast",
  "skills": ["JavaScript", "React"],
  "profileImage": "url_to_image"
}
```

### Learning Paths Endpoints

#### Get All Learning Paths
```
GET /learning-paths
```

#### Get Learning Path by ID
```
GET /learning-paths/:id
```

#### Create Learning Path
```
POST /learning-paths
Authorization: Bearer {token}
Content-Type: application/json

{
  "title": "React Mastery",
  "description": "Learn React from scratch",
  "category": "Web Development",
  "difficulty": "intermediate",
  "duration": "8 weeks",
  "modules": [...]
}
```

#### Enroll in Learning Path
```
POST /learning-paths/:id/enroll
Authorization: Bearer {token}
```

### Resources Endpoints

#### Get All Resources
```
GET /resources?category=web&type=video&difficulty=beginner
```

#### Create Resource
```
POST /resources
Authorization: Bearer {token}
Content-Type: application/json

{
  "title": "JavaScript Basics",
  "description": "Learn JS fundamentals",
  "type": "video",
  "category": "Programming",
  "url": "https://example.com/video",
  "author": "John Doe",
  "difficulty": "beginner",
  "tags": ["javascript", "web"]
}
```

#### Save Resource
```
POST /resources/:id/save
Authorization: Bearer {token}
```

#### Get Saved Resources
```
GET /resources/saved/my-resources
Authorization: Bearer {token}
```

### Assessments Endpoints

#### Get All Assessments
```
GET /assessments
```

#### Create Assessment
```
POST /assessments
Authorization: Bearer {token}
Content-Type: application/json

{
  "title": "React Quiz",
  "description": "Test your React knowledge",
  "questions": [...],
  "totalPoints": 100
}
```

#### Submit Assessment
```
POST /assessments/:id/submit
Authorization: Bearer {token}
Content-Type: application/json

{
  "answers": ["option1", "option2", "option3"]
}

Response: { score: 85, totalPoints: 100 }
```

#### Get My Assessment Results
```
GET /assessments/results/my-results
Authorization: Bearer {token}
```

### Job Alerts Endpoints

#### Get All Jobs
```
GET /jobs
```

#### Create Job Alert
```
POST /jobs
Authorization: Bearer {token}
Content-Type: application/json

{
  "title": "React Developer",
  "company": "Tech Company",
  "location": "Remote",
  "jobType": "full-time",
  "salary": "$80,000 - $120,000",
  "skills": ["React", "Node.js"],
  "url": "https://example.com/job"
}
```

#### Save Job
```
POST /jobs/:id/save
Authorization: Bearer {token}
```

#### Apply for Job
```
POST /jobs/:id/apply
Authorization: Bearer {token}
```

#### Get Saved Jobs
```
GET /jobs/saved/my-jobs
Authorization: Bearer {token}
```

## 📁 Project Structure

```
backend/
├── config/
│   ├── database.js          # MongoDB connection
│   └── cors.js              # CORS configuration
├── controllers/
│   ├── authController.js    # Auth logic
│   ├── learningPathController.js
│   ├── resourceController.js
│   ├── assessmentController.js
│   └── jobController.js
├── middleware/
│   ├── auth.js              # JWT authentication
│   └── errorHandler.js      # Global error handler
├── models/
│   ├── User.js              # User schema
│   ├── LearningPath.js
│   ├── Resource.js
│   ├── Assessment.js
│   └── JobAlert.js
├── routes/
│   ├── authRoutes.js
│   ├── learningPathRoutes.js
│   ├── resourceRoutes.js
│   ├── assessmentRoutes.js
│   └── jobRoutes.js
├── utils/
│   ├── jwt.js               # JWT utilities
│   └── response.js          # Response formatting
├── .env                     # Environment variables
├── .gitignore
├── package.json
└── server.js                # Main server file
```

## 🗃️ Database Schema

### User
- `firstName` - User's first name
- `lastName` - User's last name
- `email` - User's email (unique)
- `password` - Hashed password
- `role` - User role (student, mentor, admin)
- `profileImage` - Profile image URL
- `bio` - User biography
- `skills` - Array of skills
- `learningPaths` - References to enrolled paths
- `completedAssessments` - References to completed assessments
- `isActive` - Account status
- `timestamps` - Created/Updated timestamps

### LearningPath
- `title` - Path title
- `description` - Path description
- `category` - Learning category
- `difficulty` - Difficulty level
- `duration` - Duration estimate
- `instructor` - Reference to User
- `modules` - Array of modules
- `enrolledUsers` - Array of enrolled users
- `image` - Path image URL
- `rating` - Average rating
- `isPublished` - Publication status

### Assessment
- `title` - Assessment title
- `questions` - Array of questions
- `learningPath` - Reference to LearningPath
- `createdBy` - Reference to User
- `submissions` - Array of submissions
- `totalPoints` - Total points

### Resource
- `title` - Resource title
- `type` - Resource type (video, article, etc.)
- `category` - Resource category
- `url` - Resource URL
- `author` - Author name
- `difficulty` - Difficulty level
- `tags` - Array of tags
- `savedBy` - Array of users who saved
- `rating` - Average rating

### JobAlert
- `title` - Job title
- `company` - Company name
- `location` - Job location
- `jobType` - Type of job
- `salary` - Salary info
- `skills` - Required skills
- `url` - Job URL
- `savedBy` - Array of users who saved
- `appliedBy` - Array of applicants

## 🔐 Authentication

The API uses JWT (JSON Web Tokens) for authentication:

1. User registers or logs in
2. Server returns a JWT token
3. Store token in localStorage on frontend
4. Include token in Authorization header: `Bearer {token}`
5. Server validates token on protected routes

## 🚨 Error Handling

The API returns consistent error responses:

```json
{
  "success": false,
  "message": "Error description",
  "errors": [] // Optional validation errors
}
```

HTTP Status Codes:
- `200` - Success
- `201` - Created
- `400` - Bad Request
- `401` - Unauthorized
- `403` - Forbidden
- `404` - Not Found
- `500` - Server Error

## 🔧 Development Tips

1. Use Postman or Insomnia to test API endpoints
2. Always include valid JWT tokens for protected routes
3. Check `.env` file is properly configured
4. Ensure MongoDB is running
5. Use `npm run dev` for development with auto-reload

## 📝 Frontend Integration

The frontend uses a centralized API service (`src/services/api.js`) that:

- Automatically attaches JWT tokens to requests
- Handles CORS requests
- Provides consistent error handling
- Implements request/response interceptors

Example usage in React:
```javascript
import { authAPI, learningPathAPI } from '../services/api';

// Login
const response = await authAPI.login({
  email: 'user@example.com',
  password: 'password123'
});

// Get learning paths
const paths = await learningPathAPI.getAllPaths();
```

## 📞 Support

For issues or questions, please check:
- Backend API logs
- Frontend console for network errors
- MongoDB connection status
- Environment variables configuration

## 📄 License

ISC License
