const express = require('express');
const { contacts } = require("../../controllers/index");

const router = express.Router();

router.get('/', contacts.getContacts);

router.get("/:contactId", contacts.getContactById);

router.post('/', contacts.createContact);

router.delete('/:contactId', contacts.removeContact);

router.put('/:contactId', contacts.updateContact);

module.exports = router;
