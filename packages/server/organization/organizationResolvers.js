const authenticate = require('../authenticate')

module.exports = {
  Organization: {
    async users(parent, { id }, { app, req, postgres }, info) {
      authenticate(app, req)
      
      const findUsersQuery = {
        text: 'SELECT * FROM foostown.users',
        values: [],
      }

      const users = await postgres.query(findUsersQuery)

      return users.rows
    },
  },
}