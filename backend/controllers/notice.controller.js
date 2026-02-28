const Notice = require("../models/Notice");

exports.create = async (req, res) => {
  const notice = await Notice.create(req.body);
  res.json(notice);
};

exports.delete = async (req, res) => {
  await Notice.findByIdAndDelete(req.params.id);
  res.json({ message: "Notice deleted" });
};

exports.getAll = async (req, res) => {
  const notices = await Notice.find();
  res.json(notices);
};
