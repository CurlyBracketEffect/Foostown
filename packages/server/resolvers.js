const queryResolvers = require('./query/queryResolvers')
const mutationResolvers = require('./mutation/mutationResolvers')
const userResolvers = require('./users/userResolvers')
const teamResolvers = require('./teams/teamResolvers')
const organizationResolvers = require('./organization/organizationResolvers')

const { DateTime } = require ('@okgrow/graphql-scalars')


module.exports = () => {
  return {
    DateTime,
    ...queryResolvers,
    ...mutationResolvers,
    ...userResolvers,
    ...teamResolvers,
    ...organizationResolvers,
  }
}
