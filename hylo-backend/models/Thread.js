/**
 * The categories in the Thread Schema are not finalized yet
 * it may change in the future depending on the dev requirements
 */
const mongoose = require('mongoose')

const ThreadSchema = new mongoose.Schema({
    category: {
        type: String,
        enum: ['GENERAL', 'LECTURES', 'PRACTICALS', 'QUIZZES', 'ASSIGNMENTS', 'FINAL EXAM'],
        required: [true, 'every thread needs a category']
    },

})




module.exports = mongoose.model('Thread', ThreadSchema)