const mongoose = require("mongoose");

const courseSchema = new mongoose.Schema({
  title: String,
  status: String,
  progress: Number,
  assessments: Number,
  practiceTest: String,
  startDate: String,
  endDate: String,
});

const Course = mongoose.model("Course", courseSchema);
module.exports = Course; // Use module.exports for CommonJS
