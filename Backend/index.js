// since express is a dependency, we have to import express
import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import connectDB from "./config/connectDB.js";
import router from "./routes/authRoutes.js";
import songRouter from "./routes/songRoutes.js";

dotenv.config(".env");
const PORT = process.env.PORT || 5001; // to get the access of what is write inside the environment variables

const app = express();
app.use(express.json()); // data from backend into json fromat and then process it

// connect your database
connectDB();


const allowedOrigins = [
  "http://localhost:5173", // to allow cross-origin requests
   // when we create a react application using vite, then 5173 is common
    // origin: "*" -> access to all
    // only the above frontend can access the backend
    // in 5173 -> react front end runs
  "https://music-player-sigma-green.vercel.app"
];

// for secutity, in backend
app.use(
  cors({
    origin: (origin, callback) => {
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error("Not allowed by CORS"));
      }
    },
    credentials: true,
  })
);


// / -> home ------> routing
// **********
// here a request and response cycle is running

// app.get("/", (req, res) => {
//          controller - response with status code, there are errors like 400, 500,   // ok 200 request will come to the backend
//    res.status(200).json({ message: "Server is working" });
// });

app.use("/api/auth", router);
// “Any request starting with /api/auth should go to authRoutes.js.”

app.use("/api/songs", songRouter);

// When we upload into the 24/7 clouds like AWS or Asure, the port value differs, this port value is present in the .env file
// In .env file, if we change the value there, everywhere the value gets updated
// these datas are secure, since they are not added into the git hub
app.listen(PORT, () => console.log(`Server is running on Port ${PORT}`));
