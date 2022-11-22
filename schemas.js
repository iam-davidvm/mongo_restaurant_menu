const Joi = require('Joi');

module.exports.dishSchema = Joi.object({
  name: Joi.string().required(),
  ingredients: Joi.array()
    .required()
    .items(Joi.string().required(), Joi.number().forbidden()),
  price: Joi.number().required().min(5),
  course: Joi.string()
    .required()
    .pattern(/^(voorgerecht)|(hoofdgerecht)|(dessert)$/),
});
