module.exports = {
  Team: {
    async matches(team, args, { req, postgres }, info) {
      const matchesPlayedQuery = {
        text: 'SELECT * FROM foostown.teams_matches WHERE team_id = $1',
        values: [team.id] 
      }

      const matches = await postgres.query(matchesPlayedQuery);
      
      return matches.rows; 
    },
  }
};