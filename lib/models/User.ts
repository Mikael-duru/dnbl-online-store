import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  firebaseId: String,
  wishlist: {
    type: Array,
    default: []
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: {
    type: Date,
    default: Date.now
  }
});

const User = mongoose.models.User || mongoose.model("User", userSchema);

export default User;