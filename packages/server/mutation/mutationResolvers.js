const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const saltRounds = 12;
const crypto = require('crypto');
const Promise = require('bluebird');


module.exports = () => {
  function setCookie({ tokenName, token, res }) {
    res.cookie(tokenName, token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
    });
  }
  function generateToken({ id }, secret, csrfToken) {
    const payload = {
      userID: id,
      csrfToken,
      exp: Math.floor(Date.now() / 1000) + 2 * (60 * 60)
    }
    return jwt.sign(payload, secret);
  }
  return {
    Mutation: {
      
    }
  }
}