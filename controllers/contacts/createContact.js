const contacts = require("../../models/contacts");

const createContact = async (req, res, next) => {
  const { name, email, phone } = req.body;
    const newContact = {
      name,
      email,
      phone,
    };
  try {
    const contact = await contacts.createContact(newContact);
    if (contact) {
      res.status(201).json(contact);
    }
  } catch (err) {
    next(err);
    }
};

module.exports = { createContact };