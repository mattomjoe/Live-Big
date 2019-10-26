const express = require("express");
const router = express.Router();

router.get("/", (req, res) => {
  const { userContext } = req;

  console.log("----------Hey is this you my dude?: ", req.userContext.userinfo);

  res.render("index", { userContext });
});

module.exports = router;
