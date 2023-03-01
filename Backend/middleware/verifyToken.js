const jwt = require("jsonwebtoken");
require("dotenv").config();

const verifyUser = (req, res, next) => {


  const authHeader = req.body.token;
  

  if (!authHeader) {
 
    return res.status(401).send('Unauthorized: No token provided');
  }

  // const realToken = authHeader.replace(/["']/g, "")
  // const Token = realToken.split(' ')[1];
  const realToken = authHeader.split(' ')[1];
  
  try {
    

    const decoded = jwt.verify(realToken, process.env.JWT_KEY);
    req.user = decoded;
   if(req.user){

    return res.send({
      status: 201,
       message: "verify"
    });
   }
    // next();
  } catch (error) {
  
    res.status(401).send('Unauthorized: Invalid token');
  }
};

module.exports = { verifyUser };
