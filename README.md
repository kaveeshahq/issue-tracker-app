# 🐛 Issue Tracker

A full-stack issue tracking web application built with React, TypeScript, Redux Toolkit, Express.js, and MongoDB. Users can register, log in, and manage software issues with full CRUD operations, search, filtering, pagination, and JSON export.

---



## ✨ Features

- 🔐 **User Authentication** — Register and login with JWT-based auth and bcrypt password hashing
- 📋 **Issue Management** — Create, view, edit, and delete issues
- 🏷️ **Issue Fields** — Title, description, status, priority, and severity
- 📊 **Status Dashboard** — Live count cards for Open, In Progress, Resolved, and Closed issues
- 🔍 **Search & Filter** — Real-time search with debouncing + filter by status, priority, severity
- 📄 **Pagination** — 10 issues per page with page navigation
- 💾 **JSON Export** — Download all issues as a `.json` file
- 🔒 **Protected Routes** — All issue routes require authentication
- 📱 **Responsive UI** — Works on desktop and mobile

---

## 🛠️ Tech Stack

### Frontend
| Tech | Purpose |
|---|---|
| React + Vite | Frontend framework with fast HMR |
| TypeScript | Type safety and better developer experience |
| Redux Toolkit | Global state management |
| React Router v6 | Client-side routing |
| Axios | HTTP client with interceptors |
| Tailwind CSS | Utility-first CSS styling |
| React Hot Toast | Toast notifications |

### Backend
| Tech | Purpose |
|---|---|
| Express.js | REST API server |
| MongoDB + Mongoose | Database and schema modeling |
| JWT | Stateless authentication |
| bcryptjs | Secure password hashing |
| CORS | Cross-origin request handling |

---

## 📁 Project Structure

```
issue-tracker/
├── issue-tracker-client/        # Frontend (React + Vite + TS)
│   └── src/
│       ├── components/
│       │   ├── ui/              # Reusable primitives (Button, Input, Modal, Badge...)
│       │   ├── issues/          # Issue-specific components
│       │   ├── auth/            # ProtectedRoute
│       │   └── layout/          # Navbar, AppLayout
│       ├── pages/               # LoginPage, RegisterPage, DashboardPage, IssueDetailPage
│       ├── store/               # Redux store + slices (auth, issues, ui)
│       ├── services/            # Axios API service functions
│       ├── hooks/               # useAppDispatch, useAppSelector, useDebounce
│       ├── types/               # TypeScript interfaces and enums
│       └── utils/               # exportToJson, statusColors, formatDate
│
└── issue-tracker-server/        # Backend (Express + MongoDB)
    └── src/
        ├── models/              # User.js, Issue.js (Mongoose schemas)
        ├── routes/              # auth.routes.js, issue.routes.js
        ├── controllers/         # auth.controller.js, issue.controller.js
        ├── middleware/          # auth.middleware.js, errorHandler.js
        ├── utils/               # generateToken, apiResponse, buildIssueQuery
        └── config/              # db.js (MongoDB connection)
```

---

## 🚀 Getting Started

### Prerequisites

- Node.js v18+
- MongoDB (local or MongoDB Atlas)
- npm

---

### Backend Setup

```bash
# 1. Navigate to the server folder
cd issue-tracker-server

# 2. Install dependencies
npm install

# 3. Create a .env file
cp .env.example .env
```

Update your `.env` file:

```env
PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_super_secret_key
JWT_EXPIRES_IN=7d
CLIENT_URL=http://localhost:5173
```

```bash
# 4. Start the development server
npm run dev
```

The API will be running at `http://localhost:5000`

---

### Frontend Setup

```bash
# 1. Navigate to the client folder
cd issue-tracker-client

# 2. Install dependencies
npm install

# 3. Create a .env file
cp .env.example .env
```

Update your `.env` file:

```env
VITE_API_URL=http://localhost:5000/api
```

```bash
# 4. Start the development server
npm run dev
```

The app will be running at `http://localhost:5173`

---

## 📡 API Endpoints

### Auth Routes
| Method | Endpoint | Description | Auth Required |
|---|---|---|---|
| POST | `/api/auth/register` | Register a new user | No |
| POST | `/api/auth/login` | Login and get JWT token | No |

### Issue Routes
| Method | Endpoint | Description | Auth Required |
|---|---|---|---|
| GET | `/api/issues` | Get all issues (paginated + filterable) | Yes |
| GET | `/api/issues/:id` | Get a single issue | Yes |
| POST | `/api/issues` | Create a new issue | Yes |
| PUT | `/api/issues/:id` | Update an issue | Yes |
| DELETE | `/api/issues/:id` | Delete an issue | Yes |
| GET | `/api/issues/export` | Export all issues as JSON | Yes |

### Query Parameters for GET `/api/issues`
| Param | Type | Description |
|---|---|---|
| `search` | string | Search by title or description |
| `status` | string | Filter by status (Open, In Progress, Resolved, Closed) |
| `priority` | string | Filter by priority (Low, Medium, High, Critical) |
| `severity` | string | Filter by severity (Minor, Major, Critical, Blocker) |
| `page` | number | Page number (default: 1) |
| `limit` | number | Items per page (default: 10) |

---

