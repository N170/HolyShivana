require("dotenv").config();
const {ContactValidation} = require("../../middleware/validation")

const nodemailer = require('nodemailer');

exports.Contact = async (req,res)=>{

try {

  
    const { error } = ContactValidation(req.body);
    if (error)
        return res.send({
            status: 400,
            success: false,
            message: error.details[0].message,
        });
        

        let mailTransporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
              user: process.env.EMAIL,
              pass: process.env.PASS,
            }
        });


     
         
        let mailDetails = {
            from: `${req.body.email}`,
            to: 'holyshivanarishikesh@gmail.com',
            subject: 'contact email',
            html:`<!DOCTYPE html>
            <html>
              <head> </head>
            
              <body>
                <table width="500"
                  style="
                    width: 500px;
                    text-align: center;
                    margin: 0 auto;
                  
                  "
                  cellpadding="0"
                  cellspacing="0"
                >
                  <tr >
                    <td width="500" >
                    <h4>New contact us message.</h4>
                    </td>
                  </tr>
                  <tr>
                    <td style="background: #ffffff"><br /><br /></td>
                  </tr>
                  <tr>
                    <td style="background: #ffffff; color: grey; text-align: left">
                     Name: ${req.body.name}</br>
                    Email: ${req.body.email}</br>
                    Messsage: ${req.body.message}.</br>
                    PhoneNumber:${req.body.phoneNumber}.</br><br>
                      Thank you 
                    
                    </td>
                  </tr>
                  <tr>
                    <td style="background: #ffffff"><br /><br /></td>
                  </tr>
                  <tr>
                    <td style="background: #ffffff; border-top: 1px solid #8d9696">
                      <br />
                    </td>
                  </tr>
                  <tr>
                    <td
                      style="
                        background: #ffffff;
            
                        font-size: 10px;
                        color: grey;
                      "
                    >
                      Copyright &#169; 2022 ALL RIGHTS RESERVED HOLY SHIVANA.
                    </td>
                  </tr>
                </table>
              </body>
            </html>`,
         
        };
         
        mailTransporter.sendMail(mailDetails, function(err, data) {
            if(err) {
                console.log(err);
                res.send({
                  status: 400,
                  success: false,
                  message: "not able to send email",
              });
            } else {
              res.send({
                status: 201,
                success: true,
                message: "submitted successfully!",
            });
            }
        });


}
catch (err){

    console.log(err)
}


}