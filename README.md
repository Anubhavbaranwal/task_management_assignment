
```markdown:README.md
# Task Management API

A robust RESTful API for task management built with Node.js, Express, and TypeScript, featuring user authentication and CRUD operations for tasks.

## Features

- **User Authentication**
  - Register new users
  - Login with JWT (Access & Refresh tokens)
  - Secure cookie-based authentication

- **Task Management**
  - Create new tasks
  - List all tasks with optional status filtering
  - Get task details
  - Update task status and details
  - Delete tasks
  - Task status tracking (pending, in-progress, completed)

## Tech Stack

- Node.js
- TypeScript
- Express.js
- MongoDB with Mongoose
- JWT Authentication
- bcrypt for password hashing
- Cookie Parser
- CORS enabled

## Prerequisites

- Node.js (v14 or higher)
- MongoDB
- npm or yarn

## Environment Variables

Create a `.env` file in the root directory with the following variables:

```env
PORT=8000
MONGODB_URI=your_mongodb_connection_string
ACCESS_TOKEN_SECRET=your_access_token_secret
REFRESH_TOKEN_SECRET=your_refresh_token_secret
ACCESS_TOKEN_EXPIRY=1d
REFRESH_TOKEN_EXPIRY=10d
CORS_ORIGIN=http://localhost:3000
```

## Installation

1. Clone the repository:
```bash
git clone https://github.com/Anubhavbaranwal/task_management_assignment
cd task_management_assignment
```

2. Install dependencies:
```bash
npm install
```

3. Build the project:
```bash
npm run build
```

4. Start the server:
```bash
npm start
```

For development:
```bash
npm run dev
```

## API Endpoints

### Authentication
- `POST /api/v1/users/register` - Register a new user
- `POST /api/v1/users/login` - Login user

### Tasks
- `POST /api/v1/tasks` - Create a new task
- `GET /api/v1/tasks` - Get all tasks (with optional status filter)
- `GET /api/v1/tasks/:taskId` - Get task by ID
- `PATCH /api/v1/tasks/:taskId` - Update task
- `DELETE /api/v1/tasks/:taskId` - Delete task

## Authentication

The API uses JWT tokens for authentication. Include the access token in:
- Cookie: `accessToken`
- Or Header: `Authorization: Bearer <token>`

## Data Models

### User
- username (unique)
- email (unique)
- password (hashed)
- refreshToken

### Task
- title
- description (optional)
- status (pending/in-progress/completed)
- userId (reference to User)
- timestamps (createdAt, updatedAt)

## Error Handling

The API implements consistent error handling with appropriate HTTP status codes and error messages using custom ApiError and ApiResponse classes.

## Security Features

- Password hashing using bcrypt
- JWT-based authentication
- HTTP-only cookies
- CORS protection
- Request data validation
- MongoDB injection protection

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details
```

This README provides a comprehensive overview of your project, including setup instructions, available endpoints, and key features. You may want to customize certain sections (like the repository URL) and add any additional specific instructions or requirements for your project.

The README is structured to be both informative for users who want to understand what the project does and practical for developers who need to set it up and work with it.
