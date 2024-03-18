const { Category } = require("../model/category");
const { Course } = require("../model/course");
const express = require("express");
const router = express.Router();

// category list
router.get(`/`, async (req, res) => {
  const courseList = await Course.find();

  if (!courseList) {
    res.status(500).json({ success: false });
  }
  res.send(courseList);
});

//single item
router.get("/:id", async (req, res) => {
  const course = await Course.findById(req.params.id);

  if (!course) {
    res
      .status(500)
      .json({ message: "The category with the given ID was not found" });
  }
  res.status(200).send(course);
});

//update data
router.put("/:id", async (req, res) => {
  if (!mongoose.isValidObjectId(req.params.id)) {
    //check if obejct id is valid
    return res.status(400).send("Invalid Offer Id");
  }

  const category = await Category.findOne({ name: req.body.category });
  if (!category) return res.status(400).send("Invalid Category");

  const course = await Course.findByIdAndUpdate(
    req.params.id,
    {
      name: req.body.name,
      code: req.body.code,
      credit: req.body.credit,
      instructor: req.body.instructor,
      times: req.body.times,
      days: req.body.days,
      section: req.body.section,
      offering: req.body.offering,
      category: category._id,
    },
    {
      new: true,
    },
  );

  if (!course) {
    res
      .status(500)
      .json({ message: "The category with the given ID was not found" });
  }
  res.status(200).send(course);
});

router.post(`/`, async (req, res) => {
  const category = await Category.findOne({ name: req.body.category });
  if (!category) return res.status(400).send("Invalid Category");

  let course = new Course({
    name: req.body.name,
    code: req.body.code,
    credit: req.body.credit,
    instructor: req.body.instructor,
    times: req.body.times,
    days: req.body.days,
    section: req.body.section,
    offering: req.body.offering,
    category: category._id,
  });

  course = await course.save();

  if (!course) return res.status(404).send("the course cannot be created!");

  res.send(course);
});

router.delete("/:id", (req, res) => {
  Course.findByIdAndDelete(req.params.id)
    .then((course) => {
      if (course) {
        return res
          .status(200)
          .json({ success: true, message: "the course is deleted!" });
      } else {
        return res
          .status(404)
          .json({ success: false, message: "course not found!" });
      }
    })
    .catch((err) => {
      return res.status(400).json({ success: false, error: err });
    });
});

module.exports = router;
