const express = require('express')

const { joiSchema, verifyJoiSchema } = require('../../models/user')
const { controllerWrapper, validation, authentication } = require('../../middlewares')
const { auth: ctrl } = require('../../controllers')

const router = express.Router()

router.post('/signup', validation(joiSchema), controllerWrapper(ctrl.signup))

router.post('/login', validation(joiSchema), controllerWrapper(ctrl.login))

router.get('/logout', authentication, controllerWrapper(ctrl.logout))

router.get('/current', authentication, controllerWrapper(ctrl.current))

router.post('/verify', validation(verifyJoiSchema), controllerWrapper(ctrl.resubmit))

router.get('/verify/:verificationToken', controllerWrapper(ctrl.verify))

module.exports = router
