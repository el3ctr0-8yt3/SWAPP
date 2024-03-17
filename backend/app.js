const express = require("express");
const app = express();
const bodyparser = require("body-parser");
const morgan = require("morgan");
const mongoose = require("mongoose");

require("dotenv/config");

const api = process.env.API_URL;

const PORT = process.env.PORT || 3000;

//middleware
app.use(bodyparser.json());
app.use(morgan("tiny"));

const offerSchema = new mongoose.Schema({
  CourseName: String,
  Coursecode: String,
  CourseCredit: Number,
  CourseTeacher: String,
  CourseTimes: String,
  CourseDays: String,
  CourseSection: String,
  CourseLocation: String,
});

const Offer = mongoose.model("Offer", offerSchema);

app.get(`${api}/offers`, async (req, res) => {
  const offerList = await Offer.find();

  if (!offerList) {
    res.status(500).json({ success: false });
  }
  res.send(offerList);
});

app.post(`${api}/offers`, (req, res) => {
  const offer = new Offer({
    CourseName: req.body.CourseName,
    Coursecode: req.body.Coursecode,
    CourseCredit: req.body.CourseCredit,
    CourseTeacher: req.body.CourseTeacher,
    CourseTimes: req.body.CourseTimes,
    CourseDays: req.body.CourseDays,
    CourseSection: req.body.CourseSection,
    CourseLocation: req.body.CourseLocation,
  });

  offer
    .save()
    .then((createdOffer) => {
      res.status(201).json(createdOffer);
    })
    .catch((err) => {
      res.status(500).json({
        error: err,
        success: false,
      });
    });
});

mongoose
  .connect(process.env.CONNECTION_STRING, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    dbName: "swappdb",
  })
  .then(() => {
    console.log("Database Connection is ready...");
  })
  .catch((err) => {
    console.log(err);
  });

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
