const { Room } = require("../../models/RoombookModel");

exports.priceUpdate = async (req, res) => {
  const roomId = req.params.id;
  const { roomPrice } = req.body;

  try {
    // Find the room by ID
    const room = await Room.findById(roomId);
console.log(room)
    // Update the price of the room
    room.roomPrice = roomPrice;

    // Save the updated room
    const updatedRoom = await room.save();

    res.json({ success: true, message: "Room price updated", room: updatedRoom });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Failed to update room price" });
  }
}
