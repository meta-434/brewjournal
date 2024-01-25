import { Knex } from "knex";

export async function seed(knex: Knex): Promise<void> {
    // Deletes ALL existing entries
    await knex("recipes").del();
    await knex("users").del();

    // Inserts seed entries
    await knex("users").insert([
        {email: 'alex@hapgood.me', password:'password123'},
        {email: 'garrett@moore.me', password: 'password456'}
    ]);

    await knex("recipes").insert([
        {
            name: 'test recipe 1!',
            description: 'this is a test recipe entry #1!',
            steps: '1. grind beans. 2. make coffee. 3. Drink coffee',
            owner_id: 1,
            version: 1,
        },
        {
            name: 'test recipe 2!',
            description: 'this is a test recipe entry #2!',
            steps: '1. grind beans BETTER. 2. make coffee BETTER. 3. Drink coffee MORE',
            owner_id: 2,
            version: 1,
        }
    ]);
};
