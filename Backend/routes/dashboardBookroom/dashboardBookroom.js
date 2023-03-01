const router = require("express").Router();


const dashboardBookroom = require("../../controllers/dashboardBookroom/dashboardBookroom")



router.post("/dashboardBookroom", dashboardBookroom.dashboardBookroom);


module.exports = router;