const Gallery = require("../models/Gallery");

exports.upload = async (req, res) => {
  const image = await Gallery.create({
    imageUrl: req.file.filename,
    caption: req.body.caption,
  });
  res.json(image);
};

exports.getAll = async (req, res) => {
  const images = await Gallery.find();
  res.json(images);
};

exports.delete = async (req, res) => {
  const { id } = req.params;
  await Gallery.findByIdAndDelete(id);
  res.json({ message: "Image deleted" });
};
