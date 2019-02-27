module.exports = {
  Query: {
    async user(parent, args, { req, app }) {
      return 'Success'
    },

    async viewer(parent, args, { req, app, postgres }) {
      const userID = authenticate(app, req)

      const findUserQuery = {
        text: 'SELECT * FROM foostown.users WHERE id = $1',
        values: [args.input.id],
      }

      const user = await postgres.query(findUserQuery)
      return user.rows[0]
    },

    async teams (parent, args, { req, app, postgres }) {
      const userID = authenticate(app, req)

      const teams = await postgres.query({
        text: 'SELECT * FROM foostown.teams',
        values: [userID],
      })
      return teams.rows
    },
  },
}
