// const { boolean } = require("joi");
const contacts = require("../../models/contacts");

const updateStatusContact = async (req, res) => {
  const { contactId } = req.params;
  const { favorite } = req.body;

    if (!("favorite" in req.body)) {
      return res.status(400).json({ message: "missing field favorite" });
    }

  try {
    const updatedContact = await contacts.updateStatusContact(contactId, {
      favorite,
    });
    res.json(updatedContact);
  } catch (error) {
    res.status(404).json({ message: "Not found" });
  }
};

module.exports = { updateStatusContact };