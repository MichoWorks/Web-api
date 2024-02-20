const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
  try {
    //// Fetching the Authorization header 
    const authHeader = req.headers.authorization;

    // Checking if the Authorization header exists
    if (!authHeader) {
      throw new Error('Authorization header is missing');
    }

    const arr = authHeader.split(' ');
    const token = arr[1]; 
    const user = jwt.verify(token, process.env.PRIVATE_KEY); //// Verifying the token and getting user details if token is encrypted
    req.user = user; //// Adding our request to the request and user details inside it
    next();
  } catch (error) {
    return res.status(401).json({ msg: "You Are Not AUTHORIZED" });
  }
};
