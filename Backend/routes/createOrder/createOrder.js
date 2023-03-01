const router = require("express").Router();


const createOrder = require("../../controllers/createOrderController/createOrder")



router.post("/createOrder", createOrder.createOrder);


module.exports = router;