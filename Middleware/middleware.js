const jwt = require("jsonwebtoken");

const auth = (req, res, next) => {
  let token = req.headers.authorization;

  if (!token) {
    res.status(500).send({ msg: "token not found" });
  }
  jwt.verify(token, "masai", (err, decode) => {
    if (err) {
      res.status(500).send({ msg: err.message });
    }
    if (decode) {
      req.body.authId = decode.authId;
      next();
    } else {
      res.status(500).send({ msg: "Invalid token plaese check" });
    }
  });
};

module.exports = {auth};
