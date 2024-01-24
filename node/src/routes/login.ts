export {}; // needed for typescript to not complain about duplicate imports
const express = require("express");
const router = express.Router();

router.get("/", (req, res) => {
  res.sendStatus(200);
  console.log('success - user creds = ', req.oidc.user);
});

module.exports = router;
