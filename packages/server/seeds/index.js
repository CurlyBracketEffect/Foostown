const { Pool } = require('pg')
const squel = require("squel");
const config = require('../config/default.json')

const userSeeds = [
  {
    full_name: 'Rob Gilson',
    email: 'rob@rob.rob',
    password: '1234567',
  },
  {
    full_name: 'Jorrin Bruns',
    email: 'Jorrin@Jorrin.com',
    password: '1234567',
  },
  {
    full_name: 'Eirian Ta',
    email: 'Eirian@Eirian.com',
    password: '1234567',
  },
  {
    full_name: 'Akshay Manchand',
    email: 'Akshay@Akshay.com',
    password: '1234567',
  },
  {
    full_name: 'Navi Hothi',
    email: 'navi@navi.com',
    password: '1234567',
  },
  {
    full_name: 'Vaughn Paulger',
    email: 'vaughn@vaughn.com',
    password: '1234567',
  },
]

const teamSeeds = [
  {
    team_name: 'Rob Gilson',
    organization_id: 'RED Academy'
  },
  {
    team_name: 'Jorrin Bruns',
    organization_id: 'RED Academy'
  },
  {
    team_name: 'Eirian Ta',
    organization_id: 'RED Academy'
  },
  {
    team_name: 'Akshay Manchand',
    organization_id: 'RED Academy'
  },
  {
    team_name: 'Navi Hothi',
    organization_id: 'RED Academy'
  },
  {
    team_name: 'Vaughn Paulger',
    organization_id: 'RED Academy'
  },
]

const seed = async () => {

  const pg = new Pool(config.db)
  await pg.connect()


  // await Promise.all(userSeeds.map((userSeed) => (
  //   pg.query({
  //     text: 'INSERT INTO users (full_name, email, password) VALUES ($1, $2, $3)',
  //     values: [userSeed.full_name, userSeed.email, userSeed.password],
  //   })
  // )))

  const usersPromise =  Promise.all(userSeeds.map((userSeed) => (
    pg.query(
      squel.insert()
        .into('users')
        .setFields(userSeed)
        .toParams()
    )
  )))

  const teamsPromise =  Promise.all(teamSeeds.map((teamSeed) => (
    pg.query(
      squel.insert()
        .into('teams')
        .setFields(teamSeed)
        .toParams()
    )
  )))

  await Promise.all([usersPromise, teamsPromise])
}

seed();

