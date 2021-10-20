const path = require('path')
const fs = require('fs/promises')

const { transformAvatar, sendSuccessRes } = require('../../helpers')
const { User } = require('../../models')

const avatarsDir = path.join(__dirname, '../../', 'public/avatars')

const update = async (req, res) => {
  const { _id } = req.user
  const { path: tempStorage, originalname } = req.file
  try {
    await transformAvatar(tempStorage)
    const [extention] = originalname.split('.').reverse()
    const newFileName = `avatars_profile_image_${_id}.${extention}`
    const resultStorage = path.join(avatarsDir, newFileName)
    await fs.rename(tempStorage, resultStorage)
    const avatarURL = path.join('/avatars', newFileName)
    const user = await User.findByIdAndUpdate(_id, { avatarURL }, { new: true })
    sendSuccessRes(res, { avatarURL: user.avatarURL })
  } catch (error) {
    await fs.unlink(tempStorage)
    throw error
  }
}

module.exports = update
