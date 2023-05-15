const express = require('express')
const authRouter = express.Router()
const { registerAccount, login, authenticateVerificationEmail,forgotPassword, verifyForgotPasswordRequest, changePassword } = require('../controllers/authentication')

authRouter.post('/register', registerAccount)
authRouter.get('/verification/:token', authenticateVerificationEmail)
authRouter.post('/forgot-password', forgotPassword)
authRouter.get('/password-reset-verification/:token/:email', verifyForgotPasswordRequest)
authRouter.patch('/change-password', changePassword)
authRouter.post('/login', login)


module.exports = authRouter