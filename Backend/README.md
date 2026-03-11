# MERN Backend Template

A starter backend setup using **Express**, **MongoDB (via Mongoose)**, **dotenv**, and **CORS**.  
This template is designed for quick bootstrapping of MERN stack projects.

---

## 🚀 Features

- Express server with JSON middleware
- MongoDB connection via Mongoose (`config/connectDB.js`)
- Environment variable support with dotenv
- CORS enabled for frontend integration (default: `http://localhost:5173`)
- Ready-to-use project structure

---

## 📂 Folder Structure

Backend/
├── config/
│ └── connectDB.js # MongoDB connection logic
├── index.js # Main server entry point
├── package.json # Project metadata & dependencies
├── package-lock.json
├── .gitignore # Ignores node_modules and .env
└── .env # Environment variables (ignored in Git)

---

## ⚙️ Getting Started

1. **Clone the repo**

   ```bash
   git clone https://github.com/Sonali-lx/mern-backend-template.git
   cd mern-backend-template
   ```

2. **Install dependencies**

   ```bash
   npm install
   ```

3. **Create a .env file**

   ```bash
   PORT=5001
   MONGODB_URL=mongodb://localhost:27017/mydb
   ```

4. **Run the server**

   ```bash
    npm run dev
   ```

5. **Test the API**

- Visit: http://localhost:5001/
- Response: { "message": "Server is working" }

## 🌐 Usage

This repo is marked as a template.

To start a new project:

- Click Use this template on GitHub.
- Create a new repository.
- Clone and begin building your MERN app.

## 🛡️ Notes

- .env and node_modules are excluded via .gitignore.
- Update CORS origin in index.js to match your frontend URL.
- For production, configure environment variables securely (e.g., AWS, Azure, or Heroku).

## 🔮 Future Enhancements

This template can be extended with:

- Authentication (signup/login with JWT + bcrypt)
- CRUD routes for users and other models
- File uploads (ImageKit, Cloudinary, etc.)
- Email service integration (Nodemailer)
- Deployment scripts for AWS/Heroku

## 📜 License

ISC

---
