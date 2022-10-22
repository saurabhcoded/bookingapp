const jwt = require("jsonwebtoken");

module.exports.verifyRoutesJwt = async (req, res, next) => {
  const token = req.headers.authorization;
  if (!token)
    return res.status(401).send({
      status: "error",
      message: "You Are not Authorized to access this pls try logging again",
    });

  try {
    const verified = jwt.verify(token, process.env.JWT_SECRET);
    req.user = verified.data;
    next();
  } catch (error) {
    res.status(404).send({ status: "error", message: "Invalid Token" });
  }
};
