import Joi from "joi";

export const UpdateTaskValidationDTO = Joi.object({
  id: Joi.number().required(),
  title: Joi.string(),
  description: Joi.string(),
  createdAt: Joi.date(),
  dueDate: Joi.date(),
  priority: Joi.string().valid("HIGH", "MEDIUM", "LOW"),
});
