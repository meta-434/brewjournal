import type { Knex } from "knex";


export async function up(knex: Knex): Promise<void> {
    return knex.schema
        .createTable('recipes', function (table) {
            table.increments('id');
            table.integer('version').notNullable().defaultTo(1);
            table.boolean('is_public').defaultTo(false);
            table.timestamp('created_at').defaultTo(knex.fn.now());
            table.string('name', 255).notNullable();
            table.string('description', 1000).notNullable();
            table.string('steps', 1000).notNullable();
            table.integer('owner_auth0_id');
        });
}


export async function down(knex: Knex): Promise<void> {
    return knex.schema
      .dropTable("recipes")
}