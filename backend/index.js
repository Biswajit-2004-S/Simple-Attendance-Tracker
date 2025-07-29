const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const bodyParser = require("body-parser");

const Attendance = require("./models/Attendance");

const app = express();
const PORT = 5000;

// Replace <password> with your actual MongoDB password
const mongoURI = "mongodb+srv://Biswajit_Server:1234Biswajit@cluster0.khtlzfd.mongodb.net/attendanceDB?retryWrites=true&w=majority&appName=Cluster0";

mongoose.connect(mongoURI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log("✅ Connected to MongoDB"))
.catch((err) => console.error("MongoDB connection error:", err));

app.use(cors());
app.use(bodyParser.json());

// POST - Add attendance
app.post("/add-attendance", async (req, res) => {
  const { name } = req.body;
  if (!name) return res.status(400).json({ message: "Name is required" });

  try {
    const newEntry = new Attendance({ name });
    await newEntry.save();
    res.status(200).json({ message: "Attendance recorded" });
  } catch (err) {
    res.status(500).json({ message: "Error saving data" });
  }
});

// GET - Fetch all attendance
app.get("/attendance", async (req, res) => {
  try {
    const data = await Attendance.find();
    res.status(200).json(data);
  } catch (err) {
    res.status(500).json({ message: "Error fetching data" });
  }
});

// DELETE - Remove attendance by index
app.delete("/delete-attendance/:index", async (req, res) => {
  try {
    const index = parseInt(req.params.index);
    const allEntries = await Attendance.find();

    if (index < 0 || index >= allEntries.length) {
      return res.status(404).json({ message: "Index out of range" });
    }

    const entryToDelete = allEntries[index];
    await Attendance.findByIdAndDelete(entryToDelete._id);

    res.status(200).json({ message: "Attendance removed" });
  } catch (err) {
    res.status(500).json({ message: "Error deleting data" });
  }
});

app.listen(PORT, () => {
  console.log(`🚀 Backend running at http://localhost:${PORT}`);
});
