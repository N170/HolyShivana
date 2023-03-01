const { Room, Booking } = require("../../models/RoombookModel");



exports.getRooms = async (req, res) => {



    try {
      const rooms = await Room.find();

  
      res.status(200).json({ 
        success: true, 
        message: 'Rooms retrieved successfully.', 
        rooms,
    
      });
    } catch (error) {
      res.status(500).json({ success: false, message: 'Error retrieving rooms.', error });
    }
  
  

  
  }
