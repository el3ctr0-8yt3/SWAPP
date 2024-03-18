const { User } = require("../model/user");
const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

// user list
router.get(`/`, async (req, res) => {
  const userList = await User.find().select("-passwordHash");

  if (!userList) {
    res.status(500).json({ success: false });
  }
  res.send(userList);
});

//single item
router.get("/:id", async (req, res) => {
  const user = await User.findById(req.params.id).select("-passwordHash");

  if (!user) {
    res
      .status(500)
      .json({ message: "The category with the given ID was not found" });
  }
  res.status(200).send(user);
});

router.post("/login", async (req, res) => {
  const user = await User.findOne({ email: req.body.email });

  if (!user) {
    return res.status(400).send("The user not found");
  }

  if (user && bcrypt.compareSync(req.body.password, user.passwordHash)) {
    const token = jwt.sign(
      {
        userId: user.id,
        isAdmin: user.isAdmin,
      },
      process.env.secret,
      { expiresIn: "1w" }, // expires in a week
    );

    res.status(200).send({ user: user.email, token: token }); // User authenticated
  } else {
    res.status(400).send("Invalid Password");
  }
});

//update data
// router.put("/:id", async (req, res) => {
//   const category = await Category.findByIdAndUpdate(
//     req.params.id,
//     {
//       name: req.body.name,
//     },
//     {
//       new: true,
//     },
//   );

//   if (!category) {
//     res
//       .status(500)
//       .json({ message: "The category with the given ID was not found" });
//   }
//   res.status(200).send(category);
// });

router.post(`/`, async (req, res) => {
  let user = new User({
    name: req.body.name,
    email: req.body.email,
    universityemail: req.body.universityemail,
    passwordHash: bcrypt.hashSync(
      req.body.password,
      "$2$16$secretsaltthisisnowpleasegenerate",
    ),
    isAdmin: req.body.isAdmin,
    batch: req.body.batch,
    Major: req.body.Major,
    DP: req.body.DP,
    phone: req.body.phone,
  });

  user = await user.save();

  if (!user) return res.status(404).send("the category cannot be created!");

  res.send(user);
});

// router.delete("/:id", (req, res) => {
//   Category.findByIdAndDelete(req.params.id)
//     .then((category) => {
//       if (category) {
//         return res
//           .status(200)
//           .json({ success: true, message: "the category is deleted!" });
//       } else {
//         return res
//           .status(404)
//           .json({ success: false, message: "category not found!" });
//       }
//     })
//     .catch((err) => {
//       return res.status(400).json({ success: false, error: err });
//     });
// });

module.exports = router;
