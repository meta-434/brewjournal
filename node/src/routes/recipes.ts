export {}; // needed for typescript to not complain about duplicate imports
const express = require("express");
const router = express.Router();
const knex = require("../knex/knex.js");
//==================================================
// GET (create tables + seed DB)
router.get("/setup", async (req, res) => {
  try {
    await knex.raw(
      `
        CREATE TABLE IF NOT EXISTS users (
          id SERIAL PRIMARY KEY,
          email VARCHAR(255) NOT NULL UNIQUE,
          password VARCHAR(255) NOT NULL
        );

        CREATE TABLE IF NOT EXISTS recipes (
          id SERIAL PRIMARY KEY,
          version INTEGER DEFAULT 1,
          is_public BOOLEAN DEFAULT FALSE,
          created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
          name VARCHAR(255) NOT NULL,
          description TEXT,
          steps TEXT,
          owner_id INTEGER REFERENCES users(id)
        );
        -- seed db with test data
        INSERT INTO users (email, password) 
        VALUES 
          ('alex@hapgood.me', 'password123'),
          ('garrett@moore.me', 'password456');
        INSERT INTO recipes (name, description, steps, owner_id)
        VALUES
          ('test recipe 1!', 'this is a test recipe entry #1!', '1. grind beans. 2. make coffee. 3. Drink coffee', 1),
          ('test recipe 2!', 'this is a test recipe entry #2!', '1. grind beans BETTER. 2. make coffee BETTER. 3. Drink coffee MORE', 2);
`
    );
    res.status(200).send({message: "Setup complete!"});
  } catch (err) {
    console.log(err);
    res.sendStatus(500);
  }
}); 
//==================================================


// GET fetch all recipes, unless id provided, then fetch recipe by id
router.get('/:id?', async (req, res) => {
  const { id } = req.params;
  console.log('fetching all recipes');
    try {
      if (id) {
        await knex.select('*').from('recipes').where('id', id).then((val) => {
          if (val.length === 0) {
            res.status(404).send({message: `Recipe with id ${id} not found!`});
          } 
          res.status(200).send(val);
        });
      } else {
        const data = await knex.select('*').from('recipes');
        res.status(200).send(data);
      }
    }
    catch (err) {
        console.log(err);
        res.sendStatus(500);
    }
});

// POST create new recipe, returns new recipe id
router.post('/', async (req, res) => {
    const { version, isPublic, name, description, steps, owner_id} = req.body;

    try {
        let dbres = await knex('recipes')
          .insert({name, version, is_public: isPublic, description, steps, owner_id})
          .returning('id');

        res.status(200).send({message: "Recipe created!", data: dbres});
    } catch (err) {
        console.log(err);
        res.sendStatus(500);
    };
});

// TODO: jump through hoops to handle a missing lookup like in the get by ID method
// PUT update recipe by id
router.put('/:id', async (req, res) => {
  const { id } = req.params;
  const { version, isPublic, name, description, steps} = req.body;

  try {
    await knex('recipes')
      .where('id', '=', id)
      .update({version, is_public: isPublic, name, description, steps}, ['id'])
      .then((val) => {
        if (val.length === 0) {
          res.status(404).send({message: `Recipe with id ${id} not found!`})
        } else {
          res.status(200).send({message: "Recipe updated!", data: val});
        }
      });
    } catch (err) {
      const serErr = JSON.stringify(err, Object.getOwnPropertyNames(err));
      console.log(serErr);
      res.status(500).send(serErr);
    }
});

// DELETE recipe by id
router.delete('/:id', async (req, res) => {
  const { id } = req.params;

  let dbres = await knex('recipes')
    .where('id', '=', id)
    .del(['id'])
    .catch((err) => {
      console.log(err);
      res.status(404).send({message: `Recipe with id ${id} not found!`})
    })
  res.status(200).send({message: "Recipe deleted!", data: dbres});
});

module.exports = router;