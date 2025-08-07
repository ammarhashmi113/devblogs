# 🧠 Devblogs

Welcome to **Devblogs**, a full-stack blogging platform built for developers by a developer. Here, users can read blogs, leave comments, like posts, and more, all powered by a clean React frontend and a secure Express + MongoDB backend.

---

## ✨ Features

- 🔐 JWT-based authentication system
- 📰 Blog posts with categories, tags, and images
- ❤️ Like system (1 like per user, no self-likes 👀)
- 💬 Commenting system with author-only deletion
- 🧠 Blog search + filter (coming soon)
- 🎨 Responsive UI built with Tailwind CSS
- 🧪 Clean API structure with validation, error handling, and auth middlewares

---

## 🏗️ Tech Stack

| Layer     | Tech                                 |
|-----------|--------------------------------------|
| Frontend  | React, Vite, Tailwind CSS, Axios     |
| Backend   | Node.js, Express, Mongoose, JWT      |
| Database  | MongoDB (local or Atlas)             |
| Auth      | JWT + localStorage                   |

---

## 📁 Project Structure

```
devblogs/
├── frontend/    # React + Vite frontend
└── backend/     # Node.js + Express API
```

---

## 🚀 Getting Started

### 1. Clone the repo

```bash
git clone https://github.com/ammarhashmi113/devblogs.git
cd devblogs
```

---

### 2. Setup Backend

```bash
cd backend
npm install
```

Create a `.env` file in `backend/`:

```env
PORT=3000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_super_secret
```

Start the backend:

```bash
node app.js
```

---

### 3. Setup Frontend

```bash
cd ../frontend
npm install
```

Create a `.env` file in `frontend/`:

```env
VITE_API_BASE_URL=http://localhost:3000/api
```

Start the frontend:

```bash
npm run dev
```

Your app will now be live at `http://localhost:5173` (or whatever Vite says).

---

## 🔗 API Overview

API endpoints are documented in the [**backend README**](./backend/README.md), but here’s a quick glance:

- `POST /api/register` — Create account
- `POST /api/login` — Login
- `GET /api/me` — Current user
- `GET /api/posts` — All blog posts
- `GET /api/posts/:id` — Blog details
- `POST /api/posts` — Create blog (auth)
- `POST /api/posts/:id/comments` — Add comment (auth)
- `POST /api/posts/:id/likes` — Like post (auth)

---

## 📸 UI Preview

> Coming soon!

---

## 🛣️ Roadmap

- [ ] User registration & signup UI
- [ ] Author profile pages
- [ ] Markdown blog editor
- [ ] Search + tag filters
- [ ] Responsive mobile-first layout

---

## 🧑‍💻 Author

Made with heart & brain cells by   [**Ammar Hashmi**](https://github.com/ammarhashmi113)

---

## 📝 License

MIT, feel free to fork and clone.

---