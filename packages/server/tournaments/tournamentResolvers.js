const authenticate = require('../authenticate')

module.exports = {
  Tournament: {
    async teams(parent, { id }, { app, req, postgres }, info) {
      authenticate(app, req)

      const findTeamsQuery = {
        text: `
          SELECT teams_tournaments.tournament_id, teams_tournaments.points, teams.* 
          FROM foostown.teams_tournaments as teams_tournaments 
          INNER JOIN foostown.teams AS teams
          ON teams_tournaments.team_id = teams.id 
          WHERE teams_tournaments.tournament_id = $1`,
        values: [parent.id],
      }

      const teams = await postgres.query(findTeamsQuery)
      return teams.rows
    },
  },
}
