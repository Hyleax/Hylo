const userModel = require('../models/User')
const threadModel = require('../models/Thread')
const PostModel = require('../models/Post')
const { StatusCodes } = require('http-status-codes')

// controller to get information of the logged in user
const getUser = async(req, res) => {
    const { userID } = req.user
    
    const user = await userModel.findById(userID)

    if (!user) {
        return res.status(StatusCodes.NOT_FOUND).json(
            {error: 'user not found'})
    } 

    const { fullName, email, description, bookMarkedPosts, dateCreatedOn, userType, profilePic} = user
    
    // find total number of ratings for the user
    const posts = await PostModel.find({createdBy: userID})
    const totalRatings = posts.reduce((a, b) => {
        return a + b.ratings
    }, 0)

    // find total number of posts and replies made
    const numOfPosts = posts.length

    // find total number of instructor approved replies
    const numofIA = posts.filter(p => p.instructorApproved)

    res.status(StatusCodes.OK).json({
            fullName,
            email,
            description,
            bookMarkedPosts,
            totalRatings,
            numOfPosts,
            dateCreatedOn,
            userType,
            profilePic,
            numOfPosts,
            numofIA: numofIA.length
        }
    )
}




// upload profile photo
const changeProfilePic = async(req, res) => {
    const { userID } = req.user
    const user = await userModel.findOneAndUpdate(
        {_id: userID},
        { $set: {profilePic: req.body.profilePicString} },
        {new: true, runValidators: true}
    )

    if (!user) {
        return res.status(StatusCodes.BAD_REQUEST).json({error: "cannot find user"})
    }

    return res.status(StatusCodes.OK).json({pic: user.profilePic})
} 



// logout
const logout = async(req, res) => {
    const { userID } = req.user
    const user = await userModel.findOne({_id: userID})

    if (!user) {
        return res.status(StatusCodes.BAD_REQUEST).json({error: 'error logging out, user not found'})
    }
    res.clearCookie('token')
    res.status(StatusCodes.OK).json({status: "success", msg: "user has been logged out"})
    }




// upload documents to become instructor
const uploadFiles = async(req, res) => {

    if (req.files) {
        const { userID } = req.user
        const user = await userModel.findOne({_id: userID})
        
        if (!user) {
            return res.status(StatusCodes.BAD_REQUEST).json({error: 'error uploading files, user not found'})
        }

        let path = ''
        req.files.forEach((file) => {
            path += file.path + ','
        })
        path = path.substring(0, path.lastIndexOf(","))

    
        // upload documents to db
        const { files } = await userModel.findOneAndUpdate(
            {_id: userID},
            { $set: {files: path} },
            {new: true, runValidators: true}
        )

        // check if provided fileString have been saved by the DB
        if (path !== files) {
            return res.status(StatusCodes.BAD_REQUEST).json({error: 'error occured when uploading files'}) 
        }

        // change userType to INSTRUCTOR
            await userModel.findOneAndUpdate(
            {_id: userID},
            { $set: {userType: 'INSTRUCTOR'} },
            {new: true, runValidators: true}
        )

        return res.status(StatusCodes.OK).json({status: 'success', msg: 'documents have been succesfully uploaded'})
    }

    else {
        return res.status(StatusCodes.BAD_REQUEST).json({error: 'there are no files in the request'})
    }
}





// save thread to bookmarks
const bookmarkThread = async(req, res) => {
    const { userID } = req.user

    const user = await userModel.findOne({_id: userID})

    if (!user) {
        return res.status(StatusCodes.NOT_FOUND).json(
            {error: 'user not found'})
    } 

        // bookmark posts
         const { bookMarkedPosts } = await userModel.findOneAndUpdate(
            {_id: userID},
            { $push: { bookMarkedPosts: req.params.postID } },
            {new: true, runValidators: true}
        )


    if (!(bookMarkedPosts[bookMarkedPosts.length - 1] === req.params.postID)) {
        return res.status(StatusCodes.BAD_REQUEST).json({
            error: "threadID's are not the same"
        }
        )
    }

    return res.status(StatusCodes.OK).json({
        status: 'success',
        msg: 'thread has been saved'
    })
}





// get user's bookmarked Posts
const getBookmarkedPosts = async(req, res) => {
    const { userID } = req.user

    const user = await userModel.findOne({_id: userID})

    if (!user) {
        return res.status(StatusCodes.NOT_FOUND).json(
            {error: 'user not found'})
    } 

    const bookmarkedPosts = await Promise.all(
        user.bookMarkedPosts.map(async(postID) => {
            const p = await PostModel.findOne({ _id: postID })
            const thread = await threadModel.findOne({ _id: p.threadID })

            const post = {
                ...p,
                category: thread.category
            }

            return post
        })       
    )

    const bookmarkedPostsWithCategory = bookmarkedPosts.map((p) => {
        return {
            ...p._doc,
            category: p.category
        }
    })
    
    return res.status(StatusCodes.OK).json({
        bookmarkedPosts: bookmarkedPostsWithCategory
    })
}



// edit user profile 
const editUserInfo = async(req, res) => {
    const { userID } = req.user
    const { firstName, lastName, description } = req.body

    // check if all fields empty
    if (!firstName && !lastName && !description) {
        return res.status(StatusCodes.BAD_REQUEST).json({
            error: 'at least one field must be filled'
        })
    }

    const user = await userModel.findOne({ _id: userID })
    const names = user.fullName.split(" ")
    let fullname;

    if (firstName) {
        fullname = `${firstName} ${names[2]}`
        await userModel.findOneAndUpdate(
            {_id: userID},
            { $set: {fullName: fullname} },
            {new: true, runValidators: true}
        )
    }

    if (lastName) {
        fullname = `${names[0]} ${lastName}`
        await userModel.findOneAndUpdate(
            {_id: userID},
            { $set: {fullName: fullname} },
            {new: true, runValidators: true}
        )
    }

    if (description) {
        await userModel.findOneAndUpdate(
            {_id: userID},
            { $set: {description: description} },
            {new: true, runValidators: true}
        )
    }

    return res.status(StatusCodes.OK).json({
        status: 'success',
        msg: 'changes to profile have been saved'
    })
}

module.exports = { getUser, changeProfilePic, logout, uploadFiles, bookmarkThread,getBookmarkedPosts, editUserInfo }