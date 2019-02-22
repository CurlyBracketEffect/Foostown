module.exports = {
  Query: {
    async user(parent, { id }, { req }, info) {

      const findUserQuery = {
        text: 'SELECT * FROM users WHERE id = $1',
        values: [id] 
      }
      
      const user = await postgres.query(findUserQuery);
      return user.rows[0];
    },
  }
};
