const authenticate = require('../authenticate')

module.exports = {
  Team: {
    async matches(team, args, { app, req, postgres }, info) {
      authenticate(app, req)

      const matchesPlayedQuery = {
        text: 'SELECT * FROM foostown.teams_matches WHERE team_id = $1',
        values: [team.id] 
      }

      const matches = await postgres.query(matchesPlayedQuery);
      
      return matches.rows; 
    },
  }
};