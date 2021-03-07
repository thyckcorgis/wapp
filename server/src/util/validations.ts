import Joi from "joi";

const username = Joi.string().alphanum().min(6).max(30).required();
const daily = Joi.number().min(1000).max(25000).required();
const password = Joi.string().min(8).required();

const name = Joi.string().min(1).required();
const time = Joi.number().min(0).max(23).required();

// this is how much water you can log at one time
const water = Joi.number().min(0).max(2000).required();

export const logIntake = Joi.object().keys({ water });
export const setReminders = Joi.object().keys({ wakeTime: time, sleepTime: time });
export const setDailyIntake = Joi.object().keys({ daily });
export const register = Joi.object().keys({ username, daily, password, name });
export const login = Joi.object().keys({ username, password });
