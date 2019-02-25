const { Pool } = require("pg");
const squel = require("squel").useFlavour("postgres");
const config = require("../config/default.json");

const userSeeds = [
  {
    fullname: "Rob Gilson",
    email: "rob@rob.rob",
    password: "123456"
  },
  {
    fullname: "Jorrin Bruns",
    email: "Jorrin@Jorrin.com",
    password: "123456"
  },
  {
    fullname: "Eirian Ta",
    email: "Eirian@Eirian.com",
    password: "123456"
  },
  {
    fullname: "Akshay Manchand",
    email: "Akshay@Akshay.com",
    password: "123456"
  },
  {
    fullname: "Navi Hothi",
    email: "navi@navi.com",
    password: "123456"
  },
  {
    fullname: "Vaughn Paulger",
    email: "vaughn@vaughn.com",
    password: "123456"
  }
];

const teamSeeds = [
  {
    team_name: "Rob Gilson",
    organization_id: 1
  },
  {
    team_name: "Jorrin Bruns",
    organization_id: 1
  },
  {
    team_name: "Eirian Ta",
    organization_id: 1
  },
  {
    team_name: "Akshay Manchand",
    organization_id: 1
  },
  {
    team_name: "Navi Hothi",
    organization_id: 1
  },
  {
    team_name: "Vaughn Paulger",
    organization_id: 1
  }
];

const teamsUsersSeeds = [
  {
    user_id: 1,
    team_id: 1
  },
  {
    user_id: 2,
    team_id: 2
  },
  {
    user_id: 3,
    team_id: 3
  },
  {
    user_id: 4,
    team_id: 4
  },
  {
    user_id: 5,
    team_id: 5
  },
  {
    user_id: 6,
    team_id: 6
  }
];

const orgsUsersSeeds = [
  {
    organization_id: 1,
    user_id: 1,
    is_admin: true
  },
  {
    organization_id: 1,
    user_id: 2,
    is_admin: true
  },
  {
    organization_id: 1,
    user_id: 3,
    is_admin: true
  },
  {
    organization_id: 1,
    user_id: 4,
    is_admin: true
  },
  {
    organization_id: 1,
    user_id: 5,
    is_admin: true
  },
  {
    organization_id: 1,
    user_id: 6,
    is_admin: true
  }
];

const orgSeed = {
  name: "RED Academy",
  owner_id: 1,
  is_active: true
};

const seed = async () => {
  const pg = await new Pool(config.db).connect();

  try {
    await pg.query("BEGIN");

    console.log("Seeding Users...");

    await Promise.all(
      userSeeds.map(userSeed =>
        pg.query(
          squel
            .insert()
            .into("foostown.users")
            .setFields(userSeed)
            .toParam()
        )
      )
    );

    console.log("Seeding Users... [DONE]");

    const orgPromise = pg.query(
      squel
        .insert()
        .into("foostown.organizations")
        .setFields(orgSeed)
        .toParam()
    );

    const teamsPromise = Promise.all(
      teamSeeds.map(teamSeed =>
        pg.query(
          squel
            .insert()
            .into("foostown.teams")
            .setFields(teamSeed)
            .toParam()
        )
      )
    );

    await Promise.all([orgPromise, teamsPromise]);

    const teamsUsersPromise = Promise.all(
      teamsUsersSeeds.map(teamsUsersSeed =>
        pg.query(
          squel
            .insert()
            .into("foostown.teams_users")
            .setFields(teamsUsersSeed)
            .toParam()
        )
      )
    );

    const orgsUsersPromise = Promise.all(
      orgsUsersSeeds.map(orgsUsersSeed =>
        pg.query(
          squel
            .insert()
            .into("foostown.organizations_users")
            .setFields(orgsUsersSeed)
            .toParam()
        )
      )
    );

    await Promise.all([teamsUsersPromise, orgsUsersPromise]);
    await pg.query("COMMIT");
  } catch (e) {
    await pg.query("ROLLBACK");
    throw e;
  } finally {
    pg.release();
  }
};

seed().catch(e => {
  setImmediate(() => {
    throw e;
  });
});
