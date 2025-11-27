# FitTrack Backend (Node.js + Express + MySQL)

This is a simple backend for your React fitness tracker project.

## Features

- User registration and login with encrypted passwords
- JWT-based authentication
- CRUD APIs for:
  - Activities (workouts)
  - Diet entries (meals / calories)
- MySQL database

## Setup Instructions

### 1. Install dependencies

```bash
cd fit-track-backend
npm install
```

### 2. Configure MySQL

1. Make sure MySQL server is running.
2. Log in to MySQL and run the schema:

```bash
mysql -u root -p < sql/schema.sql
```

3. Copy `.env.example` to `.env` and update with your MySQL username and password:

```bash
cp .env.example .env   # or manually create .env on Windows
```

### 3. Run the backend

```bash
npm run dev
```

The server will start on `http://localhost:5000`.

### 4. Available API endpoints

#### Auth

- `POST /api/auth/register`
  - Body: `{ "name": "Your Name", "email": "you@example.com", "password": "secret" }`
- `POST /api/auth/login`
  - Body: `{ "email": "you@example.com", "password": "secret" }`
  - Returns: user info + JWT token
- `GET /api/auth/me`
  - Headers: `Authorization: Bearer <token>`

#### Activities (requires Authorization header with JWT token)

- `GET /api/activities`
- `POST /api/activities`
  - Body: `{ "date": "2025-01-01", "type": "Running", "duration_minutes": 30, "calories": 200, "notes": "Evening run" }`
- `PUT /api/activities/:id`
- `DELETE /api/activities/:id`

#### Diet entries (requires Authorization header with JWT token)

- `GET /api/diet`
- `POST /api/diet`
  - Body: `{ "date": "2025-01-01", "meal_type": "Breakfast", "food_name": "Oats", "calories": 300 }`
- `PUT /api/diet/:id`
- `DELETE /api/diet/:id`

---

You can now connect your React frontend to these endpoints using `fetch` or `axios`.
