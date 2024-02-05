const User = require('../models/User');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
require('dotenv').config()

const registerUser = async (req, res) => {
  try {
    console.log(req.body);
    const { username, email, password } = req.body;

    const hashedPassword = await bcrypt.hash(password, 10);
    const existingUser = await User.findOne({ $or: [{ username }, { email }] });
    if (existingUser) {
      res.status(409).json({ message: "user already exist" });
      return;
    }

    // Create a new user
    const newUser = new User({ username: username, email: email, password: hashedPassword });
    await newUser.save();

    res.status(200).json(newUser);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: 'Internal server error.' });
  }
};

// Controller to handle user login
const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Check if the user exists
    const user = await User.findOne({ email: email });
    if (!user) {
      return res.status(404).json({ message: 'User not found.' });
    }

    // Check password
    match = await bcrypt.compare(password, user.password);
    if (!match) {
      return res.status(401).json({ message: 'Incorrect password.' });
    }


    const token = jwt.sign({ email: user.email, id: user._id }, process.env.SECRET_KEY, { expiresIn: "1h" })

    res.status(200).json({ message: 'User logged in successfully.', user, token });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: 'Internal server error.' });
  }
};

const getuser = async (req, res) => {
  try {
    const user = await User.findOne({ username: req.params.username });
    res.status(200).json(user);
  } catch (error) {

    res.status(500).json({ message: 'Internal server error.' });
  }
}

const getalluser = async (req, res) => {
  try {
    const user = await User.find();
    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ message: 'Internal server error.' });
  }
}

const getuserbyemail = async (req, res) => {
  console.log("email",req.params.email);
  try {
    const user = await User.findOne({ email: req.params.email });
    if (!user) {
      return res.status(404).json({ message: "user not found" });
    }
    res.status(200).json(user);
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Internal server error" });
  }
}

module.exports = { registerUser, loginUser, getuser, getalluser, getuserbyemail };