const contacts = require("../../models/contacts");
const {createContactSchema} = require("../../utils/validation/contactsValidationSchemas");
const { nanoid } = require("nanoid");

const createContact = async (req, res, next) => {
  const { name, email, phone } = req.body;
  const { error } = createContactSchema.validate(req.body);
  if (error) {
    return res.status(400).json({ message: error.details[0].message });
  } else {
    const newContact = {
      id: nanoid(),
      name,
      email,
      phone,
    };
    const contact = await contacts.addContact(newContact);
    if (contact) {
      res.status(201).json(contact);
    }
  }
};

module.exports = { createContact };