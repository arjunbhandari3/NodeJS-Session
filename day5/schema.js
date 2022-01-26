const Joi = require("joi");

exports.createTaskSchema = Joi.object({
  title: Joi.string().required(),
  description: Joi.string().required(),
  status: Joi.string().required(),
});

exports.updateTaskSchema = Joi.object({
  description: Joi.string().required(),
  status: Joi.string().required(),
});
