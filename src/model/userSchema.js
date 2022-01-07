// const mongoose = require("mongoose");
// const { isEmail } = require("validator");

// const Schema = mongoose.Schema;

// const userSchema = new Schema({
//   firstName: {
//     type: String,
//     lowercase: true,
//     trim: true,
//     required: [true, "Please enter first name"],
//   },
//   lastName: {
//     type: String,
//     lowercase: true,
//     trim: true,
//     required: [true, "Please enter last name"],
//   },
//   dateOfBirth: {
//     type: Date,
//     trim: true,
//     required: [true, "Please enter a valid DOB"],
//   },
//   gender: {
//     type: String,
//     trim: true,
//     enum: ["she", "he", "they"],
//     required: [true, "Please select a gender"],
//   },
//   userName: {
//     type: String,
//     lowercase: true,
//     trim: true,
//     unique: [true, "Username already exists"],
//     required: [true, "Please enter first name"],
//   },

//   email: {
//     type: String,
//     trim: true,
//     lowercase: true,
//     unique: [true, "User email already exists"],
//     validate: [isEmail, "Please enter a valid email"],
//     required: [true, "Please enter your email"],
//   },
//   password: {
//     type: String,
//     trim: true,
//     minLength: [6, "Password should not be less than 6 characters"],
//     required: [true, "Please enter a password"],
//   },
//   dateCreated: {
//     type: Date,
//     default: Date.now(),
//     required: true,
//   },
//   accountStatus: {
//     type: Boolean,
//     default: false,
//   },
//   refreshToken: {
//     type: String,
//     trim: true,
//   },
//   randomString: { type: String },
// });

// const UserCollection = mongoose.model("users", userSchema);

// module.exports = UserCollection;
