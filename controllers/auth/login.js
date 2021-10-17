const { BadRequest } = require('http-errors')
const jwt = require('jsonwebtoken')
const { SECRET_KEY } = process.env

const { User } = require('../../models')

const login = async (req, res) => {
  const { email, password } = req.body
  const user = await User.findOne({ email }, '_id email password')
  if (!user || !user.comparePassword(password)) {
    throw new BadRequest('Email or password is wrong')
  }
  const { _id } = user
  const payload = {
    _id
  }
  const token = jwt.sign(payload, SECRET_KEY)
  await User.findByIdAndUpdate(_id, { token })
  res.json({
    status: 'success',
    code: 200,
    token
  })
}

module.exports = login
