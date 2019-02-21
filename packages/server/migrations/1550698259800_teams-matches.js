exports.up = pgm => {
  pgm.sql(`
    CREATE TABLE "foostown"."teams_matches" (
      "match_id" INTEGER NOT NULL,
      "team_id" INTEGER NOT NULL,
      "goals_for" INTEGER,
      "goals_against" INTEGER
    );
  `)
};

//NEED FOREIGN KEYS FOR match_id, team_id