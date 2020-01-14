const {Schema, model} = require('mongoose');

const employee = new Schema({
  name: {
    type: String,
    required: true
  },
  address: String,
  birth: String,
  position: String,
  salary: Number
});

module.exports = model('Employee', employee)
