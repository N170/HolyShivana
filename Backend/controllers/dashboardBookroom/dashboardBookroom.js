const { Room, Booking } = require("../../models/RoombookModel");

exports.dashboardBookroom = async (req, res) => {
  try {

console.log(req.body.user.fullName)
   const {
                roomNumber,
                numberOfRooms,
                roomPrice,
                user,
                CheckIn,
                CheckOut,
            } = req.body

    const reservation = new Booking({
        CheckIn: new Date(CheckIn),
        CheckOut: new Date(CheckOut),
        roomNumber,
        numberOfRooms:numberOfRooms,
        roomPrice:roomPrice,
        status: "Pending",
    
     
        user: {
          name:req.body.user.fullName,
          email:req.body.user.email
         
        },
     
      });

      reservation.save((err, savedReservation) => {
        if (err) {
          return res.status(500).json({ message: err.message });
        }
        res.status(201).json({ reservation: savedReservation });
      });
  } catch (err) {
    console.log(err);
  }
};
