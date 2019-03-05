const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const saltRounds = 12
const crypto = require('crypto')
const Promise = require('bluebird')
const authenticate = require('../authenticate')
const signup = require('./signup')

module.exports = {
  Mutation: {
    signup,

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
    async logout(parent, {}, { app, req, postgres }) {
      const cookieName = app.get('JWT_COOKIE_NAME')
      req.res.clearCookie(cookieName)
      return true
    },

    async createTournament(
      parent,
      {
        input: { tournament_name, available_spots },
      },
      { req, app, postgres }
    ) {
      const orgID = 1
      const status = 'open'
      const start_date = new Date().toISOString()
      const tournament = await postgres.query({
          text:
            'INSERT INTO foostown.tournaments (tournament_name, organization_id, start_date, status, available_spots) VALUES ($1, $2, $3, $4, $5) RETURNING *',
          values: [tournament_name, orgID, start_date, status, available_spots],
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
