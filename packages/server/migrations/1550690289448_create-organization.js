exports.up = pgm => {
  pgm.sql(`
    CREATE TABLE "foostown"."organizations" (
      "id" SERIAL PRIMARY key,
      "name" text NOT NULL,
      "is_active" boolean NOT NULL,
      "owner_id" integer REFERENCES users(id)
    );
  `)
};