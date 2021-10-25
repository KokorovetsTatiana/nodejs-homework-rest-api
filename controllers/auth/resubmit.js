const { BadRequest } = require('http-errors')

const { User } = require('../../models')

const { sendEmail, sendSuccessRes } = require('../../helpers')

const resubmit = async(req, res, next) => {
  const { email } = req.body
  try {
    const { verify, verifyToken } = await User.findOne({ email })
    if (verify) {
      throw new BadRequest('Verification has already been passed')
    }
    const data = {
      to: email,
      from: 'admin@ukr.net',
      subject: 'Re-confirmation of registration',
      html: `<a href="http://localhost:3000/api/auth/verify/${verifyToken}" target="_blank">Confirm mail</a>`
    }
    await sendEmail(data)
    sendSuccessRes(res, { message: 'Verification email sent' }, 201)
  } catch (error) {
    next(error)
  }
}

module.exports = resubmit
