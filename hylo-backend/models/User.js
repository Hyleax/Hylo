// The User Model will consist of 2 types of users
// first being the regular student user which posts questions on the site
// the second being the instructor that has the ability to moderate the posts

const mongoose = require('mongoose')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const nodeMailer = require('nodemailer')

const UserSchema = new mongoose.Schema({
    active: {
        type: Boolean,
        default: false,
        required: [true, 'please provide account status']
    },

    userType: {
        type: String,
        enum: ['STUDENT', 'INSTRUCTOR'],
        default: 'STUDENT',
        required: [true, "please provide userType"]
    },

    username: {
        type: String,
        required: [true, "Please provide username"],
        unique: true
    },

    email: {
        type: String,
        required: [true, "Please provide email"],
        match: [
            /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
             "please provide valid email"
            ],
        unique: true
    },

    fullName: {
        type: String,
        required: [true, "please provide full name"],
    },

    password: {
        type: String,
        required: [true, "please provide password"]
    },

    // profile pic will be stored as a string with base64 format
    profilePic: {
        type: String,
        default: ""
    },

    description: {
        type: String,
        default: ""
    },     

    bookMarkedPosts: {
        type: Array
    },

    dateCreatedOn: {
        type: Date,
        default: new Date()
    }
})

// Mongoose Middleware

//HASH USER PASSWORD
UserSchema.pre('save', async function(next) {
    const salt  = await bcrypt.genSalt(10)
    this.password = await bcrypt.hash(this.password, salt)
    next()
})

// Mongoose Instance Methods

// Compare Passwords
UserSchema.methods.comparePassword = async function(inputtedPassword) {
    const passwordsMatch = await bcrypt.compare(inputtedPassword, this.password)
    return passwordsMatch
}

// create JWT
UserSchema.methods.createJWT = function() {
    return jwt.sign(
        {
            userID: this._id,
             name: this.username
        }, 
        process.env.JWT_SECRET,
        {expiresIn: process.env.JWT_LIFETIME})
}

// send verification email
UserSchema.methods.sendVerificationEmail = function() {
    try {
        const transporter = nodeMailer.createTransport({
            service: 'gmail',
            auth: {
                user: process.env.HOSTEMAIL,
                pass: process.env.PASSWORD
            }
        })

        jwt.sign({user: this._id}, process.env.JWT_SECRET, {expiresIn: '1d'}, (err, emailToken) => {
            const url = `https://hylo-discussion-backend.onrender.com/hylo/api/v1/auth/verification/${emailToken}`;

            transporter.sendMail({
                to: this.email,
                subject: 'Hylo Registration Confirmation Email',
                html: `Please click this link to activate your Hylo Account: <a href="${url}">${url}</a>`
            })
            console.log('verification email has been sent');
        })

        return true
   } 
   
   catch (error) {
        console.log(error);
   }
}


module.exports = mongoose.model('User', UserSchema)
