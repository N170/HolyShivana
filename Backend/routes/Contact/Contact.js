const router = require("express").Router();


const Contact = require("../../controllers/contactController/contact")



router.post("/Contact", Contact.Contact);


module.exports = router;