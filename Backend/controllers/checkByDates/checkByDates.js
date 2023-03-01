require("dotenv").config();

const { Room, Booking } = require("../../models/RoombookModel");
const {checkAvailability} = require("../../middleware/validation")

exports.checkAvailability = async (req, res) => {
    try {

        const { error } = checkAvailability(req.body);
        if (error)
            return res.send({
                status: 400,
                success: false,
                message: error.details[0].message,
            });
            
 
        const {CheckIn,CheckOut,}= req.body;
        const checkInDate = new Date(CheckIn + " " + "11:00");
        const checkOutDate = new Date(CheckOut + " " + "11:00");

        const availableRooms = await Room.find({
            bookedDates: {
                $not: {
                    $elemMatch: {
                        $or: [
                            {
                                CheckIn: {
                                    $gte: checkInDate,
                                    $lte: checkOutDate,
                                },
                            },
                            {
                                CheckOut: {
                                    $gte: checkInDate,
                                    $lte: checkOutDate,
                                },
                            },
                        ],
                    },
                },
            },
           
        
        });
          if(availableRooms.length >= 0) {
          
    
         
             
            res.send({
                status: 201,
                success: true,
                Rooms: availableRooms,
            });
        
        
        } else {

                return res.send({
                status: 400,
                success: false,
                Rooms: "Not enough rooms available",
            });
        
         
        }
   
        

   
    } catch (err) {
        console.log(err);
    }
};
