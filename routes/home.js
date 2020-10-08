const express = require("express");
const router = express.Router();

router.get("/", (req, res) => {
  // res.send("Hello Amit!!!!");
  res.render("index", { title: "My Exprees App", message: "Hello Amit!!" });
});

module.exports = router;
