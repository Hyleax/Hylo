const userModel = require('../models/User')
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




// UPLOAD DOCUMENTS IN ORDER TO BECOME INSTRUCTOR
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
        const uploadedFiles = await user.uploadFile(path)

        // check if provided fileString have been saved by the DB
        if (path !== uploadedFiles) {
            return res.status(StatusCodes.BAD_REQUEST).json({error: 'error occured when uploading files'}) 
        }

        // change userType to instructor
        await user.changeUserType()

        return res.status(StatusCodes.OK).json({status: 'success', msg: 'documents have been succesfully uploaded'})
    }

    else {
        return res.status(StatusCodes.BAD_REQUEST).json({error: 'there are no files in the request'})
    }
}

// change password

// forgot password

// view bookmarked posts


module.exports = { getUser, changeProfilePic, logout, uploadFiles}