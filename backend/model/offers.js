const mongoose = require("mongoose");

const offerSchema = new mongoose.Schema({
  CourseOfferer: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  CourseOffer: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Course",
    required: true,
  },
  CourseDemand: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Course",
    required: true,
  },
  // Expiry:{
  //   type: Number,
  //   required: true,
  // },
  OfferDate: {
    type: Date,
    default: Date.now,
    expires: "7d", // 7 days
  },
  // Offerexpiry: {
  //   type: Date,
  //   default: Date.now,
  // },
});

// offerSchema.index({ OfferDate: 1 }, { expireAfterSeconds: 604800 });

exports.Offer = mongoose.model("Offer", offerSchema);
exports.offerSchema = offerSchema;
