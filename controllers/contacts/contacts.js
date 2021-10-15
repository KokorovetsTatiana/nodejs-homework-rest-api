const { NotFound } = require('http-errors')

const { sendSuccessRes } = require('../../helpers')
const { Contact } = require('../../models')

const listContacts = async (req, res) => {
  const { _id } = req.user
  const result = await Contact.find({ owner: _id }, '_id name email phone favourite')
  sendSuccessRes(res, { result })
}

const getById = async(req, res) => {
  const { contactId } = req.params
  const result = await Contact.findById(contactId, '_id name email phone favourite')
  if (!result) {
    throw new NotFound(`Contact with id=${contactId} not found`)
  }
  sendSuccessRes(res, { result })
}

const add = async (req, res) => {
  const newContact = { ...req.body, owner: req.user._id }
  const result = await Contact.create(newContact)
  sendSuccessRes(res, { result }, 201)
}

const updateById = async (req, res) => {
  const { contactId } = req.params
  const result = await Contact.findByIdAndUpdate(contactId, req.body, { new: true })
  if (!result) {
    throw new NotFound(`Contact with id=${contactId} not found`)
  }
  sendSuccessRes(res, { result })
}

const removeById = async(req, res) => {
  const { contactId } = req.params
  const result = await Contact.findByIdAndDelete(contactId)
  if (!result) {
    throw new NotFound(`Contact with id=${contactId} not found`)
  }

  sendSuccessRes(res, { message: `Contact with id=${contactId} has been successfully deleted` })
}

const updateStatusContact = async (req, res) => {
  const { contactId } = req.params
  const { favourite } = req.body
  const result = await Contact.findByIdAndUpdate(
    contactId,
    { favourite },
    { new: true }
  )
  if (!result) {
    throw new NotFound(`Contact with id=${contactId} not found`)
  }
  res.json({
    status: 'success',
    code: 200,
    data: {
      result,
    },
  })
}

module.exports = {
  listContacts,
  getById,
  add,
  updateById,
  removeById,
  updateStatusContact
}
