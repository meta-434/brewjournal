import 'ts-node/register';

const config = {
  development: {
    client: 'pg',
    connection: {
      port: 5432,
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
      extension: 'ts',
      directory: 'src/knex/migrations',
    },
    seeds: {
      extension: 'ts',
      directory: 'src/knex/seeds'
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

export default config;
