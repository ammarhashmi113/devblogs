# DevLogs Frontend

This is the frontend of **DevLogs**, a modern developer-focused blogging platform built with **React** and **Tailwind CSS**. It consumes the RESTful API from the backend to provide a full user experience including blog browsing, login, and detailed blog views.

## ⚛️ Tech Stack

- React (with Vite)
- Tailwind CSS
- React Router
- Axios (with interceptors)
- React Hot Toast
- lucide-react (for icons)
- Custom Hooks and Context API

## 📂 Project Structure

```
frontend/
├── public/
├── src/
│   ├── components/
│   │   ├── BlogCard.jsx
│   │   └── Navbar.jsx
│   ├── contexts/
│   │   └── userContext.js
│   ├── hooks/
│   │   └── useClickOutside.js
│   ├── pages/
│   │   ├── BlogsPage.jsx
│   │   ├── BlogDetailsPage/
│   │   │   ├── BlogDetailsPage.jsx
│   │   │   ├── AuthorCard.jsx
│   │   │   ├── Comments.jsx
│   │   │   ├── RecentBlogs.jsx
│   │   │   └── TagsList.jsx
│   │   └── LoginPage.jsx
│   ├── utils/
│   │   └── axiosConfig.js
│   ├── App.jsx
│   ├── main.jsx
│   └── index.css
├── index.html
├── .env
├── package.json
├── tailwind.config.js
├── vite.config.js
└── README.md
```

## 📦 Features

- Responsive blog listing page
- Blog detail page with author info, comments, and tags
- Login functionality
- Global user state with context
- Toast notifications
- Axios instance with token header

## 🚀 Setup Instructions

1. Navigate to `/frontend` directory
2. Install dependencies:
   ```bash
   npm install
   ```
3. Create `.env` file:
   ```env
   VITE_API_BASE_URL=http://localhost:3000/api
   ```
4. Start development server:
   ```bash
   npm run dev
   ```

## 📝 Pages

- `/` – All blogs page
- `/blogs/:id` – Blog details
- `/login` – User login

## 🧠 Notes

- Uses `UserContext` to manage global auth state.
- Uses `useClickOutside` to handle dropdowns and modals.

## 📄 License

MIT