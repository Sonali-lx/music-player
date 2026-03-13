# 🎶 Musicart – Full Stack MERN Music Player

## 🚀 Overview
Musicart is my **first full‑stack project**, built during my internship at WebStack Academy.  
It’s a modern music player web application developed using the **MERN stack (MongoDB, Express, React, Node.js)** and deployed live on **Vercel (frontend)** and **Render (backend)**.

👉 Live Demo: [Musicart](https://music-player-sigma-green.vercel.app)

---

## ✨ Features
- 🎵 **Music Player** with play, pause, skip, shuffle, repeat, and volume controls  
- 📂 **Playlists** (Workout, Chill, Happy, Relaxing, Rock)  
- ❤️ **Favorites** – save your favorite tracks  
- 🔍 **Search** – find songs easily  
- 👤 **User Authentication** (login/signup)  
- 🎤 **Call to Action** – singers can record vocals and ping me to deploy their tracks!  

---

## 🛠️ Tech Stack
**Frontend**  
- React + Vite  
- CSS (dark theme UI)  
- Axios for API calls  
- Deployed on Vercel  

**Backend**  
- Node.js + Express  
- MongoDB (database)  
- CORS enabled for frontend integration  
- Deployed on Render  

---

## ⚙️ Installation & Setup  

### Clone the repository  
```bash
git clone https://github.com/Sonali-lx/music-player.git
cd music-player
```

### Backend Setup  
```bash
cd Backend
npm install
npm run dev
```
 Create a .env file with:
```
PORT=5001
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_secret_key
```

### Frontend Setup
```bash
cd Frontend
npm install
npm run dev
```
 Create a `.env` file with
```
VITE_API_URL=https://localhost:5173
```

