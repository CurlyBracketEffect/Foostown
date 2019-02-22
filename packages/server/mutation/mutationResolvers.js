module.exports = () => {
  return {
    Mutation: {
      async user(parent, args, { req, app }) {
        return "Success"
      }
    }
  }
}