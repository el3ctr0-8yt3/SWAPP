const { Offer } = require("../model/offers");
const { Category } = require("../model/category");

const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");

router.get(`/`, async (req, res) => {
  const offerList = await Offer.find().select("CourseName");

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
  const Category = await Category.findById(req.body.CourseCategory);
  if (!Category) return res.status(400).send("Invalid Category");
  const User = await User.findById(req.body.CourseOfferer);
  if (!User) return res.status(400).send("Invalid User");

  let offer = new Offer({
    CourseName: req.body.CourseName,
    Coursecode: req.body.Coursecode,
    CourseCredit: req.body.CourseCredit,
    CourseDescription: req.body.CourseDescription,
    CourseTeacher: req.body.CourseTeacher,
    CourseTimes: req.body.CourseTimes,
    CourseDays: req.body.CourseDays,
    CourseSection: req.body.CourseSection,
    CourseLocation: req.body.CourseLocation,
    CourseOfferer: req.body.CourseOfferer,
    CourseCategory: req.body.CourseCategory,
    OfferDate: req.body.OfferDate,
  });

  offer = await offer.save();

  if (!offer) return res.status(500).send("the offer cannot be created!");

  res.send(offer);
});

router.put("/:id", async (req, res) => {
    if (!mongoose.isValidObjectId(req.params.id)) { //check if obejct id is valid
        return res.status(400).send("Invalid Offer Id");
    }
  //check if keys to category and user are valid.
  const Category = await Category.findById(req.body.CourseCategory);
  if (!Category) return res.status(400).send("Invalid Category");
  const User = await User.findById(req.body.CourseOfferer);
  if (!User) return res.status(400).send("Invalid User");

  const offer = await Offer.findByIdAndUpdate(
    req.params.id,
    {
      CourseName: req.body.CourseName,
      Coursecode: req.body.Coursecode,
      CourseCredit: req.body.CourseCredit,
      CourseDescription: req.body.CourseDescription,
      CourseTeacher: req.body.CourseTeacher,
      CourseTimes: req.body.CourseTimes,
      CourseDays: req.body.CourseDays,
      CourseSection: req.body.CourseSection,
      CourseLocation: req.body.CourseLocation,
      CourseOfferer: req.body.CourseOfferer,
      CourseCategory: req.body.CourseCategory,
      OfferDate: req.body.OfferDate,
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
    }
);


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
