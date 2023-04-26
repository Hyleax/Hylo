const express = require('express')
const threadPostRouter = express.Router()
const { createPost, getAllPosts, getThread, createReply, deletePost, deleteReply, updatePost, approvePost, upvotePost, updateReply, getPostAuthorUserType } = require('../controllers/threadPost')

threadPostRouter.get('/get-all-posts', getAllPosts)
threadPostRouter.get('/get-thread/:threadID', getThread)
threadPostRouter.post('/make-post', createPost)
threadPostRouter.post('/reply-post/:threadID', createReply)
threadPostRouter.delete('/delete-post', deletePost)
threadPostRouter.patch('/update-post', updatePost)
threadPostRouter.patch('/approve-post/:postID', approvePost)
threadPostRouter.patch('/upvote-post/:postID', upvotePost)
threadPostRouter.get('/get-post-user-type/:userID', getPostAuthorUserType)
// I will maybe remove these 2 in the future, they seem unecessary
// maybe I will let the 'delete-post' and 'update-post' do it instead
threadPostRouter.delete('/delete-reply/:postID', deleteReply)
threadPostRouter.patch('/update-reply', updateReply)




module.exports = threadPostRouter