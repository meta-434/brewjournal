import { Knex } from 'knex';

const environment = process.env.ENVIRONMENT || 'development';

const config = require('./knexfile')[environment];
const knex: Knex = require('knex')(config);
export default knex;