import mongoose from "mongoose";

const eventSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  date: {
    type: Date,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  location: {
    type: String,
    required: true,
  },
  group: {
    type: String,
    required: true,
  },
  organiser: {
    type: String,
    required: true,
  },
});

const eventModel =
  mongoose.models.events || mongoose.model("events", eventSchema);

export default eventModel;
