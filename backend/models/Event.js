const mongoose = require("mongoose");

const eventSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },
    description: {
      type: String,
      trim: true,
    },
    date: {
      type: Date,
      required: true,
    },
    time: {
      type: String, // stored as "HH:MM"
    },
    location: {
      type: String,
      trim: true,
    },
    category: {
      type: String,

      default: "other",
    },
  },
  { timestamps: true },
);

module.exports = mongoose.model("Event", eventSchema);
