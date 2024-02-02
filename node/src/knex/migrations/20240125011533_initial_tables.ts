import type { Knex } from "knex";


export async function up(knex: Knex): Promise<void> {
    return knex.schema
        .createTable('mfgs', function (table: Knex.CreateTableBuilder) {
            table.increments('id');
            table.string('name', 255).notNullable();
            table.string('description', 1000).notNullable();
            table.string('country_of_origin', 255).notNullable();
            table.string('site_url', 255);
            table.string('logo_url', 255);
        })
        .createTable('gear', function (table: Knex.CreateTableBuilder) { 
            table.increments('id');
            table.integer('mfg_id').notNullable().references('id').inTable('mfgs');
            table.string('name', 255).notNullable();
            table.string('description', 1000).notNullable();
            table.string('photo_url', 255);
            table.enu('type', ['grinder', 'brewer', 'kettle', 'scale', 'other']).notNullable();
            table.boolean('grinder_stepped').defaultTo(true);
            table.enu('grinder_burr_type', ['conical', 'flat', 'other']).defaultTo('conical');
            table.float('grinder_min_gradation').defaultTo(0);
            table.float('grinder_max_gradation').defaultTo(9);
            table.integer('grinder_total_revolutions');
        })
        .createTable('recipes', function (table: Knex.CreateTableBuilder) {
            table.increments('id');
            table.integer('version').notNullable().defaultTo(1);
            table.boolean('is_pub').defaultTo(false);
            table.timestamp('created_at').defaultTo(knex.fn.now());
            table.string('name', 255).notNullable();
            table.string('description', 1000).notNullable();
            table.specificType('steps', 'text ARRAY').defaultTo([]);
            table.specificType('step_additional_notes', 'text ARRAY').defaultTo([]);
            table.specificType('step_start_times', 'integer ARRAY').defaultTo([0]);
            table.specificType('step_lengths', 'integer ARRAY').defaultTo([1000]);
            table.specificType('step_water_volumes', 'integer ARRAY').defaultTo([]);
            table.integer('total_time').defaultTo(6000);
            table.integer('water_temp_c');
            table.integer('dry_coffee_weight_g');
            table.integer('water_vol_ml');
            table.integer('owner_auth0_id');
        })
        .createTable('recipes_gear', function (table: Knex.CreateTableBuilder) {
            table.integer('recipe_id').notNullable().references('id').inTable('recipes');
            table.integer('gear_id').notNullable().references('id').inTable('gear');
            table.primary(['recipe_id', 'gear_id']);
        });
}


export async function down(knex: Knex): Promise<void> {
    return knex.schema
      .dropTable("recipes")
}