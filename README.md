# Library-Management-System

## Overview
This is a **RESTful API** for a Library Management System (LMS) built with **Node.js, Express, and Sequelize (MySQL)**. It allows users to **borrow and return books**, manage users, and perform other library-related tasks while following proper authentication and role-based access control (RBAC).

## Features
- **User Authentication** (Register, Login, JWT-based authentication)
- **Role-Based Access Control (RBAC)** (Admin, Librarian, Member)
- **Book Management** (Add, Update, Delete, View books)
- **Borrowing & Returning Books**
- **Middleware for Security & Logging** (Helmet, Morgan, Joi for validation)
- **Error Handling Middleware**

## Tech Stack
- **Backend**: Node.js, Express.js
- **Database**: MySQL with Sequelize ORM
- **Authentication**: JWT (JSON Web Token)
- **Security**: Helmet, bcrypt for password hashing
- **Validation**: Joi
- **Logging**: Morgan

## Installation
### Prerequisites
- Node.js installed
- MySQL installed and running

### Steps
1. **Clone the repository**
   ```sh
   git clone https://github.com/Preetykumari06/Library-Management-System.git
   cd Library-Management-System
   ```

2. **Install dependencies**
   ```sh
   npm install
   ```

3. **Create a `.env` file** and add the following:
   ```env
   PORT=4500
   DATABASE_URL=mysql://user:password@localhost:3306/library_db
   JWT_SECRET=your_jwt_secret
   ```

4. **Run database migrations**
   ```sh
   npx sequelize-cli db:migrate
   ```

5. **Start the server**
   ```sh
   npm start
   ```
   The server will run on `http://localhost:4500`

## API Endpoints
### **Authentication Routes**
| Method | Endpoint            | Description            | Roles |
|--------|---------------------|------------------------|--------|
| POST   | `/api/auth/register` | Register a new user    | Public |
| POST   | `/api/auth/login`    | Login user & get token | Public |

### **User Routes**

| Method | Endpoint            | Description      | Roles  |
|--------|---------------------|------------------|--------|
| GET    | `/api/users`        | Get all users    | Admin  |
| GET    | `/api/users/:id`    | Get User By Id   | Admin  |
| PUT    | `/api/users/:id`    | Update user      | Admin  |
| DELETE | `/api/users/:id`    | Delete user      | Admin  |
| Get   |`/api/users/profile/me`|Get User Profile | User   |
| Put   |`/api/users/profile/me`|Update user      | User   |
|--------|---------------------|------------------|--------|

### **Book Routes**
|--------|---------------------|---------------------|----------------------|
| Method | Endpoint            | Description         | Roles                |
|--------|---------------------|---------------------|----------------------|
| POST   | `/api/books`        | Add a new book      | Admin                |
| GET    | `/api/books`        | Get all books       | All users            |
| PUT    | `/api/books/:id`    | Update book details | Admin                |
| DELETE | `/api/books/:id`    | Delete a book       | Admin                |
|--------|---------------------|---------------------|----------------------|

### **Borrowing Routes**
|--------|-----------------------------------------|----------------------|--------------|
| Method | Endpoint                                | Description          | Roles        |
|--------|-----------------------------------------|----------------------|--------------|
| POST   | `/api/borrows/borrow/:bookId`           | Borrow a book        | Member       |
| POST   | `/api/borrows/return/:bookId`           | Return a book        | Member       |
| GET    | `/api/borrows`                          | Get borrowed books   | All users    |
| POST   | `/api/borrows/librarian/borrow/:bookId` | Borrow a book        | Librarian    |  
| POST   | `/api/borrows/librarian/return/:bookId` | Return a book        | Librarian    |
|--------|-----------------------------------------|-------------------------------------|


## Postman API Testing

You can test the Library Management System API using Postman.

###  Import Collection
- Download and import the [Postman Collection](/Library-Management-System.postman_collection.json) into Postman.

###  Authentication
- Use the **Login API** to get a token and include it in `Authorization: Bearer <token>` for secured endpoints.

