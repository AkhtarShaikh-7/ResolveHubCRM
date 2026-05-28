# ResolveHub CRM

A modern full-stack CRM (Customer Relationship Management) and support ticket management system built using the MERN stack. ResolveHub allows customers to raise support tickets and track their issues while admins can manage, review, update, and resolve customer problems through a professional dashboard.


---

# Live Demo

Frontend: https://resolvehubcrm.onrender.com/

Backend API: https://resolvehubcrm-backend.onrender.com

---

# Screenshots

## Home Page
![ResolveHub Home Page](./screenshot/home.png)

## Admin Dashboard
![ResolveHub Dashboard Page](./screenshot/dashboard.png)

## Mobile Responsive Design
![ResolveHub TicketDetails Page](./screenshot/ticketDetails.png)

---

# Features

## Customer Features

- Raise support tickets
- Generate unique tracking ID
- Track ticket status
- View support updates
- Responsive UI
- Real-time ticket workflow

---

## Admin Features

- Secure admin authentication
- JWT cookie-based authorization
- Protected admin routes
- View all tickets
- Search tickets
- Filter tickets by status
- Update ticket status
- Add support notes
- Timeline tracking system
- Responsive admin dashboard

---

# Tech Stack

## Frontend

- React.js
- React Router DOM
- Axios
- React Hot Toast
- Vanilla CSS
- Vite

---

## Backend

- Node.js
- Express.js
- MongoDB Atlas
- Mongoose
- JWT Authentication
- bcryptjs
- cookie-parser
- cors

---

# Project Architecture

```txt
Client (React Frontend)
        ↓
Express.js REST API
        ↓
MongoDB Atlas Database
```

---

# Folder Structure

```txt
ResolveHub/
│
├── client/                  # Frontend React Application
│   ├── public/
│   ├── src/
│   ├── .env.example
│   └── package.json
│
├── server/                  # Backend Express API
│   ├── src/                 # Backend Source Code
│   │   ├── config/          # Database & Environment Configurations
│   │   ├── controllers/     # Route Controller Functions
│   │   ├── middleware/      # Custom Middlewares (Auth, Error handling)
│   │   ├── models/          # Mongoose Database Schemas
│   │   └── routes/          # Express API Route Definitions
│   │
│   ├── .env.example         # Backend Environment Template
│   └── package.json         # Backend Dependencies & Scripts
│
├── .gitignore               # Ignored Git Files (node_modules, .env)
└── README.md                # Project Documentation
```

---

# Installation & Setup

## Clone Repository

```bash
git clone https://github.com/AkhtarShaikh-7/ResolveHubCRM
```

---

# Backend Setup

## Navigate to Server

```bash
cd server
```

## Install Dependencies

```bash
npm install
```

## Create .env File

```env
PORT=3000

MONGO_URI=your_mongodb_connection_string

JWT_SECRET=your_secret_key

CORS_ORIGIN=http://localhost:5173
```

## Start Backend Server

```bash
npm run dev
```

Backend runs on:

```txt
http://localhost:3000
```

---

# Frontend Setup

## Navigate to Client

```bash
cd client
```

## Install Dependencies

```bash
npm install
```

## Create .env File

```env
VITE_API_URL=http://localhost:5000/api
```

## Start Frontend

```bash
npm run dev
```

Frontend runs on:

```txt
http://localhost:5173
```

---

# Environment Variables

## Backend (.env)

| Variable | Description |
|---|---|
| PORT | Server Port |
| MONGO_URI | MongoDB Atlas Connection String |
| JWT_SECRET | Secret Key for JWT |
| CORS_ORIGIN | Frontend URL |

---

## Frontend (.env)

| Variable | Description |
|---|---|
| VITE_API_URL | Backend API URL |

---

# API Endpoints

## Authentication

| Method | Endpoint | Description |
|---|---|---|
| POST | /api/auth/register | Register Admin |
| POST | /api/auth/login | Login Admin |
| GET | /api/auth/me | Current Admin |
| POST | /api/auth/logout | Logout Admin |

---

## Tickets

| Method | Endpoint | Description |
|---|---|---|
| POST | /api/tickets/create | Create Ticket |
| POST | /api/tickets/track | Track Ticket |
| GET | /api/tickets | Get All Tickets |
| GET | /api/tickets/:id | Get Single Ticket |
| PUT | /api/tickets/:id/status | Update Ticket Status |
| POST | /api/tickets/:id/note | Add Support Note |

---

# Deployment

## Frontend Deployment

- Render Static Site

## Backend Deployment

- Render Web Service

## Database

- MongoDB Atlas

---

# Future Improvements

- Ticket Priority System
- Email Notifications
- Admin Analytics Dashboard
- Role-Based Access Control
- Dark/Light Theme Toggle

---

# Learning Outcomes

This project demonstrates:

- Full-stack MERN development
- Authentication & Authorization
- REST API architecture
- MongoDB database design
- Protected Routes
- Context API state management
- Responsive UI design
- Production deployment
- Git & GitHub workflow

---

# Author

Akhtar Shaikh

LinkedIn: https://linkedin.com/in/akhtarshaikh07

GitHub: https://github.com/AkhtarShaikh-7
