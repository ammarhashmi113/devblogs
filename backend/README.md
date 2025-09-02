# DevLogs Backend

This is the backend API for **DevLogs**, a full-stack blogging platform for developers. Built with **Node.js**, **Express**, and **MongoDB**, it handles all core functionalities including authentication, blog management, likes, and comments.

## 🔧 Tech Stack

- Node.js
- Express
- MongoDB + Mongoose
- JWT Authentication
- Joi Validation
- CORS
- Bcrypt for password hashing

## 📂 Project Structure

```
backend/
├── middlewares/
│   ├── blogWithIdExists.js
│   └── isAuthenticated.js
├── models/
│   ├── Blog.js
│   ├── Comment.js
│   ├── Like.js
│   └── User.js
├── utils/
│   └── AppError.js
│   └── catchAsync.js
├── app.js
├── .env
├── package.json
└── README.md
```

## 🛠️ Features

- User registration, login, and authentication
- Get current user (`/me`)
- CRUD for blogs
- Add and remove likes from blogs (auth, blog owners can't self-like)
- Add and delete comments (auth)
- Error handling and input validation

## ⚙️ Setup Instructions

1. Clone the repo and navigate to `/backend`
2. Create a `.env` file:
   ```env
   PORT=3000
   MONGODB_URI=your_mongodb_uri
   JWT_SECRET=your_jwt_secret
   ```
3. Install dependencies:
   ```bash
   npm install
   ```
4. Run the development server:
   ```bash
   node app.js
   ```

## 📮 API Endpoints

| Method | Endpoint                           | Description                                |
|--------|------------------------------------|--------------------------------------------|
| POST   | /api/register                      | Register a new user                        |
| POST   | /api/login                         | Login and receive JWT                      |
| GET    | /api/me                            | Get current user info                      |
| GET    | /api/blogs                         | List all blogs                             |
| GET    | /api/blogs/:id                     | Get a specific blog                        |
| POST   | /api/blogs                         | Create a new blog (auth)                   |
| PUT    | /api/blogs/:id                     | Edit a blog (author only)                  |
| DELETE | /api/blogs/:id                     | Delete a blog (author only)                |
| POST   | /api/blogs/:id/likes               | Like a blog (auth, author can't like)      |
| DELETE | /api/blogs/:id/likes               | Unlike a blog (auth, like owner only)      |
| GET    | /api/blogs/:id/comments            | List comments on a blog                    |
| POST   | /api/blogs/:id/comments            | Add comment (auth)                         |
| DELETE | /api/blogs/:id/comments/:commentId | Remove comment (auth, comment author only) |
| DELETE | /api/comments/:id                  | Delete comment (auth, comment author only) |

## 🧪 Testing

Use Postman or Hoppscotch to test the routes.

## 📄 License

MIT
           