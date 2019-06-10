const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const config = require('config');

const express = require('express');
const router = express.Router();

const User = require('../models/User');
const { check, validationResult } = require('express-validator/check');

//@route POST api/users
//@desc: register a user
//@access: public
router.post(
  '/',
  [
    check('name', 'name is required')
      .not()
      .isEmpty(),
    check('email', 'must be email').isEmail(),
    check('password', 'Password must be 6 or more characters').isLength({
      min: 6
    })
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        errors: errors.array()
      });
    }

    const { name, email, password } = req.body;

    try {
      //FindOne: checks DB to see if this value already exists.
      let user = await User.findOne({ email });
      if (user) {
        res.status(400).json({ msg: 'user already exists' });
      }

      user = new User({
        name,
        email,
        password
      });

      const salt = await bcrypt.genSalt(10);

      user.password = await bcrypt.hash(password, salt);

      await user.save();
      //Send Json webtoken
      const payload = {
        user: { id: user.id }
      };

      jwt.sign(
        payload,
        config.get('jwtSecret'),
        {
          expiresIn: 360000
        },
        (error, token) => {
          if (error) {
            throw error;
          }
          res.json({ token });
        }
      );

      //res.send(payload);
    } catch (error) {
      console.error(error.message);
      res.status(500).send('server error');
    }
  }
);

module.exports = router;
