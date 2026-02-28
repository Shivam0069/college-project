const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");

dotenv.config();
const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/uploads", express.static("uploads"));

app.use("/api/auth", require("./routes/auth.routes"));
app.use("/api/users", require("./routes/user.routes"));
app.use("/api/notices", require("./routes/notice.routes"));
app.use("/api/gallery", require("./routes/gallery.routes"));
app.use("/api/events", require("./routes/event.routes"));
app.use("/api/materials", require("./routes/material.routes"));

module.exports = app;
