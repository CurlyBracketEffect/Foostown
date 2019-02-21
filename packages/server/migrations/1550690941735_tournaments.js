exports.up = pgm => {
  pgm.sql(`
    CREATE TABLE "foostown"."tournaments" (
      "id" SERIAL PRIMARY KEY,
      "tournament_name" TEXT NOT NULL,
      "organization_id" INTEGER NOT NULL,
      "start_date" DATE NOT NULL,
      "end_date" DATE NOT NULL,
      "status" TEXT NOT NULL,
      UNIQUE (tournament_name, organization_id)
    );
  `)
};

// FOREIGN KEY (organization_id) REFERENCES organizations (id)