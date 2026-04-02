const Task = require("../models/Task");

exports.getTasks = async (req, res) => {
  const { page = 1, limit = 5, search, status, sort = "-createdAt" } = req.query;

  const query = {};

  if (req.user.role !== "admin") {
    query.owner = req.user.id;
  }

  if (status) query.status = status;
  if (search) query.$text = { $search: search };

  const tasks = await Task.find(query)
    .sort(sort)
    .skip((page - 1) * limit)
    .limit(Number(limit));

  const count = await Task.countDocuments(query);

  res.json({ tasks, total: count });
};

exports.createTask = async (req, res) => {
  const task = await Task.create({
    ...req.body,
    owner: req.user.id
  });
  res.status(201).json(task);
};

exports.updateTask = async (req, res) => {
  const task = await Task.findByIdAndUpdate(req.params.id, req.body, { new: true });
  res.json(task);
};

exports.deleteTask = async (req, res) => {
  await Task.findByIdAndDelete(req.params.id);
  res.json({ msg: "Deleted" });
};