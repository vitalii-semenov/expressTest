const {Schema, model} = require('mongoose')

const person = new Schema({
    price: {
        type: Number,
        required: true
    },
    name: String
})

module.exports = model('Person', person)