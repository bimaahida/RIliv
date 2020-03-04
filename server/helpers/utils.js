const jwt = require('jsonwebtoken');
const secret = 'TestRilivBackendDeveloper';

function errorHandler(respon) {
  return {
    status: false,
    message: respon,
  }
}

function successHandler(respon) {
  return {
    status: true,
    data: respon
  }
}

async function checkToken(token) {
  if (!token) return false;

  token = token.split(' ');
  return a = jwt.verify(token[1], secret, function(err) {
    if (!err) {
      return true;
    }
    return false;
  });
}

module.exports = {
  errorHandler,
  successHandler,
  checkToken
}