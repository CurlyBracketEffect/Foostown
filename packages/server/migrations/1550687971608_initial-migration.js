exports.up = pgm => {
  pgm.sql(`
    CREATE TABLE "foostown"."users" (
      "id" SERIAL PRIMARY KEY,
      "fullname" TEXT UNIQUE NOT NULL,
      "email" TEXT UNIQUE NOT NULL,
      "password" TEXT NOT NULL
    );
  `)
};

exports.down = pgm => {
  pgm.dropSchema('foostown', {cascade: true})
};
