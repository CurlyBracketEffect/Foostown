exports.up = pgm => {
  pgm.sql(`
    CREATE TABLE "foostown"."teams_users" (
      "user_id" INTEGER REFERENCES users (id) NOT NULL,
      "team_id" INTEGER INTEGER REFERENCES teams (id) NOT NULL
    );
  `)
};