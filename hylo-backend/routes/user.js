const express = require('express')
const userRouter = express.Router()
const uploadMiddleware = require('../middleware/fileUploadMiddleware')
const { getUser, changeProfilePic, logout, uploadFiles,bookmarkThread,getBookmarkedPosts } = require('../controllers/user')

userRouter.get('/', getUser)
userRouter.patch('/change-pic', changeProfilePic)
userRouter.delete('/logout', logout)
userRouter.post('/upload-file',uploadMiddleware.array('files', 10), uploadFiles)
userRouter.patch(`/bookmark-thread/:postID`, bookmarkThread)
userRouter.get(`/get-bookmarked-threads`, getBookmarkedPosts)

module.exports = userRouter