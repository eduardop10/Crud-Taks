import Joi from "joi";

export const DeleteTaskValidationDTO = Joi.object({
  id: Joi.number().required()
});
