exports.up = pgm => {
  pgm.sql(`
    CREATE TABLE "foostown"."matches" (
      "id" SERIAL PRIMARY key,
      "organization_id" integer REFERENCES organizations(id) NOT NULL,
      "tournament_id" integer REFERENCES tournaments(id)
    );
  `)
};