const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    username: {
        required: true,
        type: String
    },
    password: {
        required: true,
        type: String
    },
    date: {
        type: Date,
        default: () => Date.now()
    },
    vote: {
        type: Number,
        default: 0
    }
})

module.exports = mongoose.model('User', userSchema);