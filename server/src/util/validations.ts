import Joi from "joi";

const username = Joi.string().alphanum().min(6).max(30).required();
const daily = Joi.number().min(1000).max(25000).required();
const password = Joi.string().min(8).required();

const name = Joi.string().min(1).required();
const time = Joi.number().min(0).max(23).required();

// this is how much water you can log at one time
const intake = Joi.number().min(0).max(2000).required();
// for log sync
const date = Joi.date().required();
const logEntry = Joi.object().length(2).keys({ 0: intake, 1: date });

export const addFriend = Joi.object().keys({ friend: username });
export const syncLogs = Joi.array().items(logEntry);
export const logIntake = Joi.object().keys({ intake });
export const setReminders = Joi.object().keys({ wakeTime: time, sleepTime: time });
export const setDailyIntake = Joi.object().keys({ daily });
export const register = Joi.object().keys({ username, daily, password, name });
export const login = Joi.object().keys({ username, password });
