import mongoose from "mongoose";
import bcrypt from "bcrypt";

const userSchema = new mongoose.Schema({
  // design the metadata
  name: {
    type: String,
    required: [true, "Name is required"],
  },
  email: {
    type: String,
    required: [true, "Email is required"],
    unique: true,
    lowercase: true, // convertes into lowercase
  },
  password: {
    type: String,
    required: [true, "Password is required"],
    minlength: 6,
  },
  avatar: {
    type: String,
    default: "", // empty string
  },
  resetPasswordToken: String,
  resetPasswordTokenExpires: Date,

  favourites: [
    {
      id: { type: String, required: true },
      name: String,
      artist_name: String,
      image: String,
      duration: String,
      audio: String,
    },
  ],
  default: [], // ✅ ensures array is always initialized
});

// Pre save function for password
userSchema.pre("save", async function () {
  if (!this.isModified("password")) return; // to avoid double layer of encryption

  const salt = await bcrypt.genSalt(10); // Generates a random “salt” (extra random data) to make the hash unique.
  this.password = await bcrypt.hash(this.password, salt); // Takes the plain text password and the salt, and produces a secure hash.
  // That hash is what gets stored in MongoDB, not the plain password.
});

// Compare password
userSchema.methods.comparePassword = function (enteredPassword) {
  // custom method
  return bcrypt.compare(enteredPassword, this.password);
};

const User = mongoose.model("User", userSchema);
export default User;
