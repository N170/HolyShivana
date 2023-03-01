const { string } = require('joi');
const mongoose = require('mongoose');

const addroomSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  capacity: {
    type: Number,
    required: true
  },
  roomNumber: {
    type: Number,
    required: true
  },
  availability: {
    type: string
   
  },
  roomPrice: {
    type: Number,
    required: true
  },
  roomType: {
    type: String,

  },
  roomImage: {
    type: String,
    required: true
  }
});

module.exports = mongoose.model('addRoom', addroomSchema);
