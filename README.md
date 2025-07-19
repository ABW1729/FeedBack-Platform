# 📝 Feedback Platform

A role-based feedback form builder and response analysis platform with **admin**, **moderator**, and **user** functionality. Built with **MERN stack** (MongoDB, Express.js, React.js, Node.js) and deployed using **Railway** and **Vercel**.

---

## 📌 Features

- ✅ User registration and login with role selection (`admin`, `moderator`, `user`)
- 🧑‍💼 **Admin/Moderator**:
  - Create dynamic forms with multiple questions (MCQ/Subjective)
  - Edit, delete, reorder questions and options using arrow buttons
  - View form submission summary and export responses to CSV
  - See all form responses in a tabular format
- 🧾 **Users**:
  - Submit feedback responses to available forms
- 🔄 Reordering of questions and options via up/down arrow buttons
- 🗑️ Deletion of individual questions and options
- 🔒 **Form validation**:
  - Must have at least 1 question
  - Question title must not be empty
  - MCQs must contain at least 1 non-empty option
- 🧪 Modular and scalable codebase (separate frontend/backend structure)
- ⚙️ Role-based protected API routes
- 📊 Feedback responses stored and queried from MongoDB
- 🧾 Summary(Chart based) view of all form submissions with export-to-CSV option
- 🌐 Live deployment hosted on **Vercel**
- 📬 Email and password-based authentication system with JWT

---

## 🧱 Project Structure

```
feedback-platform/
├── frontend/                  # React frontend
│   ├── public/
│   └── src/
│       ├── components/
│       ├── pages/
│       ├── App.js
│       ├── index.js
│       └── ...
├── backend/                  # Express backend
│   ├── controllers/
│   ├── models/
│   ├── routes/
│   ├── middleware/
│   └── index.js
├── .env
├── package.json
└── README.md
```

---

## 🚀 Live Deployment

```bash
https://forms-eight-nu.vercel.app
```

---

## 💻 Local Deployment Instructions

### 1. Clone the repository

```bash
git clone https://github.com/ABW1729/feedback-platform.git
cd feedback-platform
```

---

### 2. Environment Setup

#### `.env`  

```
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
```

---

### 3. Backend Setup

```bash
cd backend
npm install
node server.js
```

- Express server will run on `http://localhost:5000`

---

### 4. Frontend Setup

```bash
cd ../frontend
npm install
npm run start
```

- React app will run on `http://localhost:3000`

---

## 🔐 Environment Variables

| Variable      | Description                    |
|---------------|--------------------------------|
| `MONGO_URI`   | MongoDB connection URI         |
| `JWT_SECRET`  | Secret key for JWT token auth  |

---

## 🧪 API Endpoints

### 🔐 Auth

- `POST /auth/register` – Register a new user (user, admin, or moderator)
- `POST /auth/login` – Authenticate user and receive JWT token

### 📋 Forms

- `POST /forms` – Create a new form (Admin/Moderator only)
- `GET /forms` – Get all forms (visible to authenticated users)
- `GET /forms/:id` – Get detailed form information
- `PUT /forms/:id` – Update/edit a form (Admin/Moderator only)
- `DELETE /forms/:id` – Delete a form (Admin/Moderator only)
- `GET /forms/:id/summary` – Get summary/analytics of responses (Admin/Moderator only)
- `GET /forms/:id/export` – Export responses to CSV (Admin/Moderator only)

### ✅ Responses

- `POST /forms/:id/submit` – Submit a feedback response (Users)


---

## 🔧 Technologies Used

| Stack      | Tools/Libraries                     |
|------------|-------------------------------------|
| Frontend   | React, TailwindCSS, Axios, React Router |
| Backend    | Express.js, Mongoose, bcrypt, JWT   |
| Database   | MongoDB (Atlas)                     |
| Hosting    | Railway (fullstack deployment)      |

---

## 🧩 Modularity & Code Practices

- Separation of concerns via `controllers`, `routes`, `models`
- Reusable components in React
- Role-based access control (RBAC)
- Input validations (both frontend and backend)

---



---

## 🛠️ Future Enhancements

- Email verification
- Response analytics dashboard
- Export responses to CSV
- Form expiration and scheduling
- Shareable form links with public access

---

