const express = require('express')
const userRouter = express.Router()
const uploadMiddleware = require('../middleware/fileUploadMiddleware')
const { getUser, changeProfilePic, logout, uploadFiles } = require('../controllers/user')

userRouter.get('/', getUser)
userRouter.patch('/change-pic', changeProfilePic)
userRouter.delete('/logout', logout)
userRouter.post('/upload-file',uploadMiddleware.array('files', 10), uploadFiles)

module.exports = userRouter