
require("dotenv").config();
const Razorpay =  require("razorpay")
const { Room } = require("../../models/RoombookModel")

var instance = new Razorpay({
    key_id: process.env.KEY_ID,
    key_secret: process.env.KEY_SECRET,
  });

  exports.createOrder = async (req, res) => {
    const {roomPrice } = req.body;

    let orderDate = {
        "amount":roomPrice * 100 ,
        "currency": "INR",
        "receipt": "receipt",
        "payment_capture": 1,
    
      };

      instance.orders.create(orderDate, function(err, order) {
        // console.log(order)
        res.send({
          status: 201,
          order
      });
     


      });
  
  }