const jwt = require('jsonwebtoken')



exports.verifyToken = (req, res, next) => {
 
  const authHeader = req.headers.authorization;

  let token
   
  if (authHeader) {
     token = authHeader.split(' ')[1]; // Extract the token from the "Bearer" string
  }
  
  if (!token) {
    return res.status(403).send({ message: "No token provided!" });
  }

  jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
    if (err) {
      return res.status(401).send({ message: "Unauthorized!" });
    }
    req.userId = decoded.id;
    console.log(req.userId);
    next();
  });
};