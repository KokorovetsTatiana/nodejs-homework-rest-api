const jimp = require('jimp')

const transformAvatar = async (pathFile) => {
  const picture = await jimp.read(pathFile)
  await picture.autocrop().cover(250, 250, jimp.HORIZONTAL_ALIGN_CENTER | jimp.VERTICAL_ALICN_MIDDLE).writeAsync(pathFile)
}

module.exports = transformAvatar
