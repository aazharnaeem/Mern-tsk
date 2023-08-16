const jwt = require('jsonwebtoken')
const dotenv = require('dotenv');
const path = require('path');
dotenv.config({
    path: path.resolve(__dirname, '../.env')
})


const TOKEN_SECRET = process.env.TOKEN_SECRET;

const verifyToken = (req, res, next) => {
    let token = req.headers["x-access-token"];
  
    if (!token) {
      return res.status(403).send({
        message: "No token provided!"
      });
    }
  
  
  
    jwt.verify(token, TOKEN_SECRET, (err, decoded) => {
      if (err) {
        return res.status(401).send({
          message: "Unauthorized!"
        });
      }
      req.userId = decoded.id;
      next();
    });
  };
  
  
module.exports = {
    verifyToken
}