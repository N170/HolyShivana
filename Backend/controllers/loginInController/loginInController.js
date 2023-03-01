require("dotenv").config();
const User = require("../../models/userSchema")
const bcrypt = require('bcrypt');
var jwt = require('jsonwebtoken');
// const {ProductValidation} = require("../middleware/validation")
var path = require('path');




exports.login  = async (req, res) => {
  

    try{
        const { email, password } = req.body;

        // find the user by email
        User.findOne({ email }).then(user => {
          // if user not found
          if (!user) {
            return res.send({
              status: 400,
              success: false,
              error: "Email not found !"
            })
           
          }
      
          // check password
          bcrypt.compare(password, user.password).then(isMatch => {
            if (isMatch) {
              // create JWT payload
              const payload = {
                id: user.id,
                name: user.name
              };
      
              // sign token
              jwt.sign(
                payload,
                process.env.JWT_KEY,
                {
                  expiresIn:  '24h'
                },
                (err, token) => {
                  res.send({
                    status: 201,
                    success: true,
                    token: "Bearer " + token
                });
            
                }
              );
            } else {
              return res.send({
                status: 400,
                success: false,
            
                error: "Password incorrect !"
              })
        
            }
          });
        });
      



    

    }
    catch(err){
        console.log(err)

    }
}