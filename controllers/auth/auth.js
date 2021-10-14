const { Conflict } = require('http-errors')

const { User } = require('../../models')

const signup = async (req, res) => {
  const { email, password } = req.body
  const user = await User.findOne({ email })
  if (user) {
    throw new Conflict('Already registered')
  }
  const result = await User.create(req.body)
  res.status(201).json({
    status: 'success',
    code: 201,
    message: 'Success register'
  })
}

const login = async (req, res) => {

}

const logout = async (req, res) => {

}

module.exports = {
  signup,
  login,
  logout
}
