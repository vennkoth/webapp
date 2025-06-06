# Posspole Exam Proctor Backend

This is the backend server for the Posspole Exam Proctor system, built with Node.js, Express, and MongoDB Atlas.

## Setup Instructions

1. Install dependencies:
   ```bash
   npm install
   ```

2. Create a `.env` file in the root directory with the following variables:
   ```
   PORT=5000
   MONGODB_URI=your_mongodb_atlas_connection_string
   JWT_SECRET=your_jwt_secret_key
   ```

3. Start the server:
   - For development:
     ```bash
     npm run dev
     ```
   - For production:
     ```bash
     npm start
     ```

## API Endpoints

### Authentication

- **Register User**
  - POST `/api/auth/register`
  - Body: `{ username, email, password, role }`

- **Login User**
  - POST `/api/auth/login`
  - Body: `{ email, password }`

### Exams

- **Create Exam** (HR only)
  - POST `/api/exams`
  - Requires authentication
  - Body: `{ title, description, duration, startTime, endTime, questions }`

- **Get All Exams** (HR only)
  - GET `/api/exams/all`
  - Requires authentication

- **Get User's Exams**
  - GET `/api/exams/my-exams`
  - Requires authentication

- **Get Specific Exam**
  - GET `/api/exams/:id`
  - Requires authentication

- **Submit Exam**
  - POST `/api/exams/:id/submit`
  - Requires authentication
  - Body: `{ answers }`

- **Update Exam** (HR only)
  - PUT `/api/exams/:id`
  - Requires authentication
  - Body: `{ title, description, etc. }`

- **Delete Exam** (HR only)
  - DELETE `/api/exams/:id`
  - Requires authentication

## Authentication

All protected routes require a JWT token in the Authorization header:
```
Authorization: Bearer <token>
```

## Models

### User
- username (String, required, unique)
- email (String, required, unique)
- password (String, required, hashed)
- role (String: 'user', 'hr', 'admin')
- createdAt (Date)

### Exam
- title (String, required)
- description (String, required)
- duration (Number, required)
- startTime (Date, required)
- endTime (Date, required)
- questions (Array of Question objects)
- createdBy (User reference)
- participants (Array of Participant objects)
- isActive (Boolean)
- createdAt (Date)

## Error Handling

The API returns appropriate HTTP status codes and error messages in JSON format:
```json
{
    "message": "Error message here",
    "error": "Detailed error information (in development)"
}
```