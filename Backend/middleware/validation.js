const joi = require("joi");

function ContactValidation(data) {
    const schema = joi.object({
        email: joi.string().email().required(),
        name: joi.string().required(),
        phoneNumber:joi.number().allow(null).allow('').optional(),
        message:joi.string().allow(null).allow('').optional(),
      
    });


    return schema.validate(data);
  }


  function checkAvailability(data) {
    const schema = joi.object({
      CheckIn: joi.string().required(),
      CheckOut: joi.string().required(),
      room:joi.number().required(),
      
    });


    return schema.validate(data);
  }




  function RoomDataValidation(data) {
    const schema = joi.object({
      razorpay_payment_id: joi.string().required(),
      razorpay_order_id: joi.string().required(),
      razorpay_signature: joi.string().required(),
      roomData: joi.object({
        roomPrice: joi.number().required(),
        roomType: joi.string().required(),
        roomNumber: joi.array().items(joi.string()).required(),
        CheckIn: joi.string().required(),
        CheckOut: joi.string().required(),
        user: joi.object({
          name: joi.string().required(),
          email: joi.string().email().required(),
          phone: joi.string().required()
        }).required()
      }).required()
    });
  
    return schema.validate(data);
  }
  



    

    



  module.exports = { 
 
    ContactValidation,
    checkAvailability,
    RoomDataValidation

   
  
  };