import mongoose from "mongoose";

const communitySchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  img: {
    type: String,
    required: true,
  },
  members: {
    type: Number,
  },
});

const communityModel =
  mongoose.models.communities || mongoose.model("communities", communitySchema);

export default communityModel;
