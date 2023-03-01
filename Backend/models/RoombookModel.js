const { string, boolean } = require('joi');
const mongoose = require('mongoose');

const roomSchema = new mongoose.Schema({
  name: {
    type: String,
 
  },
  roomType:{
    type: String,
  },

  capacity: { type: String },
  roomNumber: {
    type: Number,
    required: true
  },
  availability: { type: String },

  numberOfRooms: {
    type: Number,
    min: 1,
    // required: true,
    validate: {
        validator: function(v) {
            return v % 1 === 0;
        },
        message: '{VALUE} is not a whole number'
    }
  },

  roomPrice: {
    type: Number,
    required: true
  },
  roomImage: {
    type: String,
    required: true
  },
  bookedDates: {
    type: [{
      CheckIn: { type: Date,  default: null },
      CheckOut: { type: Date,  default: null }
    }],
    default: [{ CheckIn: null, CheckOut: null }]
  }
});





const bookingSchema = new mongoose.Schema({
  roomNumber: { type: Number, required: true },
  CheckIn: { type: Date, required: true },
  CheckOut: { type: Date, required: true },
  roomType:{
    type: String,
  },
  status:{ type: String,  },
  payment_id :{ type: String,  },
  order_id:{ type: String,  },
  user: {
    name: { type: String, required: true },
    email: { type: String, },
    phone:{type: String, }
  }
});

const Room = mongoose.model('Room', roomSchema);
const Booking = mongoose.model('Booking', bookingSchema);

module.exports = { Room, Booking };