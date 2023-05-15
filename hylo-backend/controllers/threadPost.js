const {StatusCodes} = require('http-status-codes')
const UserModel = require('../models/User')
const ThreadModel = require('../models/Thread')
const PostModel = require('../models/Post')



// creating a post and reply will be done in separate controllers
// this is because a post can be created knowing nothing
// but a reply must be created based of a thread and post
const createPost = async(req, res) => {
    const {title, content, category} = req.body
    if (!title || !content || !category) {
        return res.status(StatusCodes.BAD_REQUEST).json(
            {error: 'please fill up all fields'})
    }

    // create thread
    const thread = await ThreadModel.create({
        category: category.toUpperCase(),
    })

    const user  = await UserModel.findOne({_id: req.user.userID})

    // create post
    const newPost = await PostModel.create({
        postType: 'POST',
        title: title,
        content: content,
        createdBy: req.user.userID,
        creatorName: user.fullName,
        threadID: thread._id
    })

    return res.status(StatusCodes.CREATED).json(
        {
            status: 'success',
            msg: 'post made',
            post: newPost
        })
}   



// get all posts that have the same threadID
const getThread = async(req, res) => {
    const threadPosts = await PostModel.find({threadID: req.params.threadID})

    const threadPostsWithExtraInfo = await Promise.all(
        threadPosts.map(async(p) => {

            // find user
            const user = await UserModel.findOne({_id: p.createdBy})

            const newPost = {
                ...p,
                profilePic: user.profilePic,
                userType: user.userType
            }

            return newPost
        })
    )

    const finalThreadPosts = threadPostsWithExtraInfo.map((p) => {
        return {
            ...p._doc,
            profilePic: p.profilePic,
            userType: p.userType
        }
    })

    if (!threadPosts) {
        return res.status(StatusCodes.BAD_REQUEST).json({msg: 'thread could not be found'})
    }


    res.status(StatusCodes.OK).json({
        posts: finalThreadPosts
    })
}



// get all posts from the Collection
const getAllPosts = async(req, res) => {
    const { title, category, filterCriteria, sort } = req.query
    // initialize query object
    let queryObject = {}
    if (title) {
        queryObject.title = {$regex: title, $options: 'i'}
    }

    // filter posts
    // prob call a separate helper function to help filter posts
    
    // sort posts according to sorting criteria provided
    let allPosts;
    if (sort) {
        allPosts = PostModel.find(queryObject)
        allPosts = await allPosts.sort(sort)
    }else {
        allPosts = await PostModel.find(queryObject)
    }
    

    const posts = await Promise.all(
        allPosts.map(async (p) => {

            // get thread to find category
            const thread = await ThreadModel.findOne({_id: p.threadID})

            const post = {
                ...p,
                category: thread.category,
            }

            if (category) {
                if (post.category === category) {
                    return post
                }
            }

            return post
        })
    )

    const postsWithCategory = posts.map((p) => {
        return {
            ...p._doc,
            category: p.category
        }
    })

    // filter posts by category
    let filteredPostsByCategory
    if (category) {
        filteredPostsByCategory = postsWithCategory.filter((p) => p.category === category)
    }

    // filter post by filter criteria

    res.status(StatusCodes.OK).json({posts: category ? filteredPostsByCategory: postsWithCategory})
}





// maybe remember to put a small 'update message'/ should maybe include in the Model as well
// use the _id of the post to delete
const updatePost = async(req, res) => {
    res.status(200).json({msg: 'post has been updated'})
}


// ONLY INSTRUCTORS CAN USE THIS CONTROLLER
// deleting the post will also the delete the thread associated with it
// prob just delete the whole thread I guess
const deletePost = async(req, res) => {
    // deleting the post also means deleting the thread
    // get threadID and postID from req.params

    /**
     * NOT SURE IF SHOULD ALLOW FOR DELETING POST OR ONLY REPLIES
     */
    // delete the post to free DB resources
    await PostModel.deleteOne({_id: req.params.postID, createdBy: req.user.userID})

    // delete the thread
    await ThreadModel.deleteOne({_id: threadID})

    res.status(200).json({msg: 'post has been deleted'})
}


const filterPosts = () => {

}


