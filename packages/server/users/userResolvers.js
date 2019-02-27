const authenticate = require('../authenticate')

//if there a user only belongs to one team
module.exports = {
  User: {
    async teams(user, args, { app, req, postgres }, info) {
      authenticate(app, req)

      const allUsersTeamIDsQuery = {
        text: "SELECT * FROM foostown.teams_users WHERE user_id = $1",
        values: [user.id]
      };

      const allUsersTeamIDs = await postgres.query(allUsersTeamIDsQuery)

      const teamsArrayQuery = {
        text: 'SELECT * FROM foostown.teams WHERE id = $1',
        values: [allUsersTeamIDs.rows[0].team_id],
      }

      const teamsArray = await postgres.query(teamsArrayQuery)

      return teamsArray.rows
    },
    async stats(user, args, { app, req, postgres }, info) {
      authenticate(app, req)

      const userStats = await postgres.query({
        text: `
          SELECT
          SUM(teams_matches.goals_for) AS goals_for,
          SUM(teams_matches.goals_against) AS goals_against,
          COUNT(teams_matches.match_id) AS matches_played
          FROM foostown.teams_users AS teams_users
          LEFT JOIN foostown.teams_matches AS teams_matches
          ON teams_users.team_id = teams_matches.team_id 
          WHERE teams_users.user_id = $1
        `,
        values: [user.id],
      })

      if(userStats.rows[0].matches_played === '0'){
        return{
          goals_for: 0,
          goals_against: 0,
          matches_played: 0,
        }
      }

      return userStats.rows[0]
    },
  },
}

//if a user belongs to multiple teams
// module.exports = {
//   User: {
//     async teams(user, args, { req, postgres }, info) {
//       // console.log("user: ", user)
//       const allUsersTeamsQuery = {
//         text: "SELECT * FROM foostown.teams_users WHERE team_id = $1",
//         values: [user.id]
//       };

//       const allTeams = await postgres.query(allUsersTeamsQuery);
//       console.log(allTeams.rows);

//       const teamIDsArray = await allTeams.rows.map(async team => {
//         console.log(team.team_id);

//         const teamsArrayQuery = {
//           text: "SELECT * FROM foostown.teams WHERE team_id = $1",
//           values: [team.team_id]
//         };

//         const teamsArray = await postgres.query(teamsArrayQuery);
//         console.log("teamsArray", teamsArray);

//         return teamsArray;
//       });

//       console.log("teamIDsArray", teamIDsArray);
//       return teamIDsArray;
//     }
//   }
// };
