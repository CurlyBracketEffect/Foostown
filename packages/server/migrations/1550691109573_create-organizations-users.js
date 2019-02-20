exports.up = pgm => {
  pgm.sql(`
    CREATE TABLE "foostown"."organizations_users" (
      "organization_id" INTEGER,
      "user_id" INTEGER REFERENCES users (id),
      "is_admin" BOOLEAN
    );
  `)
};


//todo: "organization_id" INTEGER REFERENCES organizations (id)
