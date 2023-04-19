const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const validator = require('validator');

const Schema = mongoose.Schema;

const userSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  confirmPassword: {
    type: String,
    required: true,
  },
});

// static signup method
userSchema.statics.signup = async function (
  name,
  email,
  password,
  confirmPassword
) {
  // validation
  if (!email || !password || !confirmPassword || !name) {
    throw Error('All fields must be filled');
  }
  if (!validator.isEmail(email)) {
    throw Error('Email not valid');
  }

  if (password !== confirmPassword) {
    throw Error('Passwords not match');
  }

  if (!validator.isStrongPassword(password)) {
    throw Error('Password not strong enough');
  }

  if (!validator.isStrongPassword(confirmPassword)) {
    throw Error('Password not strong enough');
  }

  const exists = await this.findOne({ email });

  if (exists) {
    throw Error('Email already in use');
  }

  const salt = await bcrypt.genSalt(10);
  const hashPassword = await bcrypt.hash(password, salt);
  const hashConfirmPassword = await bcrypt.hash(confirmPassword, salt);

  const user = await this.create({
    name,
    email,
    password: hash,
    confirmPassword: hashConfirmPassword,
  });

  return user;
};

// static login method
userSchema.statics.login = async function (email, password) {
  if (!email || !password) {
    throw Error('All fields must be filled');
  }

  const user = await this.findOne({ email });
  if (!user) {
    throw Error('Incorrect email');
  }

  const match = await bcrypt.compare(password, user.password);
  if (!match) {
    throw Error('Incorrect password');
  }

  return user;
};

module.exports = mongoose.model('User', userSchema);
