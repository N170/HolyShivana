require("dotenv").config();
const fs = require('fs');
const { Room } = require("../../models/RoombookModel");
var path = require('path');




exports.AddRoom = async (req, res) => {
  

    try{

      var filename = path.basename('../../RoomImages');

  
      
   
      const image = req.files.Image;
  
const imageData = image.data;
const imageName = image.name;

fs.writeFile(`${filename}/${imageName}`, imageData, (err,data) => {
  if (err) {
    
    console.error(err);
    return res.send({
      status: 500,
      success: false,
  
  });

  }
  else{

    const newRoom = new Room({
      roomType: req.body.roomType,
      capacity: req.body.capacity,
      roomNumber: req.body.roomNumber,
      availability: req.body.availability,
      roomPrice: req.body.Price,
      roomImage:`${filename}/${imageName}`
      
    });
    console.log(newRoom)
  
    newRoom.save((error, room) => {
     
      if (error) {
        console.log(error.message)
        return res.send({
          status: 500,
          success: false,
          message: error.message
      });
     
      } else {
            
        res.send({
          status: 201,
          success: true,
          Rooms:room,
      });
      
      }
    });


  }

 
});
   








    

    }
    catch(err){
        console.log(err)

    }
}