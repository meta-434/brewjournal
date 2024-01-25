require ('ts-node/register');

module.exports = {
  development: {
    client: 'pg',
    connection: {
      host: 'localhost',
      database: 'db123',
      user:     'user123',
      password: 'password123'
    },
    pool: {
      min: 2,
      max: 10
    },
    migrations: {
      directory: './migrations',
    },
    seeds: {
      directory: './seeds'
    }
  },

  production: {
    client: 'postgresql',
    connection: {
      database: 'my_db',
      user:     'username',
      password: 'password'
    },
    pool: {
      min: 2,
      max: 10
    }
  },

};
