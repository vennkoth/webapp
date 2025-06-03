const express = require('express');
const mongoose = require('mongoose');
const app = express();

const userSchema = new mongoose.Schema({
  name: String,
  email: String,
  password: String,
});

const User = mongoose.model('User', userSchema);

// Connect to MongoDB
mongoose.connect("mongodb+srv://admin:admin12345@cluster0.wzbfsid.mongodb.net/CRUD", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(async () => {
  console.log("MongoDB connected successfully");

  // Create and save user
  const user = new User({
    name: "John Doe",
    email: "adiyEMAIL",
    password: "password123"
  });

  try {
    await user.save();
    console.log("User saved successfully");
  } catch (err) {
    console.error("Error saving user:", err);
  }
})
.catch((err) => console.error("MongoDB connection error:", err));

// Start server
app.listen(3000, () => {
  console.log("Server is running (-_-)");
});
