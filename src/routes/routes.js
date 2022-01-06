const express = require("express");
const router = express.Router();

const {
  register,
  login,
  logout,
  reset_pass,
  update_pass,
} = require("../controller/requests");

router.post("/login", login);
router.post("/register", register);
router.post("/reset_pass", reset_pass);
router.post("/update_pass/:rs", update_pass);
router.post("/logout", logout);

module.exports = router;
