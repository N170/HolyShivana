const router = require("express").Router();


const AddRoom = require("../../controllers/AddRoomsController/AddRoomsController")



router.post("/AddRoom", AddRoom.AddRoom);


module.exports = router;