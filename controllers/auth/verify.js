const { NotFound } = require('http-errors')
const { sendSuccessRes } = require('../../helpers')
const { User } = require('../../models')

const verify = async (req, res) => {
  const { verifyToken } = req.params
  const user = User.findOne({ verifyToken })
  if (!user) {
    throw new NotFound('Verify token')
  }
  await User.findByIdAndUpdate(user._id, { verifytoken: null, verify: true })
  sendSuccessRes(res, { message: 'Email verify success' })
}

module.exports = verify
