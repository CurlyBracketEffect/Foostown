exports.up = pgm => {
  pgm.sql(`
    CREATE TABLE "foostown"."teams_users" (
      "user_id" INTEGER FOREIGN KEY REFERENCES users (id) NOT NULL,
      "team_id" INTEGER FOREIGN KEY REFERENCES teams (id) NOT NULL
    );
  `)
};