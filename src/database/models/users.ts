import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  fullName: {
    type: String,
    required: true,
  },
  username: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  communities: {
    type: Array,
    default: [],
  },
  events: {
    type: Array,
    default: [],
  },
  points: {
    type: Number,
    default: 0,
  },
  pointsHistory: {
    type: Array,
    default: [],
  },
});

const userModel = mongoose.models.users || mongoose.model("users", userSchema);

export default userModel;
