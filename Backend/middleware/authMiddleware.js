import User from "../models/userModel.js";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

export const protect = async (req, res, next) => {
  // next -> distinguishes controller and middleware

  const authHeader = req.headers.authorization; // here is where the bearer token is present

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(401).json({ message: "Not Authorized, missing token" });
  }

  const token = authHeader.split(" ")[1];

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    console.log(decoded);

    const user = await User.findById(decoded.id).select("-password");

    if (!user) {
      return res.status(401).json({ message: "Not authorized" });
    }

    req.user = user; // a new key
    //const userId = req.user._id;

    next(); // the request that is going to the controller continues
  } catch (error) {
    console.error("Token Verification Failed", error.message);
    return res.status(401).json({ message: "Invalid or expired token" });
  }
};
