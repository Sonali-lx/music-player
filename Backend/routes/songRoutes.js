import express from "express";
import { protect } from "../middleware/authMiddleware.js";
import {
  getPlaylistByTag,
  getSongs,
  toggleFavourite,
} from "../controllers/songController.js";

const songRouter = express.Router();

songRouter.get("/", getSongs);
songRouter.get("/playlistByTag/:tag", getPlaylistByTag); // :tag -> will be passed in the URL and will be in the params
songRouter.post("/favourites", protect, toggleFavourite);
songRouter.get("/favourites", protect, (req, res) => {
  res.json(req.user.favourites);
});

export default songRouter;
