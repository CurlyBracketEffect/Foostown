exports.up = pgm => {
  pgm.sql(`
    CREATE TABLE "foostown"."elimination_nodes" (
      "id" SERIAL PRIMARY KEY,
      "round" INTEGER NOT NULL,
      "position" INTEGER NOT NULL,
      "tournament_id" INTEGER NOT NULL,
      "match_id" INTEGER NOT NULL,
      "team_id" INTEGER NOT NULL,
      UNIQUE ("round", "position", "tournament_id")
    );
  `)
};

//NEED FOREIGN KEYS FOR tournament_id, match_id, team_id