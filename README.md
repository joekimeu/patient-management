# Patient Management System

A full-stack application for managing patient data in a healthcare setting. Built with React (TypeScript) for the frontend and Node.js/Express for the backend, with PostgreSQL as the database.

## Features

- View list of all patients
- Add new patients
- Edit existing patient information
- View detailed patient information including insurance and care plan details
- Delete patients
- Responsive design with Tailwind CSS

## Prerequisites

- Node.js (v14 or higher)
- PostgreSQL (v12 or higher)
- npm or yarn

## Project Structure

```
patient-management/
├── guardian-angel-backend/     # Backend server
│   ├── config/                # Configuration files
│   ├── controllers/           # Request handlers
│   ├── models/               # Database models
│   ├── routes/               # API routes
│   └── server.js             # Server entry point
└── guardian-angel-frontend/   # Frontend application
    ├── public/               # Static files
    └── src/                  # Source files
        ├── components/       # React components
        └── types/           # TypeScript types
```

## Setup Instructions

### Database Setup

1. Create a PostgreSQL database:
   ```sql
   CREATE DATABASE guardian_angel;
   ```

2. Run the schema file:
   ```bash
   psql -d guardian_angel -f guardian_angel_schema.sql
   ```

### Backend Setup

1. Navigate to the backend directory:
   ```bash
   cd guardian-angel-backend
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Create a .env file:
   ```bash
   cp .env.example .env
   ```

4. Update the .env file with your database credentials

5. Start the server:
   ```bash
   npm start
   ```

The backend server will run on http://localhost:5000

### Frontend Setup

1. Navigate to the frontend directory:
   ```bash
   cd guardian-angel-frontend
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the development server:
   ```bash
   npm start
   ```

The frontend application will run on http://localhost:3000

## API Endpoints

### Patients

- GET `/api/patients` - Get all patients
- GET `/api/patients/:id` - Get patient by ID
- GET `/api/patients/:id/details` - Get detailed patient information
- POST `/api/patients` - Create new patient
- PUT `/api/patients/:id` - Update patient
- DELETE `/api/patients/:id` - Delete patient

## Technologies Used

### Backend
- Node.js
- Express
- PostgreSQL
- node-postgres

### Frontend
- React
- TypeScript
- Tailwind CSS
- Axios

## Development

To run both frontend and backend in development mode:

1. Start the backend server:
   ```bash
   cd guardian-angel-backend
   npm run dev
   ```

2. In a new terminal, start the frontend development server:
   ```bash
   cd guardian-angel-frontend
   npm start
   ```

## Contributing

1. Fork the repository
2. Create a new branch
3. Make your changes
4. Submit a pull request

## License

MIT
