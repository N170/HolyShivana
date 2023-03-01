const router = require("express").Router();


const login = require("../../controllers/loginInController/loginInController")



router.post("/login", login.login);


module.exports = router;