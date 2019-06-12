const express = require('express');
const Contact = require('../models/Contact');
const User = require('../models/User');
const { check, validationResult } = require('express-validator/check');
const authMiddleware = require('../middleware/auth');

const router = express.Router();

//@route GET api/contacts
//@desc: get all users contacts
//@access: private
router.get('/', authMiddleware, async (req, res) => {
  try {
    const contacts = await Contact.find({ user: req.user.id }).sort({
      date: -1
    });
    res.json({ contacts });
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ message: 'Server Error' });
  }
});

//@route POST api/contacts
//@desc: add a new contact
//@access: private
router.post(
  '/',
  [
    authMiddleware,
    [
      check('name', 'Name is required')
        .not()
        .isEmpty()
    ]
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        errors: errors.array()
      });
    }

    const { name, email, phone, type } = req.body;

    try {
      const newContact = new Contact({
        name,
        email,
        phone,
        type,
        user: req.user.id
      });

      const contact = await newContact.save();

      res.json(contact);
    } catch (error) {
      console.error(error.message);
      res.status(500).send('Server Error');
    }
  }
);

//@route PUT api/contacts/:id
//@desc: updates a contact
//@access: private
router.put('/:id', (req, res) => res.send('update contact'));

//@route PUT api/contacts/:id
//@desc: deletes a contact
//@access: private
router.delete('/:id', (req, res) => res.send('delete contact'));

module.exports = router;
