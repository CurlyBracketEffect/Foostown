exports.up = pgm => {
  pgm.sql(`
    CREATE TABLE "foostown"."organizations_users" (
      "organization_id" INTEGER REFERENCES organizations (id) NOT NULL,
      "user_id" INTEGER REFERENCES users (id) NOT NULL,
      "is_admin" BOOLEAN NOT NULL
    );
  `)
};
