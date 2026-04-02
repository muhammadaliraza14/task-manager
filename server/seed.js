require("dotenv").config();
const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const User = require("./src/models/User");
const Task = require("./src/models/Task");

(async () => {
  await mongoose.connect(process.env.MONGO_URI);

  await User.deleteMany();
  await Task.deleteMany();

  const admin = await User.create({
    email: "admin@example.com",
    passwordHash: await bcrypt.hash("123456", 10),
    role: "admin"
  });

  const user = await User.create({
    email: "user@example.com",
    passwordHash: await bcrypt.hash("123456", 10)
  });

  await Task.create([
    { title: "Test Task 1", owner: user._id },
    { title: "Admin Task", owner: admin._id }
  ]);

  console.log("Seeded");
  process.exit();
})();