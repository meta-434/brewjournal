import { Knex } from "knex";

export async function seed(knex: Knex): Promise<void> {
    // Deletes ALL existing entries
    await knex("recipes").del();
    await knex("gear").del();
    await knex("mfgs").del();

    // Inserts seed entries
    await knex("mfgs").insert([
        {
            name: 'Option-O',
            description: 'Option-O is a small company that makes high quality coffee grinders.',
            country_of_origin: 'AUS',
            site_url: 'https://www.option-o.com/',
            logo_url: 'https://images.squarespace-cdn.com/content/v1/5b125642ec4eb782ce4f9947/1590805199369-I6XQ3B1LLKGB5SGJ27SI/%E8%B5%84%E6%BA%90+4.png',
        },
        {
            name: 'Bodum',
            description: 'this is a test mfg entry #2!',
            country_of_origin: 'CHE',
            site_url: 'https://www.google.com',
            logo_url: 'https://www.google.com',
        },
        {
            name: 'Hario',
            description: 'this is a test mfg entry #3!',
            country_of_origin: 'JPN',
            site_url: 'https://www.google.com',
            logo_url: 'https://www.google.com',
        },
        {
            name: 'Fellow',
            description: 'this is a test mfg entry #4!',
            country_of_origin: 'USA',
            site_url: 'https://www.google.com',
            logo_url: 'https://www.google.com',
        }
    ]);
    await knex("gear").insert([
        {
            mfg_id: 1,
            name: 'Option-O Lagom Mini',
            description: 'The Lagom Mini is Option-O\'s smallest offering, suitable for home use.',
            photo_url: 'https://images.squarespace-cdn.com/content/v1/5b125642ec4eb782ce4f9947/d1f14d05-4b2d-4335-9a6d-e98576940f9b/DSC01961.jpg',
            type: 'grinder',
            grinder_stepped: false,
            grinder_burr_type: 'conical',
            grinder_min_gradation: 0.0,
            grinder_max_gradation: 9.9,
            grinder_total_revolutions: 5,
        }

    ]);
    await knex("coffee").insert([
        {
            
        }
    ]);
    await knex("recipes").insert([
        {
            name: 'test recipe 1!',
            description: 'this is a test recipe entry #1!',
            steps: '1. grind beans. 2. make coffee. 3. Drink coffee',
            version: 1,
        },
        {
            name: 'test recipe 2!',
            description: 'this is a test recipe entry #2!',
            steps: '1. grind beans BETTER. 2. make coffee BETTER. 3. Drink coffee MORE',
            version: 1,
        }
    ]);
        

   
};
