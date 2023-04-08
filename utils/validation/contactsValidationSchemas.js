const Joi = require('joi');

const createContactSchema = Joi.object({
  name: Joi.string().required().messages({
    "any.required": "missing required name field",
  }),
  email: Joi.string().email().required().messages({
    "any.required": "missing required email field",
  }),
  phone: Joi.string()
    .pattern(/^\+?[0-9 ()-]{3,}$/)
    .required()
    .messages({
      "any.required": "missing required phone field",
    }),
});

const updateContactSchema = Joi.object()
  .keys({
    name: Joi.string().messages({
      "any.required": "missing required name field",
    }),
    email: Joi.string().email().messages({
      "any.required": "missing required email field",
    }),
    phone: Joi.string()
      .pattern(/^\+?[0-9 ()-]{3,}$/)
      .messages({
        "any.required": "missing required phone field",
      }),
    favorite: Joi.boolean(),
  })
  .min(1)
  .required()
  .messages({
    "object.min": "missing fields",
  });

module.exports = {
  createContactSchema,
  updateContactSchema,
};