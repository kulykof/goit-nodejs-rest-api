const Contact = require("../models/contact");
// const fs = require('fs/promises');
// const path = require('path');

// const contactsPath = path.join(__dirname, "contacts.json");

const getContacts = async () => {
  const contacts = await Contact.find({});
  return contacts;
};

const getContactById = async (contactId) => {
  const contact = await Contact.findById(contactId);
  if (!contact) {
    throw new Error("Not found");
  }
  return contact;
};

const createContact = async (body) => {
  const contact = new Contact(body);
  await contact.save();
  return contact;
};

const removeContact = async (contactId) => {
  const contact = await Contact.findByIdAndRemove(contactId);
  if (!contact) {
    throw new Error('Not found');
  }
  return contact;
};

const updateContact = async (contactId, body) => {
  const contact = await Contact.findByIdAndUpdate(contactId, body, {
    new: true,
  });
  if (!contact) {
    throw new Error("Not found");
  }
  return contact;
};

const updateStatusContact = async (contactId, body) => {
  const updatedContact = await Contact.findByIdAndUpdate(
    contactId,
    { favorite: body.favorite },
    { new: true }
  );

  return { contact: updatedContact, status: 200 };
};

module.exports = {
  getContacts,
  getContactById,
  removeContact,
  createContact,
  updateContact,
  updateStatusContact,
};
