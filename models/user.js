const { Schema, model } = require('mongoose')
const Joi = require('joi')

const emailRegexp = /\S+@\S+\.\S+$/

const userSchema = Schema({
  password: {
    type: String,
    required: [true, 'Password is required'],
    minlength: 8,
  },
  email: {
    type: String,
    required: [true, 'Email is required'],
    match: emailRegexp,
    unique: true,
  },
  subscription: {
    type: String,
    enum: ['starter', 'pro', 'business'],
    default: 'starter',
  },
  token: {
    type: String,
    default: null,
  },
},
{ versionKey: false, timestamps: true })

const joiSchema = Joi.object({
  email: Joi.string().min(1).pattern(emailRegexp).required(),
  password: Joi.string().min(8).required(),
  subscription: Joi.string(),
})

const User = model('user', userSchema)

module.exports = {
  User,
  joiSchema
}
