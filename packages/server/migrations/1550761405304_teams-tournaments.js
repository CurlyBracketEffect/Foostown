exports.up = pgm => {
  pgm.sql(`
    CREATE TABLE "foostown"."teams_tournaments" (
      "tournament_id" INTEGER NOT NULL,
      "team_id" INTEGER NOT NULL,
      "points" INTEGER NOT NULL,
    );
  `)
};

// FOREIGN KEY (tournament_id) REFERENCES tournaments (id),
// FOREIGN KEY (team_id) REFERENCES teams (id)