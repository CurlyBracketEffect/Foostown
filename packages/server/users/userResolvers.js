
module.exports = app => {
  return {
    User: {
      async gamesPlayed(user, { id }, { req }, info) {

        const gamesPlayedQuery = {
          text: 'SELECT * FROM teams_matches WHERE team_id = $1',
          values: [id] 
        }
        
        const games = await postgres.query(gamesPlayedQuery);
        return games.rows[0]; //not sure about this
      },
    }
  };
};