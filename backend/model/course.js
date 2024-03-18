const mongoose = require("mongoose");

const courseSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  code: {
    type: String,
    required: true,
  },
  credit: {
    type: Number,
    required: true,
  },
  instructor: {
    type: String,
    required: true,
  },
  times: {
    type: String,
    required: true,
  },
  days: [
    {
      type: String,
      required: true,
    },
  ],
  section: {
    type: String,
    required: true,
  },
  offering: {
    type: "String",
    default: " ",
  },
  category: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Category",
    required: true,
  },
});

exports.Course = mongoose.model("Course", courseSchema);
exports.courseSchema = courseSchema;
