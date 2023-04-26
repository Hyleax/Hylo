const express = require('express')
const authRouter = express.Router()
const { registerAccount, login, authenticateVerificationEmail } = require('../controllers/authentication')

authRouter.post('/register', registerAccount)
authRouter.get('/verification/:token', authenticateVerificationEmail)
authRouter.post('/login', login)

module.exports = authRouter