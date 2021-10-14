const express = require('express')

const { joiSchema } = require('../../models/user')
const { controllerWrapper, validation } = require('../../middlewares')
const { auth: ctrl } = require('../../controllers/auth')

const router = express.Router()

router.post('/signup', validation(joiSchema), controllerWrapper(ctrl.signup))

router.post('/login', validation(joiSchema), controllerWrapper(ctrl.login))

router.get('/logout', controllerWrapper(ctrl.login))

module.exports = router
