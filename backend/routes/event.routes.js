const express = require("express");
const router = express.Router();
const Event = require("../models/Event");

// POST /api/events/
router.post("/", async (req, res) => {
  try {
    const { title, description, date, time, location, category } = req.body;

    const event = new Event({
      title,
      description,
      date, // "2026-02-28" — Mongoose auto-converts to Date
      time, // "14:30" — stored as plain string
      location,
      category,
    });

    await event.save();
    res.status(201).json(event);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// GET /api/events/
router.get("/", async (req, res) => {
  try {
    const events = await Event.find().sort({ date: 1 });
    res.json(events);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// DELETE /api/events/:id
router.delete("/:id", async (req, res) => {
  try {
    const event = await Event.findByIdAndDelete(req.params.id);

    if (!event) {
      return res.status(404).json({ message: "Event not found" });
    }

    res.json({ message: "Event deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
