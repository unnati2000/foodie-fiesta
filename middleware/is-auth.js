const jwt = require("jsonwebtoken");

module.exports = (req, res, next) => {
  const authHeader = req.get("Authorization");
  console.log(authHeader);
  if (!authHeader) {
    console.log("undefined h");
    req.isAuth = false;
    return next();
  }

  const token = authHeader.split(" ")[1];

  if (!token || token === "") {
    req.isAuth = false;
    return next();
  }
  let decodedToken;
  try {
    decodedToken = jwt.verify(token, "somesupersecretkey");
  } catch (error) {
    req.isAuth = false;
    return next();
  }
  if (!decodedToken) {
    req.isAuth = false;
    return next();
  }
  req.isAuth = true;
  req.userId = decodedToken;
  next();
};
