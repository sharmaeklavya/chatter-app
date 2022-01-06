const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const UserCollection = require("../model/userSchema");

module.exports.register = async (req, res) => {
  try {
  } catch (err) {}
};

module.exports.login = async (req, res) => {
  try {
    const { username, roomname } = req.body;
    module.exports = { username, roomname };
  } catch (err) {
    console.log(err);
  }
};

module.exports.logout = async (req, res) => {
  try {
  } catch (err) {}
};

module.exports.reset_pass = async (req, res) => {
  try {
  } catch (err) {}
};

module.exports.update_pass = async (req, res) => {
  try {
  } catch (err) {}
};
