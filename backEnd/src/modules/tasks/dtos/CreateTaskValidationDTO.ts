import Joi from "joi";

export const CreateTaskValidationDTO = Joi.object({
  title: Joi.string().required(),
  description: Joi.string().required(),
  createdAt: Joi.date().default(Date.now).required(),
  dueDate: Joi.date().required(),
  priority: Joi.string().valid("HIGH", "MEDIUM", "LOW").required(),
});