// get the thread _id from req.params
const createReply = async(req, res) => {
    const { content } = req.body
    const thread = await ThreadModel.findById({_id: req.params.threadID})
    if (!thread) {
        return res.status(StatusCodes.BAD_REQUEST).json(
            {error: 'thread was not found'})
    }

    const user  = await UserModel.findOne({_id: req.user.userID})

    // create reply
    const reply = await PostModel.create({
        postType: 'REPLY',
        content: content,
        createdBy: req.user.userID,
        creatorName: user.fullName,
        threadID: thread._id
    })

    res.status(StatusCodes.CREATED).json(
        {
            status: 'success',
            msg: 'reply made',
            post: reply            
        })
}





// get the thread _id from req.params
const updateReply = async(req, res) => {
    res.status(200).json({msg: 'reply has been updated'})
}





// use the _id of the post to delete
// only users can delete their own replies
// check req.user if user is a user or instructor,
// if instructor, allow them to delete any reply
const deleteReply = async(req, res) => {
    const user = await UserModel.findOne({_id: req.user.userID})
    // check if user is instructor
    if (user.userType === 'INSTRUCTOR') {
        const isDeleted = await deleteReplyHelperFunction(req.params.postID)
        deletionConfirmer(isDeleted, user.userType.toLowerCase(), res)
    }

    // if user is not an instructor
    else {
            const reply = await PostModel.findOne({_id: req.params.postID})

        if (!reply) {
            res.status(StatusCodes.BAD_REQUEST).json({
                error: 'reply could not be found'
            })
        }

        // check if userID is the same as in the reply
        const userIDSame = reply.checkReplierID(req.user.userID)
        if (!userIDSame) {
            res.status(StatusCodes.UNAUTHORIZED).json({
                error: 'user is not allowed to delete other users posts'
            })
        }

        const isDeleted = deleteReplyHelperFunction(req.params.postID)
        deletionConfirmer(isDeleted, user.userType.toLowerCase(), res)
    }
}

//helper function to delete reply via threadID and postID
const deleteReplyHelperFunction = async(postID) => {
    const isDeletedFromThread = await PostModel.deleteOne({_id: postID})
    if (!isDeletedFromThread) {
        return false
    }
    return true
}

// helper function to confirm deletetion of reply
const deletionConfirmer = (isDeleted, userType, res) => {
    if (!isDeleted) {
        return res.status(StatusCodes.BAD_REQUEST).json({
            error: 'reply was not deleted'
        })
    }

    return res.status(StatusCodes.OK).json(
        {
            status: 'success',
            userType: `${userType}`,
            msg: 'reply was succesfully deleted'
        })
}





// For an instructor to approve a given post/reply
// can only be called by instructor
const approvePost = async(req, res) => {
    const user = await UserModel.findOne({_id: req.user.userID})

    // check if user is instructor
    if (user.userType !== 'INSTRUCTOR') {
        res.status(StatusCodes.UNAUTHORIZED).json({
            error: 'only instructors can approve posts'
        })
    }

    const reply = await PostModel.findOne({_id: req.params.postID})
    if (!reply) {
        res.status(StatusCodes.BAD_REQUEST).json({
            error: 'reply not found'
        })
    }
    await reply.instructorApprovePost()

    return res.status(StatusCodes.OK).json({
        status: 'success',
        msg: 'post has been approved by an instructor'
    })
}



// users can upvote a post that they like
const upvotePost = async(req, res) => {
    const post = await PostModel.findOne({_id: req.params.postID})
    const currentRating = post.increaseRating()
    if (!currentRating) {
        res.status(StatusCodes.BAD_GATEWAY).json({
            error: 'there was an error while upvoting the post'
        })
    }
    return res.status(StatusCodes.OK).json({
        status: 'success',
        msg: 'post has been upvoted succesfully',
        currentRating: currentRating
    })
}

const getPostAuthorUserType = async(req, res) =>{
    const user = await UserModel.findOne({_id: req.params.userID})
    return res.status(StatusCodes.OK).json({userType: user.userType})
}




module.exports = {createPost, getAllPosts, getThread, createReply, deletePost, deleteReply, updatePost, approvePost, upvotePost, updateReply, getPostAuthorUserType}