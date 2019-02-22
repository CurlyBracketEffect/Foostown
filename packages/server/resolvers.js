const queryResolvers = require('./query/queryResolvers')
const mutationResolvers = require('./mutation/mutationResolvers')
const userResolvers = require('./users/userResolvers')

module.exports = () => {
  return {
    ...queryResolvers,
    ...mutationResolvers,
    ...userResolvers,
  }
}
