const User = require("../models/User");

exports.getAll = async (req, res) => {
  const users = await User.find();
  res.json(users);
};

exports.approve = async (req, res) => {
  await User.findByIdAndUpdate(req.params.id, { status: "approved" });
  res.json({ message: "User approved" });
};

exports.block = async (req, res) => {
  await User.findByIdAndUpdate(req.params.id, { status: "blocked" });
  res.json({ message: "User blocked" });
};
