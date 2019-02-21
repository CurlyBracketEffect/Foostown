exports.up = pgm => {
  pgm.sql(`
    CREATE TABLE "foostown"."organizations_users" (
      "organization_id" INTEGER FOREIGN KEY REFERENCES organizations (id) NOT NULL,
      "user_id" INTEGER FOREIGN KEY REFERENCES users (id) NOT NULL,
      "is_admin" BOOLEAN NOT NULL
    );
  `)
};
