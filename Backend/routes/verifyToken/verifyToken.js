const router = require("express").Router();


const verifyUser = require("../../middleware/verifyToken")



router.post("/verifyUser", verifyUser.verifyUser);


module.exports = router;