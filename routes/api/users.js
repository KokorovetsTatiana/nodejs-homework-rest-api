const express = require('express')

const { controllerWrapper, upload, authentication } = require('../../middlewares')
const { avatars: ctrl } = require('../../controllers')

const router = express.Router()

router.patch('/avatars', authentication, upload.single('photo'), controllerWrapper(ctrl.update))

module.exports = router
