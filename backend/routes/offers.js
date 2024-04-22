const { Offer } = require("../model/offers");
const { Course } = require("../model/course");
const { User } = require("../model/user");
const { Match } = require("../model/match");

const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const { format } = require("prettier");
const checkAuth = require("../middleware/jwt").checkAuth;

// return list of offer where course offerer is not the user
router.get(`/`, checkAuth, async (req, res) => {
  const offerList = await Offer.find({
    CourseOfferer: { $ne: req.UserData.userId },
  })
    .populate("CourseOfferer", "name email")
    .populate("CourseOffer")
    .populate("CourseDemand");

  if (!offerList) {
    res.status(500).json({ success: false });
  }

  const formattedoffers = offerList.map((offer) => {
    return {
      CourseOfferer: offer.CourseOfferer.name,
      Offereremail: offer.CourseOfferer.email,
      CourseOfferName: offer.CourseOffer.name,
      CourseOfferCode: offer.CourseOffer.code,
      CourseOfferSection: offer.CourseOffer.section,
      CourseOfferTimes: offer.CourseOffer.times,
      CourseOfferDays: offer.CourseOffer.days,
      CourseDemandName: offer.CourseDemand.name,
      CourseDemandCode: offer.CourseDemand.code,
      CourseDemandSection: offer.CourseDemand.section,
      CourseDemandTimes: offer.CourseDemand.times,
      CourseDemandDays: offer.CourseDemand.days,
      OfferDate: offer.OfferDate,
    };
  });
  res.send(formattedoffers);
});

router.get(`/myoffers`, checkAuth, async (req, res) => {
  // console.log(req.UserData);
  const offerList = await Offer.find({
    CourseOfferer: req.UserData.userId,
  })
    .populate("CourseOffer")
    .populate("CourseDemand");

  if (!offerList) {
    res.status(500).json({ success: false });
  }
  const formattedoffers = offerList.map((offer) => {
    return {
      OfferId: offer._id,
      CourseOfferName: offer.CourseOffer.name,
      CourseOfferCode: offer.CourseOffer.code,
      CourseOfferSection: offer.CourseOffer.section,
      CourseOfferTimes: offer.CourseOffer.times,
      CourseOfferDays: offer.CourseOffer.days,
      CourseDemandName: offer.CourseDemand.name,
      CourseDemandCode: offer.CourseDemand.code,
      CourseDemandSection: offer.CourseDemand.section,
      CourseDemandTimes: offer.CourseDemand.times,
      CourseDemandDays: offer.CourseDemand.days,
      OfferDate: offer.OfferDate,
    };
  });
  res.send(formattedoffers);
});

router.get(`/:id`, async (req, res) => {
  const offer = await Offer.findById(req.params.id)
    .populate("CourseOfferer")
    .populate("CourseOffer")
    .populate("CourseDemand");

  if (!offer) {
    res
      .status(500)
      .json({ message: "The offer with the given ID was not found." });
  }
  res.status(200).send(offer);
});

router.post(`/`, checkAuth, async (req, res) => {
  const user = await User.findOne({ email: req.body.email });
  if (!user) return res.status(400).send("Invalid User");
  const courseoffer = await Course.findOne({ code: req.body.Courseoffercode });
  if (!courseoffer) return res.status(400).send("Invalid offer Course");
  const coursedemand = await Course.findOne({
    code: req.body.Coursedemandcode,
  });
  if (!coursedemand) return res.status(400).send("Invalid demand Course");
  if (req.body.Courseoffercode === req.body.Coursedemandcode) {
    return res.status(400).send("Offer and Demand cannot be the same");
  }

  // const existingUserOffers = await Offer.findOne({
  //   CourseOfferer: user._id,
  //   $or: [{ CourseOffer: coursedemand._id }, { CourseDemand: courseoffer._id }],
  // });

  // if (existingUserOffers) {
  //   return res
  //     .status(400)
  //     .send(
  //       "You cant offer the course you want. Neither can you ask for the course you have! Have fucking common sense",
  //     );
  // }

  // const duplicateoffer = await Offer.findOne({
  //   CourseOfferer: user._id,
  //   CourseOffer: courseoffer._id,
  //   CourseDemand: courseoffer._id,
  // });

  // if (duplicateoffer) {
  //   return res.status(400).send("Why are you so fucking desperate");
  // }

  let offer = new Offer({
    CourseOfferer: user._id,
    CourseOffer: courseoffer._id,
    CourseDemand: coursedemand._id,
    OfferDate: req.body.OfferDate,
  });

  offer = await offer.save();

  if (!offer) return res.status(500).send("the offer cannot be created!");

  // let newoffer = findOne({ CourseDemand: courseoffer._id  })
  let newoffer = await Offer.findOne({
    CourseDemand: offer.CourseOffer,
    CourseOffer: offer.CourseDemand,
  });

  if (!newoffer) {
    console.log("No match found");
  }

  if (newoffer) {
    console.log("Match found");
    let match = new Match({
      OfferId1: newoffer._id,
      OfferId2: offer._id,
      Offer1want: newoffer.CourseDemand._id,
      Offer2want: offer.CourseDemand._id,
    });

    match = await match.save();

    if (!match) return res.status(500).send("the match cannot be saved");
  }

  res.send({
    CourseOfferer: user.name,
    CourseOffer: courseoffer.name,
    CourseDemand: coursedemand.name,
    OfferDate: offer.OfferDate,
  });
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

  const oldoff = await Offer.findById(req.params.id);
  if (oldoff.CourseOfferer !== req.body.email) {
    return res.status(401).send("Unauthorized");
  }

  const offer = await Offer.findByIdAndUpdate(
    req.params.id,
    {
      CourseOfferer: user._id,
      CourseOffer: courseoffer._id,
      CourseDemand: coursedemand._id,
      OfferDate: req.body.OfferDate,
    },
    { new: true },
  );

  if (!offer) return res.status(400).send("the offer cannot be updated!");

  res.send(offer);
});

router.delete("/:id", checkAuth, async (req, res) => {
  const offer = await Offer.findById(req.params.id);

  if (!offer) {
    return res
      .status(404)
      .json({ success: false, message: "offer not found! Sabar rakhlay" });
  }

  // console.log(String(offer.CourseOfferer));
  if (String(offer.CourseOfferer) !== req.UserData.userId) {
    return res.status(401).send("Unauthorized");
  }

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

// User specific routes
// See my offers
// router.get(`/hello/`, checkAuth, async (req, res) => {
//   const offerList = await Offer.find();
//   if (!offerList) {
//     res.status(500).json({ success: false });
//   }
//   res.send(offerList);
// });

module.exports = router;
