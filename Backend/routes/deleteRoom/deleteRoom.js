const router = require("express").Router();


const deleteRoom  = require("../../controllers/deleteRoom/deleteRoom")



router.delete("/roomDelete/:id", deleteRoom .deleteRoom );


module.exports = router;