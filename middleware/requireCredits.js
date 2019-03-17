module.exports = (req, res, next) => {
  if (
    req.user.email != "jdiperi88@gmail.com" &&
    req.user.email != "sdiper17@gmail.com"
  ) {
    return res.status(500).send({ error: "You are an unauthorized user!" });
  }
  next();
};
