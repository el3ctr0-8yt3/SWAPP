const express = require("express");
const app = express();
const bodyparser = require("body-parser");
const morgan = require("morgan");
const mongoose = require("mongoose");
const authJwt = require("./middleware/jwt");
const errorhandler = require("./middleware/error_handler");
const cors = require("cors");

require("dotenv/config");

const api = process.env.API_URL;
const PORT = process.env.PORT || 3000;

app.use(cors());
app.options("*", cors());
//middleware
app.use(bodyparser.json());
app.use(morgan("tiny"));
app.use(authJwt());
app.use(errorhandler);

//Routes
const offerRouter = require("./routes/offers");
app.use(`${api}/offers`, offerRouter);
const categoryRouter = require("./routes/category");
app.use(`${api}/category`, categoryRouter);
const userRouter = require("./routes/user");
app.use(`${api}/user`, userRouter);
const courseRouter = require("./routes/course");
app.use(`${api}/course`, courseRouter);

const Offer = require("./model/offers");
const Category = require("./model/category");
const User = require("./model/user");
const Course = require("./model/course");

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
