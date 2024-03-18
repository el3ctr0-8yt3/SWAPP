const { expressjwt: jwt } = require("express-jwt");

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
    ],
  });
}

async function revoke(req, payload, done) {
  if (!payload.isAdmin) {
    done(null, true);
  }
  done();
}

module.exports = authJwt;
