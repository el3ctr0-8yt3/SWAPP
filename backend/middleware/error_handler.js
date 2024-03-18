function error_handler(err, req, res, next) {
  if (err.name === "UnauthorizedError") {
    return res.status(401).json({ message: "The user is not authorized" });
  }
  if (err.name === "ValidationError") {
    return res.status(401).json({ message: err });
  }
  return res.status(500).json({message: err, add: "wtf"});
}

module.exports = error_handler;