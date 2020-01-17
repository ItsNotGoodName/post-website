const mongoose = require('mongoose');

const voteSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    user: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'User'
    },
    post: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'Post'
    },
    vote: {
        type: Number,
        required: true
    }
})

module.exports = mongoose.model('Vote', voteSchema);