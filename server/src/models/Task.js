const mongoose = require("mongoose");

const taskSchema = new mongoose.Schema(
  {
    title: String,
    status: { type: String, enum: ["todo", "in-progress", "done"], default: "todo" },
    tags: [String],
    dueDate: Date,
    owner: { type: mongoose.Schema.Types.ObjectId, ref: "User" }
  },
  { timestamps: true }
);

taskSchema.index({ title: "text" });

module.exports = mongoose.model("Task", taskSchema);