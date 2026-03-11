import express from "express";
import {
  resetPassword,
  forgotPassword,
  getMe,
  login,
  signup,
  editProfile,
} from "../controllers/authController.js"; // .js at end **
import { protect } from "../middleware/authMiddleware.js";

// here we are creating a user, so we use post request
const router = express.Router();

router.post("/signup", signup);
// signup req, res cycle is already defined in authRoutes

router.post("/login", login);

router.get("/me", protect, getMe);
// goes to protect, decodes the token, before it goes to getMe

router.post("/forgot-password", forgotPassword);

router.post("/reset-password/:token", resetPassword);
// /:token is a variable and it can contain value
// appears on the url link, copy and paste it in postman
//  it will be available inside params - parameter

router.patch("/profile", protect, editProfile);

export default router;
