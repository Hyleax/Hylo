const path = require('path')
const multer = require('multer')

const storage = multer.diskStorage({
    destination: function(req, file, callback) {
        callback(null, 'uploads/')
    },
    filename: function(req, file, callback) {
        let ext = path.extname(file.originalname)
        callback(null, Date.now() + ext)
    }
})



const uploadMiddleware = multer({
    storage: storage,
    fileFilter: function(req, file, callback) {
        if (
            file.mimetype == 'image/png' ||
            file.mimetype == 'image/jpg' ||
            file.mimetype == 'application/pdf' ||
            file.mimetype == 'text/plain'
            ) {
                callback(null, true)
        }

        else {
            console.log('only JPG, PNG, PDF, and DOC file types are supported');
        }
    },
    limits: {
        fileSize: 1024 * 1024 * 2
    }
})

module.exports = uploadMiddleware