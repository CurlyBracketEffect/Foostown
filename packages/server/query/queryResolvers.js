const authenticate = require('../authenticate')

module.exports = {
  Query: {
    async user(parent, { id }, { req, postgres }, info) {
      authenticate()
      const findUserQuery = {
        text: 'SELECT * FROM foostown.users WHERE id = $1',
        values: [id],
      }

      const user = await postgres.query(findUserQuery)

      if (user.rows.length < 1) {
        throw 'User does not exist'
      }
      return user.rows[0]
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
  },
}
