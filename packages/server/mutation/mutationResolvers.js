const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const saltRounds = 12
const crypto = require('crypto')
const Promise = require('bluebird')
const authenticate = require('../authenticate')

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
    async signup(parent, args, { req, app, postgres }) {
      const hashedPassword = await bcrypt.hash(args.input.password, 12)

      console.log('Test')
      console.log(args)

      const newUserInsert = {
        text:
          'INSERT INTO foostown.users (fullname, email, password) VALUES ($1, $2, $3) RETURNING *',
        values: [args.input.fullname, args.input.email, hashedPassword],
      }
      try {
        const userResult = await postgres.query(newUserInsert)
        const user = userResult.rows[0]
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
      } catch (e) {
        switch (true) {
          case /users_fullname_key/.test(e.message):
            throw 'An account with this username already exists.'
          case /users_email_key/.test(e.message):
            throw 'An account with this email already exists.'
          default:
            throw new Error(e)
        }
      }
    },
    async createMatch(
      parent,
      {
        input: { team_id, goals_for, goals_against, organization_id },
      },
      { req, app, postgres }
    ) {
      const client = await postgres.connect()
      try {
        await client.query('BEGIN')
        const userID = authenticate(app, req)
        const tournamentID = null
        const userTeamResult = await client.query({
          text: 'SELECT * FROM foostown.teams_users WHERE user_id = $1',
          values: [userID],
        })

        const userTeamID = userTeamResult.rows[0].team_id

        const newMatchResult = await client.query({
          text:
            'INSERT INTO foostown.matches (organization_id, tournament_id) VALUES ($1, $2) RETURNING *',
          values: [organization_id, tournamentID],
        })
        const matchID = newMatchResult.rows[0].id
        const createHomeEntryResult = await client.query({
          text:
            'INSERT INTO foostown.teams_matches (match_id, team_id, goals_for, goals_against) VALUES ($1, $2, $3, $4) RETURNING *',
          values: [matchID, userTeamID, goals_for, goals_against],
        })

        const createAwayEntryResult = await client.query({
          text:
            'INSERT INTO foostown.teams_matches (match_id, team_id, goals_for, goals_against) VALUES ($1,$2,$3,$4)',
          values: [matchID, team_id, goals_against, goals_for],
        })

        const matchResult = createHomeEntryResult.rows[0]
        await client.query('COMMIT')
        return { id: matchResult.match_id, ...matchResult }
      } catch (e) {
        client.query('ROLLBACK', err => {
          if (err) {
            throw err
          }
        })
        throw e
      }
    },
  },
}
