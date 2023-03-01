const router = require("express").Router();


const getRooms = require("../../controllers/getRoombookedorAvailability/getRoombookedorAvailability")



router.get("/getRooms", getRooms.getRooms);


module.exports = router;