const { Schema, model } = require('mongoose')
const Joi = require('joi')
const bcrypt = require('bcryptjs')
const gravatar = require('gravatar')

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
  verify: {
    type: Boolean,
    default: false,
  },
  verifyToken: {
    type: String,
    required: [true, 'Verify token is required'],
  },
  avatar: {
    type: String,
    default: gravatar.url(this.email, { s: 250 }, true)
  },
},
{ versionKey: false, timestamps: true })

userSchema.methods.comparePassword = function (password) {
  return bcrypt.compareSync(password, this.password)
}

const joiSchema = Joi.object({
  email: Joi.string().min(1).pattern(emailRegexp).required(),
  password: Joi.string().min(8).required(),
  subscription: Joi.string(),
})

const verifyJoiSchema = Joi.object({
  email: Joi.string().required(),
})

const User = model('user', userSchema)

module.exports = {
  User,
  joiSchema,
  verifyJoiSchema
}
