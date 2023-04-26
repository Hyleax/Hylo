const express = require('express')
const userRouter = express.Router()
const { getUser, changeProfilePic } = require('../controllers/user')

userRouter.get('/', getUser)
userRouter.patch('/change-pic', changeProfilePic)

module.exports = userRouter