const express = require('express')

const { controllerWrapper, validation, authentication } = require('../../middlewares')
const { contacts: ctrl } = require('../../controllers/contacts')
const { joiSchema, updateFavouriteJoiSchema } = require('../../models')

const router = express.Router()

router.get('/', authentication, controllerWrapper(ctrl.listContacts))

router.get('/:contactId', authentication, controllerWrapper(ctrl.getById))

router.post('/', authentication, validation(joiSchema), controllerWrapper(ctrl.add))

router.delete('/:contactId', authentication, controllerWrapper(ctrl.removeById))

router.put('/:contactId', validation(joiSchema), controllerWrapper(ctrl.updateById))

router.patch('/:contactId', validation(updateFavouriteJoiSchema), controllerWrapper(ctrl.updateStatusContact))

module.exports = router
