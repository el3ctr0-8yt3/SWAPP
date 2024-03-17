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

//Routes
const offerRouter = require("./routes/offers");
app.use(`${api}/offers`, offerRouter);
const categoryRouter = require("./routes/category");
app.use(`${api}/category`, categoryRouter);

const Offer = require("./model/offers");
const Category = require("./model/category");

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
