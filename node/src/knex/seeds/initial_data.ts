import { Knex } from "knex";

export async function seed(knex: Knex): Promise<void> {
    // Deletes ALL existing entries
    await knex("recipes").del();
    await knex("gear").del();
    await knex("mfgs").del();
    await knex("coffee").del();
    await knex("roasters").del();

    // Inserts seed entries
    await knex("mfgs").insert([
        {
            name: 'Option-O',
            description: 'Option-O is a small company that makes high quality coffee grinders.',
            country_of_origin: 'AUS',
            site_url: 'https://www.option-o.com/',
            logo_url: 'https://images.squarespace-cdn.com/content/v1/5b125642ec4eb782ce4f9947/1590805199369-I6XQ3B1LLKGB5SGJ27SI/%E8%B5%84%E6%BA%90+4.png',
        }
    ])
    // get the ids of the mfgs we just inserted because docker migrations don't always clear the DB entirely
    await knex("mfgs").select('*').then((val) => {
        return val.map((mfg) => mfg.id);
    }).then(async(ids) => {
        await knex("gear").insert([
            {
                mfg_id: ids[0],
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
    })

    await knex("roasters").insert([
        {
            name: 'Onyx Coffee Lab',
            description: 'Onyx Coffee Lab is a small company that roasts high quality coffee in small batches.',
            country_of_origin: 'USA',
            site_url: 'https://onyxcoffeelab.com/',
            logo_url: 'https://onyxcoffeelab.com/cdn/shop/t/31/assets/never_settle_badge.svg?v=91826914075173369711705351137',
        }
    ]);
    // get the ids of the roasters we just inserted because docker migrations don't always clear the DB entirely
    await knex("roasters").select('*').then((val) => {
        return val.map((roaster) => roaster.id);
    }).then(async(ids) => {
        await knex("coffee").insert([
            {
                roaster_id: ids[0],
                variety_or_name: 'Kenya Gachatha',
                country_of_origin: 'KEN',
                masl: 1850,
                process: 'washed',
                roast_level: 70,
                tasting_notes: 'Ripe Peach, Raw Sugar, Grapefruit, Round',
                site_link_url: 'https://onyxcoffeelab.com/products/kenya-gachatha-aa'
            }
        ]);
    })
    await knex("coffee").select('*').where('variety_or_name', 'Kenya Gachatha').then((val) => {
        return val.map((coffee) => coffee.id);
    }).then(async(ids) => {
        await knex("recipes").insert([
            {
                is_pub: true,
                name: 'Onyx Coffee Lab Recommended for Kenya Gachatha',
                description: 'This recipe is recommended by Onyx Coffee Lab for their Kenya Gachatha coffee.',
                steps: ['bloom to 70g', 'center pour to 120g', 'center pour to 220g', 'spiral pour to 320g', 'drain'],
                step_additional_notes: ['pour in center of grounds', 'pour in center of grounds', 'pour in center of grounds', 'pour in spiral pattern', 'look to drain by 2:30'],
                step_start_times: [0, 30, 60, 90, 180],
                step_lengths: [30, 30, 30, 90, 0],
                step_water_volumes: [70, 50, 100, 100, 0],
                total_time: 180,
                grinder_setting: 2.33,
                water_temp_c: 94.4,
                dry_coffee_weight_g: 20.0,
                water_vol_ml: 320.0,
                coffee_id: ids[0]
            }
        ]);
    });
};
