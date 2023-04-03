const contacts = require("../../models/contacts");
const {updateContactSchema} = require("../../utils/validation/contactsValidationSchemas");

const updateContact = async (req, res, next) => {
  const { error } = updateContactSchema.validate(req.body);
  if (error) {
    return res.status(400).json({ message: error.details[0].message });
  } else {
    try {
      const contact = await contacts.updateContact(
        req.params.contactId,
        req.body
      );
      if (contact) {
        res.json(contact);
      }
    } catch (err) {
      res.status(404).json({ message: err.message });
    }
  }
};

module.exports = { updateContact };