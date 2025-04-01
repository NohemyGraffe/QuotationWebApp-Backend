// models/User.js
const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  passwordHash: { type: String, required: true },
  role: { type: String, enum: ['staff', 'admin'], required: true } // restrict to two roles
});

module.exports = mongoose.model('User', UserSchema);
