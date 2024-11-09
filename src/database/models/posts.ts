import mongoose from "mongoose";

const postSchema = new mongoose.Schema({
  userId: {
    type: String,
    required: true,
  },
  communityId: {
    type: String,
    required: true,
  },
  message: {
    type: String,
    required: true,
  },
  dateCreated: {
    type: Date,
    required: true,
  },
});

const postModel = mongoose.models.posts || mongoose.model("posts", postSchema);

export default postModel;
