const { Room } = require("../../models/RoombookModel");


exports.deleteRoom = async (req, res) => {
    const roomId = req.params.id;
  
    try {
      const deletedRoom = await Room.findByIdAndDelete(roomId);
      if (!deletedRoom) {
        return res.status(404).json({ message: 'Room not found' });
      }
      res.status(200).json({ message: 'Room deleted successfully' });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Internal server error' });
    }
}