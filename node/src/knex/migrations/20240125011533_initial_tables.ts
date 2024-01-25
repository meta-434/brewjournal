import type { Knex } from "knex";


export async function up(knex: Knex): Promise<void> {
    return knex.schema
        .createTable('users', function (table) {
            table.increments('id');
            table.string('email', 255).notNullable().unique();
            table.string('password', 255).notNullable();
        })
        .createTable('recipes', function (table) {
            table.increments('id');
            table.integer('version').notNullable().defaultTo(1);
            table.boolean('is_public').defaultTo(false);
            table.timestamp('created_at').defaultTo(knex.fn.now());
            table.string('name', 255).notNullable();
            table.string('description', 1000).notNullable();
            table.string('steps', 1000).notNullable();
            table.integer('owner_id').references('id').inTable('users');
        });
}


export async function down(knex: Knex): Promise<void> {
    return knex.schema
      .dropTable("recipes")
      .dropTable("users");
}