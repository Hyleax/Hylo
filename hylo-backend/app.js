require('dotenv').config()
const express = require('express')
const cookieParser = require('cookie-parser')
const app = express()
const connectDB = require('./db/connect')
const port = process.env.PORT || 5000

app.use(cookieParser())

// import routers
const authRouter = require('./routes/authentication')
const userRouter = require('./routes/user')
const threadPostRouter = require('./routes/threadPost')

//import middleware
const notFoundMiddleware = require('./middleware/not-found')
const errorHandlerMiddleware = require('./middleware/error-handler')
const authMiddleware = require('./middleware/authMiddleware')

app.use(express.json())

//MAIN ROUTES
app.use('/hylo/api/v1/auth', authRouter)
app.use('/hylo/api/v1/user',authMiddleware, userRouter)
app.use('/hylo/api/v1/thread',authMiddleware, threadPostRouter)

// use error handler middleware
app.use(notFoundMiddleware)
app.use(errorHandlerMiddleware)

const start = async() => {
    try {
        await connectDB(process.env.MONGO_URI)
        console.log("MONGODB connected");
        app.listen(port, () => {
            console.log(`server is listening on port ${port}`);
        })
    } catch (error) {
        console.log(error);
    }
}

start()
