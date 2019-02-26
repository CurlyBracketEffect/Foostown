const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const saltRounds = 12
const crypto = require('crypto')
const Promise = require('bluebird')

function setCookie({ tokenName, token, res }) {
  res.cookie(tokenName, token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
  })
}
function generateToken({ id }, secret, csrfToken) {
  const payload = {
    userID: id,
    csrfToken,
    exp: Math.floor(Date.now() / 1000) + 2 * (60 * 60),
  }
  return jwt.sign(payload, secret)
}

module.exports = {
  Mutation: {
    async signup(
      parent,
      {
        input: { fullname, email, password },
      },
      { req, app, postgres }
    ) {
      const hashedPassword = await bcrypt.hash(password, 12)
      const orgID = 1

      const newUserInsert = {
        text:
          'INSERT INTO foostown.users (fullname, email, password) VALUES ($1, $2, $3) RETURNING *',
        values: [fullname, email, hashedPassword],
      }

      const client = await postgres.connect()

      try {
        // Begin postgres transaction
        await client.query('BEGIN')

        //Create New User
        const userResult = await postgres.query(newUserInsert)
        const user = userResult.rows[0]
        const csrfTokenBinary = await Promise.promisify(crypto.randomBytes)(32)
        const csrfToken = Buffer.from(csrfTokenBinary, 'binary').toString('base64')
        setCookie({
          tokenName: app.get('JWT_COOKIE_NAME'),
          token: generateToken(user, app.get('JWT_SECRET'), csrfToken),
          res: req.res,
        })

        //Create New Team
        const team = await postgres.query({
          text:
            'INSERT INTO foostown.teams (team_name, organization_id) VALUES ($1, $2) RETURNING *',
          values: [email, orgID],
        })

        //Assign the Team for the User
        const userId = user.id
        const teamId = team.rows[0].id
        const assignTeamForUser = await postgres.query({
          text: 'INSERT INTO foostown.teams_users (user_id, team_id) VALUES ($1, $2) RETURNING *',
          values: [userId, teamId],
        })

        // Commit the entire transaction!
        await client.query('COMMIT')
        console.log(user)
        return {
          user,
          csrfToken,
        }
      } catch (e) {
        // Something went wrong
        client.query('ROLLBACK', err => {
          if (err) {
            throw err
          }
          // release the client back to the pool
        })
        throw e
      }
    },

    async login(
      parent,
      {
        input: { email, password },
      },
      { req, app, postgres }
    ) {
      //Get User And Password For Verification
      const findUserQuery = {
        text: 'SELECT * FROM foostown.users WHERE email = $1',
        values: [email],
      }
      const userResult = await postgres.query(findUserQuery)
      const user = userResult.rows[0]
      if (!user) throw 'User was not found.'
      console.log(user)

      // -------------------------------
      if (user == null) throw 'User was not found.'
      const valid = await bcrypt.compare(password, user.password)
      if (!valid) throw 'Incorrect user or email.'

      const csrfTokenBinary = await Promise.promisify(crypto.randomBytes)(32)
      const csrfToken = Buffer.from(csrfTokenBinary, 'binary').toString('base64')

      setCookie({
        tokenName: app.get('JWT_COOKIE_NAME'),
        token: generateToken(user, app.get('JWT_SECRET'), csrfToken),
        res: req.res,
      })

      return {
        user,
        csrfToken,
      }
    },
  },
}
