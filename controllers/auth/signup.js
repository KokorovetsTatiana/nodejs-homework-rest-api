const { User } = require('../../models')

const { Conflict } = require('http-errors')
const bcrypt = require('bcryptjs')
const { nanoid } = require('nanoid')
const sendEmail = require('../../helpers/sendMail')

const signup = async (req, res) => {
  const { email, password } = req.body
  const user = await User.findOne({ email })
  if (user) {
    throw new Conflict('Email in use')
  }
  const hashPassword = bcrypt.hashSync(password, bcrypt.genSaltSync(10))
  const verifyToken = nanoid
  const newUser = { email, password: hashPassword, verifyToken }
  await User.create(newUser)
  try {
    const emailVerify = {
      to: email,
      subject: 'Confirmation of registration',
      html: `<a href='http://localhost:3000/api/auth/verify/${verifyToken}' target='_blank'>Confirm email</a>`,
    }
    console.log(emailVerify)
    await sendEmail(emailVerify)
  } catch (error) {
    console.log(error.message)
  }
  res.status(201).json({
    status: 'created',
    code: 201,
    message: 'Success register'
  })
}

module.exports = signup
