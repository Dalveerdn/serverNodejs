const Joi = require("joi");

const taskSchema = Joi.object({
    title: Joi.string().min(3).max(100).required(),
    description: Joi.string().min(5).max(500).required(),
    status: Joi.string()
        .valid("Pending", "In-Progress", "Completed")
        .required(),
    dueDate: Joi.date().iso().required(),
});

module.exports = taskSchema;
