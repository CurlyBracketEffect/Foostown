const authenticate = require('../authenticate')

module.exports = {
  Query: {
    async user(parent, { id }, { app, req, postgres }, info) {
      authenticate(app, req)
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
    async organization(parent, { id }, { app, req, postgres }, info) {
      authenticate(app, req)
      const findOrgQuery = {
        text: 'SELECT * FROM foostown.organizations WHERE id = $1',
        values: [id],
      }

      const org = await postgres.query(findOrgQuery)

      if (org.rows.length < 1) {
        throw 'Organization does not exist'
      }
      return org.rows[0]
    },

    async viewer(parent, args, { req, app, postgres }) {
      const userID = authenticate(app, req)

      const findUserQuery = {
        text: 'SELECT * FROM foostown.users WHERE id = $1',
        values: [userID],
      }

      const user = await postgres.query(findUserQuery)
      return user.rows[0]
    },
  },
}
