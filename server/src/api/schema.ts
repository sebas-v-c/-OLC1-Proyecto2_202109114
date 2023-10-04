import Joi from "joi"


export const QCObjectSchema = Joi.object({
    name: Joi.string().required(),
    content: Joi.string().required()
})
