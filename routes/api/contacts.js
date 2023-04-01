const express = require('express');
const contacts = require('../../models/contacts');
const { nanoid } = require('nanoid');
const schema = require('../../utils/validation/contactsValidationSchemas');

const router = express.Router();

router.get('/', async (req, res, next) => {
  const result = await contacts.getContacts();
  res.json(result);
});

router.get('/:contactId', async (req, res, next) => {
  try {
    const contact = await contacts.getContactById(req.params.contactId);
    res.json(contact);
  } catch (err) {
    console.log(err.message);
    res.status(404).json({ message: err.message });
  }
});

router.post('/', async (req, res, next) => {
  const { name, email, phone } = req.body;
  const { error } = schema.validate(req.body);
  if (error) {
    return res.status(400).json({ message: error.details[0].message });
  } else {
    const newContact = {
      id: nanoid(),
      name,
      email,
      phone,
    };
    console.log(newContact);

    const contact = await contacts.addContact(newContact);
    if (contact) {
      res.status(201).json(contact);
    }
  }
});

router.delete('/:contactId', async (req, res, next) => {
  try {
    const contact = await contacts.removeContact(req.params.contactId);
    if (contact) {
      res.json({ message: 'contact deleted' });
    }
  } catch (err) {
    res.status(404).json({ message: err.message });
  }
});

router.put('/:contactId', async (req, res, next) => {
  const { name, email, phone } = req.body;
  const { error } = schema.validate(req.body);
  if (error) {
    return res.status(400).json({ message: error.details[0].message });
  } else {
    try {
      const contact = await contacts.updateContact(req.params.contactId, { name, email, phone });
      if (contact) {
        res.json({ message: contact });
      }
    } catch (err) {
      res.status(404).json({ message: err.message });
    }
  }
});

module.exports = router;
