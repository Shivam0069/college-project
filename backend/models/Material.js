const mongoose = require("mongoose");

const materialSchema = new mongoose.Schema(
  {
    title: { type: String, required: true, trim: true },
    category: { type: String, required: true, trim: true },
    fileType: {
      type: String,
      enum: ["pdf", "doc", "ppt", "video", "other"],
      default: "pdf",
    },
    file: { type: String, required: true }, // stored filename
    uploadedBy: { type: String },
    downloads: { type: Number, default: 0 },
  },
  { timestamps: true },
);

module.exports = mongoose.model("Material", materialSchema);
