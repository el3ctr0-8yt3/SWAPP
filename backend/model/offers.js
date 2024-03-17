const mongoose = require("mongoose");

const offerSchema = new mongoose.Schema({
  CourseName: {
    type: String,
    required: true,
  },
  Coursecode: {
    type: String,
    required: true,
  },
  CourseCredit: {
    type: Number,
    required: true,
  },
  CourseDescription: {
    type: String,
    default: " ",
  },
  CourseTeacher: {
    type: String,
    required: true,
  },
  CourseTimes: {
    type: String,
    required: true,
  },
  CourseDays: [
    {
      type: String,
      required: true,
    },
  ],
  CourseSection: {
    type: String,
    required: true,
  },
  CourseLocation: {
    type: String,
    default: " ",
  },
  CourseOfferer: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  CourseCategory: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Category",
    required: true,
  },
  OfferDate: {
    type: Date,
    default: Date.now,
  },
});

exports.Offer = mongoose.model("Offer", offerSchema);
