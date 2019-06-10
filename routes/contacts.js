const express = require('express');

const router = express.Router();

//@route GET api/contacts
//@desc: get all users contacts
//@access: private
router.get('/', (req, res) => res.send('gets all users contacts'));

//@route POST api/contacts
//@desc: add a new contact
//@access: private
router.post('/', (req, res) => res.send('add contact'));

//@route PUT api/contacts/:id
//@desc: updates a contact
//@access: private
router.put('/:id', (req, res) => res.send('update contact'));

//@route PUT api/contacts/:id
//@desc: deletes a contact
//@access: private
router.delete('/:id', (req, res) => res.send('delete contact'));

module.exports = router;
