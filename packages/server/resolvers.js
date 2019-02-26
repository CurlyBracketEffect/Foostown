const queryResolvers = require('./query/queryResolvers')
const mutationResolvers = require('./mutation/mutationResolvers')
const userResolvers = require('./users/userResolvers')
const teamResolvers = require('./teams/teamResolvers')


module.exports = () => {
  return {
    ...queryResolvers,
    ...mutationResolvers,
    ...userResolvers,
    ...teamResolvers,
  }
}
