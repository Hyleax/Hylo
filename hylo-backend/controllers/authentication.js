const {StatusCodes} = require('http-status-codes')
const UserModel = require('../models/User')
const jwt = require('jsonwebtoken')

// controllers that handle authentication of the app
// e.g., login, registration etc.

//ACCOUNT CREATION / REGISTRATION CONTROLLER
const registerAccount = async(req, res) => {
    const {email, firstName, lastName, username, password, confirmPassword} = req.body
    // if fields are missing
    if (!email || !firstName || !lastName || !username || !password || !confirmPassword) {
        return res.status(StatusCodes.BAD_REQUEST).json({error: 'please fill in all fields'})
    }

    // check if email or username is taken
    const isTaken = await UserModel.findOne({$or:[{ username: username },{ email: email }]})  
    if (isTaken) {
        return res.status(StatusCodes.UNAUTHORIZED).json({error: 'email or username has been taken'})
    }

    // check password strength
    const passwordRgx = /^(?=.*\d)(?=.*[!@#$%^&*])(?=.*[a-z])(?=.*[A-Z]).{8,}$/;
    const passwordStrongEnough = passwordRgx.test(password)

    if (!passwordStrongEnough) {
        return res.status(StatusCodes.UNAUTHORIZED).json({
            status: 'error',
            msg: 'password is not strong enough'
        })
    }

    // check if both password fields match
    if (password !== confirmPassword) {
        return res.status(StatusCodes.UNAUTHORIZED).json({error: 'passwords do not match'})
    }

    // hash password

    const user = await UserModel.create(
        {
            username: username,
            email: email,
            fullName: `${firstName} ${lastName}`,
            password: password
        }
    ) 

    // send verification email
    const emailSent = user.sendVerificationEmail()
    if (!emailSent) {
        return res.status(StatusCodes.FAILED_DEPENDENCY).json({error: 'email was not sent, try again'})
    }

    return res.status(StatusCodes.CREATED).json(
        {
            status: 'success',
            message: 'account has been created',
            user: user
        })
}





// function to send verification email after user has registered an account
const authenticateVerificationEmail = async(req, res) => {
    const userID = jwt.verify(req.params.token, process.env.JWT_SECRET)
    const verifyAccount = await UserModel.findOneAndUpdate(
        {_id: userID.user},
        { $set: {active: true} },
        {new: true, runValidators: true}
    )
    if (verifyAccount.active !== true) {
        return res.status(StatusCodes.NOT_FOUND).json({error: 'error occured during account activation, please refresh the page'})
    }

    return res.status(StatusCodes.OK).send(
        `<h3>${verifyAccount.username}, 
        your account has been succesfully activated.</h3>`
    )
}




// ACCOUNT LOGIN CONTROLLER
const login = async(req, res) => {
    const {username, password, stayLoggedIn} = req.body
    // check if username or password is empty
    if (!username || !password) {
        return res.status(StatusCodes.BAD_REQUEST).json(
            {error: 'please fill in all fields'})
    }

    // check if username or email is in DB
    const userExists = await UserModel.findOne({username: username})
    
    if (!userExists) {
        return res.status(StatusCodes.NOT_FOUND).json(
            {error: 'An account with these details do not exist'})
    }

    const passwordCorrect = await userExists.comparePassword(password)
    // check if password matches the user
    if (!passwordCorrect) {
        return res.status(StatusCodes.UNAUTHORIZED).json(
            {error: 'Password is incorrect for this account'})
    } 

    if (userExists.active === false) {
        return res.status(StatusCodes.UNAUTHORIZED).json(
            {error: 'Please verify your account'})
    }

    // create JWT
    const token = userExists.createJWT(stayLoggedIn)

    // if user does not want to stay logged in, then set cookie to expire after session is over
    res.cookie('token', token, {
        expires: stayLoggedIn === true ? new Date(Date.now() + 900000000) : 0,
        httpOnly: true, 
        sameSite: 'none',
        secure: true,
    })
       
    // return user and token
    return res.status(StatusCodes.OK).json(
        {
            status: 'success',
            message: 'User has been logged in',
            userID: userExists._id,
            token: token
        })
}




// User forgot password
// accepts email, ask user to click on link, enter new password to link

const forgotPassword = async(req, res) => {
    const { email } = req.body

    // check if email exists
    const user  = await UserModel.findOne({ email: email })

    if (!user) {
        res.status(StatusCodes.BAD_REQUEST).json({
            status: 'error',
            msg: 'this email does not exist in the system'
        })
    }

    const emailSent = user.sendNewPasswordEmail()
    if (!emailSent) {
        res.status(StatusCodes.BAD_REQUEST).json({
            status: 'error',
            msg: 'an error occured while sending the email'
        })
    }

    res.status(StatusCodes.OK).json({
        status: 'success',
        msg: 'password reset link has been sent to email'
    })
}




// verify if password request was sent by the same email address
const verifyForgotPasswordRequest = async(req, res) => {
    const email = jwt.verify(req.params.token, process.env.JWT_SECRET)
            if (email.userEmail !== req.params.email) {
                return res.status(StatusCodes.UNAUTHORIZED).json({
                    status: 'error',
                    msg: 'emails do not match'
                })
            }

    const user  = await UserModel.findOne({email: email.userEmail})

    if (!user) {
       return res.status(StatusCodes.BAD_REQUEST).json({
            status: 'error',
            msg: 'user with this email cannot be found'
        })
    }

    // redirect to front-end change password link
    return res.redirect('http://localhost:3002/change-password')
}


// change password
const changePassword = async(req, res) => {
    const { password, confirmPassword, email } = req.body

    // check password strength
    const passwordRgx = /^(?=.*\d)(?=.*[!@#$%^&*])(?=.*[a-z])(?=.*[A-Z]).{8,}$/;
    const passwordStrongEnough = passwordRgx.test(password)
 
    if (!passwordStrongEnough) {
        return res.status(StatusCodes.UNAUTHORIZED).json({
            status: 'error',
            msg: 'password is not strong enough'
        })
    }

    // check if both passwords are the same
    if (password !== confirmPassword) {
        return res.status(StatusCodes.UNAUTHORIZED).json({
            status: 'error',
            msg: 'provided passwords do not match each other'
        })
    }

    const user = await UserModel.findOne({email: email})


    const passwordChanged = user.changeUserPassword(password)

    if (passwordChanged) {
        return res.status(StatusCodes.OK).json({
            status: 'success',
            msg: 'password has been changed'
        })
    }
}

module.exports = { registerAccount, login, authenticateVerificationEmail, forgotPassword, verifyForgotPasswordRequest, changePassword }