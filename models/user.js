const {Schema, model} = require('mongoose')

const userSchema = new Schema({
    login: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    token: {
        type: String
    }
})

module.exports = model('User', userSchema)