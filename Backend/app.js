const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const cors = require("cors");
const upload = require("express-fileupload");
const Contact = require("./routes/Contact/Contact")
const bookRoom = require("./routes/Roombook/Roombook")
const checkAvailability = require("./routes/checkAvailability/checkAvailability")
const AddRoom = require("./routes/AddRooms/AddRooms")
const createOrder = require("./routes/createOrder/createOrder")
const login = require("./routes/loginIn/loginIn")
const verifyUser = require("./routes/verifyToken/verifyToken")

const getRooms = require("./routes/getRoombookedorAvailability/getRoombookedorAvailability") 
const deleteRoomRouter  = require("./routes/deleteRoom/deleteRoom")
const priceUpdate = require("./routes/updateRoomPrice/updateRoomPrice")
const dashboardBookroom = require("./routes/dashboardBookroom/dashboardBookroom")



// Use body parser middleware to parse body of incoming requests
app.use(
    bodyParser.urlencoded({
        extended: true,
    })
);

app.use(bodyParser.json());
app.use(express.static('public'));
app.use('/RoomImages', express.static('RoomImages'));
app.use(upload());
app.use(cors());

// Routes which should handle requests

app.use("/api/v1",Contact)
app.use("/api/v1",bookRoom)
app.use("/api/v1",checkAvailability)
app.use("/api/v1", AddRoom)
app.use("/api/v1",createOrder)
app.use("/api/v1",login)
app.use("/api/v1",verifyUser)
app.use("/api/v1",getRooms)
app.use('/api/v1',deleteRoomRouter);
app.use('/api/v1',priceUpdate);
app.use('/api/v1/',dashboardBookroom)

   






module.exports = app;
