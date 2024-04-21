const { Offer } = require("../model/offers");
const { Match } = require("../model/match");
const express = require("express");
const router = express.Router();

const mongoose = require("mongoose");
const { format } = require("prettier");
const checkAuth = require("../middleware/jwt").checkAuth;

router.get(`/`, checkAuth, async (req, res) => {
  const userId = req.UserData.userId; // Assuming userId is available in req.UserData

  let offer = await Offer.findOne({ CourseOfferer: userId });
  const matchList = await Match.find({
    $or: [{ OfferId1: offer._id }, { OfferId2: offer._id }],
  })
    .populate({
      path: "OfferId1",
      populate: [
        { path: "CourseOfferer" },
        { path: "CourseDemand" },
        { path: "CourseOffer" },
      ],
    })
    .populate({ path: "OfferId2", populate: { path: "CourseOfferer" } });

  // let matchList = await Match.find();

  if (!matchList) {
    res.status(500).json({ success: false });
  }
  // res.send({
  //   want: offer.CourseDemand,
  //   have: offer.CourseOffer,

  // })

  let formattedMatchList = matchList.map((match) => {
    return {
      // OfferId1: match.OfferId1._id,
      // OfferId2: match.OfferId2._id,
      Offer1Name: match.OfferId1.CourseOfferer.name,
      Offer2Name: match.OfferId2.CourseOfferer.name,
      Offer1Email: match.OfferId1.CourseOfferer.email,
      Offer2Email: match.OfferId2.CourseOfferer.email,
      Offer1Phone: match.OfferId1.CourseOfferer.phone,
      Offer2Phone: match.OfferId2.CourseOfferer.phone,
      Offer1CourseOffer: match.OfferId1.CourseOffer.name,
      Offer2CourseOffer: match.OfferId2.CourseOffer.name,
      Offer1CourseDemand: match.OfferId1.CourseDemand.name,
      Offer2CourseDemand: match.OfferId2.CourseDemand.name,
    };
  });

  res.send(formattedMatchList);
});

router.post(`/`, checkAuth, async (req, res) => {
  const match = new Match({
    OfferId1: req.body.OfferId1,
    OfferId2: req.body.OfferId2,
    Offer1want: req.body.Offer1want,
    Offer2want: req.body.Offer2want,
  });

  match = await match.save();

  if (!match) return res.status(500).send("the match cannot be saved");

  res.send(match);
});

router.delete("/", checkAuth, async (req, res) => {
  const match = await Match.findOne({
    $or: [{ OfferId1: req.body.OfferId1 }, { OfferId2: req.body.OfferId2 }],
  });

  if (!match) {
    return res
      .status(404)
      .json({ success: false, message: "match not found! Sabar rakhlay" });
  }

  // console.log(String(offer.CourseOfferer));

  Match.findByIdAndDelete(match._id)
    .then((match) => {
      if (match) {
        return res
          .status(200)
          .json({ success: true, message: "the match is deleted!" });
      } else {
        return res
          .status(404)
          .json({ success: false, message: "match not found!" });
      }
    })
    .catch((err) => {
      return res.status(500).json({ success: false, error: err });
    });
});

module.exports = router;
