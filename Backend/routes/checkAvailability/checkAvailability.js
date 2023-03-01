const router = require("express").Router();


const checkAvailability = require("../../controllers/checkAvailability/checkAvailability")



router.post("/checkAvailability", checkAvailability.checkAvailability);


module.exports = router;