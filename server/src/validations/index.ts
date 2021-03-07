import Joi from "joi";

const username = Joi.string().alphanum().min(6).max(30).required();
const daily = Joi.number().min(1).max(25).required();
const password = Joi.string().min(8).required();
const name = Joi.string().min(1).required();

export const register = Joi.object().keys({ username, daily, password, name });
