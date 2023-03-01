const router = require("express").Router();


const bookRoom = require("../../controllers/RoombookController/RoombookController")



router.post("/bookroom", bookRoom.bookRoom);


module.exports = router;