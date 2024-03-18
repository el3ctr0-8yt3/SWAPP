const { Offer } = require("../model/offers");
const { Course } = require("../model/course");
const { User } = require("../model/user");

const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");

router.get(`/`, async (req, res) => {
  const offerList = await Offer.find();

  if (!offerList) {
    res.status(500).json({ success: false });
  }
  res.send(offerList);
});

router.get(`/:id`, async (req, res) => {
  const offer = await Offer.findById(req.params.id);

  if (!offer) {
    res
      .status(500)
      .json({ message: "The offer with the given ID was not found." });
  }
  res.status(200).send(offer);
});

router.post(`/`, async (req, res) => {
  const user = await User.findOne({ email: req.body.email });
  if (!user) return res.status(400).send("Invalid User");
  const courseoffer = await Course.findOne({ code: req.body.Courseoffercode });
  if (!courseoffer) return res.status(400).send("Invalid offer Course");
  const coursedemand = await Course.findOne({
    code: req.body.Coursedemandcode,
  });
  if (!coursedemand) return res.status(400).send("Invalid demand Course");

  let offer = new Offer({
    CourseOfferer: user._id,
    CourseOffer: courseoffer._id,
    CourseDemand: coursedemand._id,
    OfferDate: req.body.OfferDate,
    Offerexpiry: req.body.Offerexpiry,
  });

  offer = await offer.save();

  if (!offer) return res.status(500).send("the offer cannot be created!");

  res.send(offer);
});

router.put("/:id", async (req, res) => {
  if (!mongoose.isValidObjectId(req.params.id)) {
    //check if obejct id is valid
    return res.status(400).send("Invalid Offer Id");
  }
  //check if keys to category and user are valid.
  const user = await User.findOne({ email: req.body.email });
  if (!user) return res.status(400).send("Invalid User");
  const courseoffer = await Course.findOne({ code: req.body.Courseoffercode });
  if (!courseoffer) return res.status(400).send("Invalid offer Course");
  const coursedemand = await Course.findOne({
    code: req.body.Coursedemandcode,
  });
  if (!coursedemand) return res.status(400).send("Invalid demand Course");

  const offer = await Offer.findByIdAndUpdate(
    req.params.id,
    {
      CourseOfferer: user._id,
      CourseOffer: courseoffer._id,
      CourseDemand: coursedemand._id,
      OfferDate: req.body.OfferDate,
      Offerexpiry: req.body.Offerexpiry,
    },
    { new: true },
  );

  if (!offer) return res.status(400).send("the offer cannot be updated!");

  res.send(offer);
});

router.delete("/:id", (req, res) => {
  Offer.findByIdAndDelete(req.params.id)
    .then((offer) => {
      if (offer) {
        return res
          .status(200)
          .json({ success: true, message: "the offer is deleted!" });
      } else {
        return res
          .status(404)
          .json({ success: false, message: "offer not found!" });
      }
    })
    .catch((err) => {
      return res.status(500).json({ success: false, error: err });
    });
});

router.get(`/get/count`, async (req, res) => {
  const offerCount = await Offer.countDocuments((count) => count);

  if (!offerCount) {
    res.status(500).json({ success: false });
  }
  res.send({
    offerCount: offerCount,
  });
});

module.exports = router;
