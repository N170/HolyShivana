const router = require("express").Router();


const priceUpdate = require("../../controllers/updateRoomPrice/updateRoomPrice")



router.put("/priceUpdate/:id", priceUpdate.priceUpdate);


module.exports = router;