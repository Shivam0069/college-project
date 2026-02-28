const mongoose = require("mongoose");

const noticeSchema = new mongoose.Schema(
  {
    title: String,
    content: String,
    category: String,
  },
  { timestamps: true },
);

module.exports = mongoose.model("Notice", noticeSchema);
