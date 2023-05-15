/**
 * The Post Schema can either be a created Post or a Reply to a post
 * A thread can have only 1 post and the rest will be replies
 * 
 */
const mongoose = require('mongoose')

const PostSchema = new mongoose.Schema({
    postType: {
        type: String,
        enum: ['POST', 'REPLY'],
        required: [true, "Discussion can only be either a post or a reply"]
    },

    title: {
        type: String,
    },

    content: {
        type: String,
        required: [true, 'post or reply must have content']
    },

    postedDate: {
        type: Date,
        default: Date.now()
    },

    createdBy: {
        type: mongoose.Types.ObjectId,
        ref: 'User',
        required: [true, 'Please provide user'],
    },

    creatorName: {
        type: String,
        required: [true, 'Please provide name']  
    },

    ratings: {
        type: Number,
        default: 0
    },

    instructorApproved: {
        type: Boolean,
        default: false
    },

    rank: {
        type: Number,
        default: 0
    },

    threadID: {
        type: mongoose.Types.ObjectId,
        ref: 'Thread',
        required: [true, 'every post needs to be attached to a thread']
    }
})

// Post Schema Middleware


// Post Shchema instance methods
// increase the ratings of the post/reply 
PostSchema.methods.increaseRating = async function() {
    this.ratings++
    await this.save()
    return this.ratings
}

// approve a specific post/reply
PostSchema.methods.instructorApprovePost = async function(){
    this.instructorApproved = !this.instructorApproved
    await this.save()
    return this.instructorApproved
}

// check if provided userID is the same as in the post
PostSchema.methods.checkReplierID = function(givenUserID) {
    // put double equals for now cuz im not sure if type is the same
    if (givenUserID == this.createdBy) {
        return true
    }
    return false
}

PostSchema.methods.rankAnswer = async function(num) {
    this.rank = num
    await this.save()
    return this.rank
}
module.exports = mongoose.model('Post', PostSchema)