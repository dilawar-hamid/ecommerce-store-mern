# E-Commerce Store (MERN)

A full-stack e-commerce web application with a customer storefront and an admin panel, built with the MERN stack.

> **Status: Under development.** Core authentication and product/category management are working. Cart, checkout and orders are in progress.

## Tech Stack

**Frontend:** React 19, Vite, React Router, Axios, Formik + Yup, Bootstrap 5
**Backend:** Node.js, Express 5, MongoDB (Mongoose), JWT, bcrypt, Multer
**Database:** MongoDB Atlas

## Features

### Implemented
- User registration and login with JWT authentication
- Password hashing with bcrypt
- Role-based access (user / admin) with protected routes
- Admin panel (SB Admin 2 based layout)
  - Add, view, update and delete **categories**
  - Add, view, update and delete **products** with image upload
- Form validation using Formik and Yup
- Storefront pages: Home, Products, About, Login, Register

### In Progress
- Shopping cart (UI ready, logic pending)
- Checkout and order placement
- Orders management and dashboard statistics (UI ready, backend pending)
- Deployment

## Project Structure

```text
.
├── backend/
│   ├── config/        # DB connection, multer setup
│   ├── controllers/   # Category, Product, User logic
│   ├── middleware/    # JWT verification
│   ├── models/        # Mongoose schemas
│   ├── routes/        # API routes
│   ├── uploads/       # Uploaded product images
│   └── server.js
├── src/
│   ├── admin/         # Admin panel (components, layouts, pages, validations)
│   ├── user/          # Storefront (components, layouts, pages)
│   ├── context/       # Auth context
│   └── App.jsx
└── package.json
```

## Getting Started

### Prerequisites
- Node.js 18+
- A MongoDB database (local or MongoDB Atlas)

### 1. Clone the repository
```bash
git clone https://github.com/dilawar-hamid/ecommerce-store-mern.git
cd ecommerce-store-mern
```

### 2. Setup the backend
```bash
cd backend
npm install
```
Create a `.env` file inside `backend/` (see `.env.example`):
```env
MONGO_URI=your_mongodb_connection_string
PORT=4000
JWT_SECRET=your_secret_key
```
Start the server:
```bash
npm run dev
```

### 3. Setup the frontend
Open a new terminal in the project root:
```bash
npm install
npm run dev
```
The app runs on `http://localhost:5173` and the API on `http://localhost:4000`.

## API Endpoints

| Resource   | Method | Endpoint                | Access |
|------------|--------|-------------------------|--------|
| Categories | GET    | `/categoryroutes`       | Public |
| Categories | POST / PUT / DELETE | `/categoryroutes`, `/categoryroutes/:id` | Auth |
| Products   | GET    | `/productroutes`        | Public |
| Products   | POST / PUT / DELETE | `/productroutes`, `/productroutes/:id` | Auth |
| Users      | POST   | `/userroutes/login`     | Public |

## Author

**Dilawar Hamid**
GitHub: [@dilawar-hamid](https://github.com/dilawar-hamid)
