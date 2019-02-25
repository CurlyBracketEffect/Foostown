const express = require('express');
const cookieParser = require('cookie-parser');
const chalk = require('chalk');
const cors = require('cors');
const path = require('path');
const { Pool } = require('pg');
const { ApolloServer } = require('apollo-server-express');
const { apolloUploadExpress } = require('apollo-upload-server');
const { makeExecutableSchema } = require('graphql-tools');

const typeDefs = require('./schema');
let resolvers = require('./resolvers');

const app = express();
const PORT = process.env.PORT || 8080;
app.set('PORT', process.env.PORT || 8080);
app.set('PG_HOST', process.env.PG_HOST || 'localhost');
app.set('PG_USER', process.env.PG_USER || 'postgres');
app.set('PG_PASSWORD', process.env.PG_PASSWORD || '');
app.set('PG_DB', process.env.PG_DB || 'postgres');
app.set('JWT_SECRET', process.env.JWT_SECRET || 'DEV_SECRET');

app.set('JWT_COOKIE_NAME', 'token');
app.use(cookieParser());

if (process.env.NODE_ENV === 'production') {
  const root = path.resolve(__dirname, '../public');

  // Serve the static front-end from /public when deployed
  app.use(express.static(root));
  app.use(fallback('index.html', { root }));
}

if (process.env.NODE_ENV !== 'production') {
  // Allow requests from dev server address
  const corsConfig = {
    origin: 'http://localhost:3000',
    credentials: true
  };
  app.set('CORS_CONFIG', corsConfig);

  // Allow requests from dev server address
  app.use(cors(corsConfig));
}

const postgres = new Pool({
  user: app.get('PG_USER'), 
  host: app.get('PG_HOST'),
  database: app.get('PG_DB'),
  password: app.get('PG_PASSWORD'),
  idleTimeoutMillis: 30000,
  connectionTimeoutMillis: 2000,
});

resolvers = resolvers();

const schema = makeExecutableSchema ({
  typeDefs,
  resolvers,
})

const apolloServer = new ApolloServer({
  context: ({ req }) => {
    return {
      app,
      req,
      postgres,
    }
  },
  schema,
});

apolloServer.applyMiddleware({
  app,
  uploads:true,
  cors: app.get('CORS_CONFIG'),
  uploads: apolloUploadExpress({
    maxFileSize: 10000000
  })
})

postgres.on('error', (err, client) => {
  console.error('Unexpected error on idle postgres client', err);
  process.exit(-1);
});

const server = app.listen(PORT, () => {
  console.log(`>> ${chalk.blue('Express running:')} http://localhost:${PORT}`);

  console.log(
    `>> ${chalk.magenta('GraphQL playground:')} http://localhost:${PORT}/graphql`
  );
})

server.on('error', err => {
  console.log(err);
});