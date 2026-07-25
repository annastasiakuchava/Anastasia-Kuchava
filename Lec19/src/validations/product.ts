import Joi from 'joi';

export const productValidationSchema = Joi.object({
  name: Joi.string().min(2).max(100).required(),
  description: Joi.string().min(5).max(1000).required(),
  price: Joi.number().positive().required(),
  image: Joi.string().uri().required(),
  category: Joi.string().required()
});