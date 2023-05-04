const jwt = require('jsonwebtoken')
const { StatusCodes } = require('http-status-codes')

const authMiddleware = (req, res, next) => {
    try {
         // grab token from cookie storage
        const token = req.cookies.token;

        // console.log("This is the cookies",req.cookies);
        if (!token) {
            res.status(404).json({error: 'cookie not found not found'})
        }


        const { userID, name } = jwt.verify(token, process.env.JWT_SECRET)
        req.user = { userID, name }
        next()
    } catch (error) {
        console.log(error);
        res.clearCookie("token")
        res.status(StatusCodes.UNAUTHORIZED).json(
            {error: 'token is not provided'})
    }
}

module.exports = authMiddleware