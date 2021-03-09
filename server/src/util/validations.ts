import Joi from "joi";

const username = Joi.string().alphanum().min(6).max(30).required();
const email = Joi.string().email().required();
const daily = Joi.number().min(1000).max(25000).required();
// TODO: Add regex
const password = Joi.string().min(8).required();

const name = Joi.string().min(1).required();
const time = Joi.number().min(0).max(23).required();

// this is how much water you can log at one time
const intake = Joi.number().min(0).max(2000).required();
// for log sync
const date = Joi.number().integer().required();
const logEntry = Joi.object().length(2).keys({ 0: intake, 1: date });

const year = Joi.number().integer().min(1970).max(2037).required();
const month = Joi.number().integer().min(1).max(12).required();

export const getMonthly = Joi.object().keys({ year, month });
export const addFriend = Joi.object().keys({ friend: username });
export const syncLogs = Joi.array().items(logEntry);
export const logIntake = Joi.object().keys({ intake });
export const setReminders = Joi.object().keys({ wakeTime: time, sleepTime: time });
export const setIntake = Joi.object().keys({ daily });
export const register = Joi.object().keys({ username, email, daily, password, name });
export const login = Joi.object().keys({ username, password });

export async function validate<T>(schema: Joi.Schema<T>, data: T) {
  const { error } = schema.validate(data);
  if (error) throw error;
}
