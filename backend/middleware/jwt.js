const { expressjwt: jwt } = require("express-jwt");
const jwt2 = require("jsonwebtoken");

function authJwt() {
  const secret = process.env.secret;
  return jwt({
    secret,
    algorithms: ["HS256"],
    // isRevoked: revoke,
  }).unless({
    path: [
      `${process.env.API_URL}/user/login`,
      `${process.env.API_URL}/user/register`,
      `${process.env.API_URL}/otp`,
    ],
  });
}

function checkAuth(req, res, next) {
  // try {
  const token = req.headers.authorization.split(" ")[1];
  console.log(token);
  // const decoded = jwt.verify(token, process.env.secret, {
  //   clockTolerance: 60,
  //   algorithms: ["HS256"],
  // });
  // console.log(decoded);
  jwt2.verify(token, process.env.secret, (err, decoded) => {
    if (err) {
      return res.status(401).json({
        message: "Authentication failed her2e",
      });
    }
    req.UserData = decoded;
    next();
  });

  // req.UserData = decoded;
  // next();
  // } catch (error) {
  //   return res.status(401).json({
  //     message: "Authentication failed here",
  //   });
  // }
}

async function revoke(req, payload, done) {
  if (!payload.isAdmin) {
    done(null, true);
  }
  done();
}

module.exports = {
  authJwt: authJwt,
  checkAuth: checkAuth,
};
