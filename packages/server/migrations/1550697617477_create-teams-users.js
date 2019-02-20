exports.up = pgm => {
  pgm.sql(`
    CREATE TABLE "foostown"."organizations_users" (
      "user_id" INTEGER REFERENCES users (id),
      "team_id" INTEGER
    );
  `)
};


//todo: "team_id" INTEGER REFERENCES teams (id)