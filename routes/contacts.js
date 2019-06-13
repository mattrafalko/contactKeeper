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
  // Find the contacts that belong to this user, LIFO
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
router.put('/:id', authMiddleware, async (req, res) => {
  const { name, email, phone, type } = req.body;

  // Build contact object
  const contactData = {};
  if (name) {
    contactData.name = name;
  }
  if (email) {
    contactData.name = email;
  }
  if (phone) {
    contactData.name = phone;
  }
  if (type) {
    contactData.name = type;
  }

  // Does a contact with this idea exist?
  try {
    let contact = await Contact.findById(req.params.id);
    if (!contact) {
      return res.status(404).json({ message: 'Contact not found' });
    }

    // Does the contact belong to this user?
    if (contact.user.toString() !== req.user.id) {
      return res.status(401).json({ message: 'Not authorized' });
    }

    contact = await Contact.findByIdAndUpdate(
      req.params.id, //id of the contact
      { $set: contactData },
      { new: true }
    );

    res.json({ contact });
  } catch (error) {
    console.error(error.message);
    res.status(500).send('Server Error');
  }
});

//@route DELETE api/contacts/:id
//@desc: deletes a contact
//@access: private
router.delete('/:id', authMiddleware, async (req, res) => {
  // Does the contact exist?
  try {
    let contact = await Contact.findById(req.params.id);
    if (!contact) {
      return res.status(404).json({ message: 'Contact not found' });
    }
    // Does the contact belong to this user?
    if (contact.user.toString() !== req.user.id) {
      return res.status(401).json({ message: 'Not authorized' });
    }

    await Contact.findByIdAndRemove(req.params.id);

    res.json({ message: 'Contact removed.' });
  } catch (error) {
    console.error(error.message);
    res.status(500).send('Server Error');
  }
});

module.exports = router;
