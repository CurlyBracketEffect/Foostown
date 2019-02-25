module.exports = {
  Query: {
    async user(parent, { id }, { req, postgres }, info) {

      const findUserQuery = {
        text: 'SELECT * FROM foostown.users WHERE id = $1',
        values: [id] 
      }
      
      const user = await postgres.query(findUserQuery);
      return user.rows[0];
    },
  }
};
