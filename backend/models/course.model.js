const mongoose = require("mongoose");

const courseSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  instructor: { type: String, required: true },
  category: { type: String, required: true },
  level: { type: String, required: true },
  duration: { type: String, required: true },
  startDate: { type: Date, required: true },
  endDate: { type: Date, required: true },
  language: { type: String, required: true },
  certificate: { type: Boolean, default: false },
  views: { type: Number, default: 0 },
  likes: { type: Number, default: 0 },
  dislikes: { type: Number, default: 0 },
  enrollments: { type: Number, default: 0 },
  completionRate: { type: Number, default: 0 },
  ratings: { type: Number, default: 0 },
  reviews: [
    {
      user: { type: String, required: true },
      comment: { type: String, required: true },
      rating: { type: Number, min: 1, max: 5, required: true },
    },
  ],
  shareCount: { type: Number, default: 0 },
  shareLinks: [
    {
      platform: { type: String, required: true },
      url: { type: String, required: true },
    },
  ],
  modules: [
    {
      title: { type: String, required: true },
      lessons: { type: Number, required: true },
    },
  ],
  materials: { type: [String], default: [] },
  quizzes: { type: Number, default: 0 },
  practiceTests: { type: String, default: "" },
  projects: { type: [String], default: [] },
  videoUrl: { type: String, required: true },
  thumbnail: { type: String, required: true },
  trailer: { type: String, default: "" },
  progress: { type: Number, default: 0 },
  completedLessons: { type: Number, default: 0 },
  timeSpent: { type: String, default: "0h" },
  price: { type: Number, required: true },
  discount: { type: Number, default: 0 },
  paymentOptions: { type: [String], default: ["Credit Card", "PayPal", "UPI"] },
  enrollmentStatus: { type: String, enum: ["Open", "Closed", "Ongoing"], default: "Open" },
  refundPolicy: { type: String, default: "No refund after enrollment" },
  discussionForum: { type: String, default: "" },
  comments: [
    {
      user: { type: String, required: true },
      comment: { type: String, required: true },
    },
  ],
  liveSessions: [
    {
      date: { type: Date, required: true },
      topic: { type: String, required: true },
    },
  ],
  badges: { type: [String], default: [] },
  certificates: { type: [String], default: [] },
  leaderboard: [
    {
      user: { type: String, required: true },
      rank: { type: Number, required: true },
    },
  ],
  platform: { type: String, required: true },
  requirements: { type: [String], default: [] },
  compatibility: { type: [String], default: ["Windows", "Mac", "Linux"] },
  faq: [
    {
      question: { type: String, required: true },
      answer: { type: String, required: true },
    },
  ],
}, { timestamps: true });

const Course = mongoose.model("Course", courseSchema);
module.exports = Course;
