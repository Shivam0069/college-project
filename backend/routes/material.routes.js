const router = require("express").Router();
const auth = require("../middlewares/auth.middleware");
const role = require("../middlewares/role.middleware");
const upload = require("../middlewares/upload.middleware");
const Material = require("../models/Material");

// POST /api/materials/
router.post(
  "/",
  auth,
  role("admin"),
  upload.single("file"),
  async (req, res) => {
    try {
      const { title, category, fileType, uploadedBy } = req.body;

      if (!title || !category) {
        return res
          .status(400)
          .json({ message: "Title and category are required" });
      }

      if (!req.file) {
        return res.status(400).json({ message: "File is required" });
      }

      const material = new Material({
        title,
        category,
        fileType: fileType || "pdf",
        uploadedBy,
        file: req.file.filename,
        downloads: 0,
      });

      await material.save();
      res.status(201).json(material);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },
);

// GET /api/materials/
router.get("/", async (req, res) => {
  try {
    const materials = await Material.find().sort({ createdAt: -1 });
    res.json(materials);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// DELETE /api/materials/:id
router.delete("/:id", auth, role("admin"), async (req, res) => {
  try {
    const material = await Material.findByIdAndDelete(req.params.id);

    if (!material) {
      return res.status(404).json({ message: "Material not found" });
    }

    res.json({ message: "Material deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.patch("/:id/download", async (req, res) => {
  try {
    const material = await Material.findByIdAndUpdate(
      req.params.id,
      { $inc: { downloads: 1 } },
      { new: true },
    );
    res.json(material);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
