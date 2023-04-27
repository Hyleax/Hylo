const express = require('express')
const userRouter = express.Router()
const { getUser, changeProfilePic, logout } = require('../controllers/user')

userRouter.get('/', getUser)
userRouter.patch('/change-pic', changeProfilePic)
userRouter.delete('/logout', logout)

module.exports = userRouter