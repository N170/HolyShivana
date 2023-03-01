require("dotenv").config();

const nodemailer = require("nodemailer");
const crypto = require("crypto");

const { Room, Booking } = require("../../models/RoombookModel");
const {RoomDataValidation} = require("../../middleware/validation")

exports.bookRoom = async (req, res) => {

    try {
        const { error } = RoomDataValidation(req.body);
        if (error)
            return res.send({
                status: 400,
                success: false,
                message: error.details[0].message,
            });


        let body =
            req.body.razorpay_order_id + "|" + req.body.razorpay_payment_id;

        var expectedSignature = crypto
            .createHmac("sha256", process.env.KEY_SECRET)
            .update(body.toString())
            .digest("hex");
        if (expectedSignature !== req.body.razorpay_signature) {
            return res.status(401).json({ message: "Invalid signature" });
        }

        var response = { signatureIsValid: "false" };
        if (expectedSignature === req.body.razorpay_signature) {
            const {
                roomNumber,
                roomType,
                user,
                CheckIn,
                CheckOut,
            } = req.body.roomData;

            const roomNumbers = roomNumber.map((room) =>
                parseInt(room.replace(/\D/g, ""))
            );

            const cleanedRoomNumber = roomNumber.map((name) => name.trim());

            const userCheckInDate = new Date(CheckIn + " " + "11:00");
            const userCheckOutDate = new Date(CheckOut + " " + "11:00");

            await Room.updateMany(
                { name: { $in: cleanedRoomNumber } },
                {
                    $set: { booked: true },
                    $push: {
                        bookedDates: {
                            CheckIn: userCheckInDate,
                            CheckOut: userCheckOutDate,
                        },
                    },
                },
                { new: true }
            ).then((response) => {
                let bookingPromises = [];

                roomNumbers.forEach((roomNumber) => {
                    const cleanedRoomNumber = Number(roomNumber);
                    if (isNaN(cleanedRoomNumber)) {
                        console.log(`Invalid room number ${roomNumber}`);
                        return;
                    }
                    const booking = new Booking({
                        payment_id: req.body.razorpay_payment_id,
                        order_id: req.body.razorpay_order_id,
                        status: "successful",
                        roomType: roomType,
                        roomNumber: cleanedRoomNumber,
                        CheckIn: userCheckInDate,
                        CheckOut: userCheckOutDate,
                        user: req.body.roomData.user,
                    });
                    bookingPromises.push(booking.save());
                });
                Promise.all(bookingPromises)
                    .then((result) => {
                        console.log(`All bookings saved successfully`);
                        let transporter = nodemailer.createTransport({
                            service: "gmail",
                            auth: {
                                user: process.env.EMAIL,
                                pass: process.env.PASS,
                            },
                        });
                        // Send email to user
                        let mailOptions = {
                            from:
                                '"Holy Shivana" <holyshivanarishikesh@gmail.com>',
                            to: req.body.roomData.user.email,
                            subject: "Room Booking Confirmation",
                            text:
                                "Thank you for booking rooms. Your booking details are: Room Type: " +
                                roomType +
                                " Number of Rooms: " +
                                roomNumbers.length +
                                " Check-In: " +
                                userCheckInDate +
                                " Check-Out: " +
                                userCheckOutDate,
                            html:
                                "<b>Thank you for booking rooms. Your booking details are: Room Type: " +
                                roomType +
                                " Number of Rooms: " +
                                roomNumbers.length +
                                " Check-In: " +
                                userCheckInDate +
                                " Check-Out: " +
                                userCheckOutDate +
                                "</b>",
                        };
                        transporter.sendMail(mailOptions, (error, info) => {
                            if (error) {
                                console.log(error);
                            } else {
                                console.log(
                                    "Email sent to user: " + info.response
                                );
                                // Send email to hotel
                                let mailOptions = {
                                    from:
                                        '"Holy Shivana" <holyshivanarishikesh@gmail.com>',
                                    to: "hotel@email.com",
                                    subject: "New Room Booking",
                                    text:
                                        "A new room has been booked by " +
                                        req.body.roomData.user.name +
                                        " for Room Type: " +
                                        roomType +
                                        " Number of Rooms: " +
                                        roomNumbers.length +
                                        " Rooms: " +
                                        roomNumbers.join(", ") +
                                        " Check-In: " +
                                        userCheckInDate +
                                        " Check-Out: " +
                                        userCheckOutDate,
                                    html:
                                        "<b>A new room has been booked by " +
                                        req.body.roomData.user.name +
                                        " for Room Type: " +
                                        roomType +
                                        " Number of Rooms: " +
                                        roomNumbers.length +
                                        " Rooms: " +
                                        roomNumbers.join(", ") +
                                        " Check-In: " +
                                        userCheckInDate +
                                        " Check-Out: " +
                                        userCheckOutDate +
                                        "</b>",
                                };
                                transporter.sendMail(
                                    mailOptions,
                                    (error, info) => {
                                        if (error) {
                                            console.log(error);
                                        } else {
                                            console.log(
                                                "Email sent to hotel: " +
                                                    info.response
                                            );
                                            res.send({
                                                status: 201,
                                                success: true,
                                                message: "Booking successful",
                                            });
                                        }
                                    }
                                );
                            }
                        });
                    })
                    .catch((err) => {
                        return res.status(500).send(err);
                    });
            });
        }
    } catch (error) {
        console.error(error);
    }
};
