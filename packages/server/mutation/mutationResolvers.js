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
    async signup(
      parent,
      {
        input: { fullname, email, password },
      },
      { req, app, postgres }
    ) {
      const hashedPassword = await bcrypt.hash(password, 12)
      const emailLowerCase = email.toString().toLowerCase()
      const orgID = 1

      const newUserInsert = {
        text:
          'INSERT INTO foostown.users (fullname, email, password) VALUES ($1, $2, $3) RETURNING *',
        values: [fullname, emailLowerCase, hashedPassword],
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

        //Set role for the User in the Org
        const isAdmin = false
        const setRoleForUser = await postgres.query({
          text: 'INSERT INTO foostown.organizations_users (organization_id, user_id, is_admin) VALUES ($1, $2, $3) RETURNING *',
          values: [orgID, userId, isAdmin],
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
      const emailLowerCase = email.toString().toLowerCase()
      //Get User And Password For Verification
      const findUserQuery = {
        text: 'SELECT * FROM foostown.users WHERE email = $1',
        values: [emailLowerCase],
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
        return matchResult
      } catch (e) {
        client.query('ROLLBACK', err => {
          if (err) {
            throw err
          }
        })
        throw e
      }
    },


    async createTournament(
      parent,
      {
        input: { tournament_name },
      },
      { req, app, postgres }
    ) {
      const orgID = 1
      const status = 'open'
      const start_date = new Date().toISOString()
      const tournament = await postgres.query({
          text:
            'INSERT INTO foostown.tournaments (tournament_name, organization_id, start_date, status) VALUES ($1, $2, $3, $4) RETURNING *',
          values: [tournament_name, orgID, start_date, status],
        })
      return tournament.rows[0]
    },


    async closeTournament(
      parent, 
      {
        id,
      },
      { req, app, postgres }
    ) {
      const end_date = new Date().toISOString()
      const status = 'closed'
      const updateTournamentStatus = await postgres.query({
          text:
            'UPDATE foostown.tournaments SET end_date=$1, status=$2 WHERE id=$3 RETURNING *',
          values: [end_date, status, id],
        })
      console.log()
      console.log(end_date)
      console.log(status)
      console.log(updateTournamentStatus)
      return updateTournamentStatus.rows[0]
    },

  },
}
