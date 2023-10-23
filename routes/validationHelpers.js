const { body, validationResult } = require("express-validator");

const User = require('../models/UserModel');
const bcrpyt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const config = require('config');

// Validation rules for the user profile - not sure whether to use 'body' or 'check' method to validate
exports.userProfileValidation = [
  //body("name").notEmpty().trim(),
  body("email", "Please include a valid email").isEmail().normalizeEmail(),
  body("password", "Please enter a password with 6 or more characters").isLength({ min: 6 }),
  // Add more validation rules for other fields
];

// Validation result handler middleware
exports.handleValidationResult = async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  try {
    const { name, email, password, city, gender, gender_preference, age, age_preference, hobbies } = req.body;
    let user = await User.findOne({ email });
    if (user) {
      return res.status(400).json( { errors: [{ msg: 'User already exists' }] });
    }
    
    user = new User({
      email,
      password,
      name,
      city,
      gender,
      gender_preference,
      age,
      age_preference,
      hobbies
    });
  
    const salt = await bcrpyt.genSalt(10);
    user.password = await bcrpyt.hash(password, salt);
    await user.save();

    const payload = {
      user: {
        id: user.id,
      }
    }

    jwt.sign(
      payload, 
      config.get('jwtSecret'),
      // { expiresIn: 360000 },
      (err, token) => {
        if (err) {
          throw err;
        }
        res.json({ token });
      }
      );

  } catch (error) {
    console.error(error.message);
    res.status(500).send('Server error');
  }
  next(); // Continue to the next middleware or route handler
};

exports.userLogInValidation = [
  //body("name").notEmpty().trim(),
  body("email", "Please include a valid email").isEmail().normalizeEmail(),
  body("password", "Please enter a password").exists(),
  // Add more validation rules for other fields
];

// Validation result handler middleware
exports.handleLogInValidationResult = async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  try {
    const { email, password } = req.body;
    let user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json( { errors: [{ msg: 'Invalid credentials' }] });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ errors: [{ msg: 'Invalid Credentials'}] });
    }
    
    const payload = {
      user: {
        id: user.id,
      }
    }

    jwt.sign(
      payload, 
      config.get('jwtSecret'),
      // { expiresIn: 3600000000 },
      (err, token) => {
        if (err) {
          throw err;
        }
        res.json({ token });
      }
      );

  } catch (error) {
    console.error(error.message);
    res.status(500).send('Server error');
  }
  // next(); // Continue to the next middleware or route handler
};