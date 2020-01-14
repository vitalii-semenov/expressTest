const {Schema, model} = require('mongoose');

const employee = new Schema({
  name: {
    type: String,
    required: true
  },

})