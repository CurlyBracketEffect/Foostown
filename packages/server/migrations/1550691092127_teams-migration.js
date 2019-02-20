exports.up = pgm => {
  pgm.sql(`
    CREATE TABLE "foostown"."teams" (
      "id" SERIAL PRIMARY KEY,
      "team_name" TEXT NOT NULL,
      "organization_id" TEXT NOT NULL,
      UNIQUE(team_name, organization_id)
    );
  `)
};
