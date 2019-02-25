const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const saltRounds = 12;
const crypto = require('crypto');
const Promise = require('bluebird');


module.exports => {
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
      async signup(parent, args, { req, app, postgres }) {
        console.log("Test");
        console.log(args);  
        const newUserInsert = {
          text: 'INSERT INTO foostown.users (fullname, email, password) VALUES ($1, $2, $3) RETURNING *', 
          values: [args.input.fullname, args.input.email, args.input.password],
        }
      try {
        const user = await postgres.query(newUserInsert);
        console.log(user);
        return user.rows[0];
      } catch (e) {
        switch (true) {
          case /users_fullname_key/.test(e.message):
            throw 'An account with this username already exists.';
          case /users_email_key/.test(e.message):
            throw 'An account with this email already exists.';
          default:
            throw new Error(e);
        }
      }
    },
  }
