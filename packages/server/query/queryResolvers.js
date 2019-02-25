module.exports = () => {
  return {
    Query: {
      async user(parent, args, { req, app }) {
        return "Success";
      }
    }
  }
}