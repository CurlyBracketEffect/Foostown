const authenticate = require('../authenticate')

//if there a user only belongs to one team
module.exports = {
  User: {
    async teams(user, args, { req, postgres }, info) {
      authenticate()

      const allUsersTeamIDsQuery = {
        text: "SELECT * FROM foostown.teams_users WHERE team_id = $1",
        values: [user.id]
      };

      const allUsersTeamIDs = await postgres.query(allUsersTeamIDsQuery);

      const teamsArrayQuery = {
        text: "SELECT * FROM foostown.teams WHERE id = $1",
        values: [allUsersTeamIDs.rows[0].team_id]
      };

      const teamsArray = await postgres.query(teamsArrayQuery);

      return teamsArray.rows;
    }
  }
};

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
