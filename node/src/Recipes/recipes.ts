export {}; // needed for typescript to not complain about duplicate imports
import express, {Request, Response} from "express";
const router = express.Router();
import knex, { Knex } from "knex";
import type { Recipe } from "./RecipesTypes";
import config from "../../knexfile";
let db: Knex = knex(config.development);


// GET fetch all recipes, unless id provided, then fetch recipe by id
router.get('/:id(\\d+)?', async ( req: Request, res: Response ) => {
  const { id } = req.params;
  console.log('fetching all recipes');
    try {
      if (id) {
        // fetch recipe by id
        await db.select('*').from('recipes').where('id', id).then((val: Recipe[]) => {
          if (val.length === 0) {
            res.status(404).send({message: `Recipe with id ${id} not found!`});
          } 
          res.status(200).send(val);
        });
      } else {
        // fetch all recipes
        const data: Recipe[] = await db.select('*').from('recipes');
        res.status(200).send(data);
      }
    }
    catch (err:any) {
        console.log(err);
        res.sendStatus(500).render(err.stack);
    }
});

// POST create new recipe, returns new recipe id
router.post('/', async (req: Request, res: Response) => {
  const { version, isPublic, name, description, steps, owner_id} = req.body;

  try {
    let dbres = await db('recipes')
      .insert({name, version, is_public: isPublic, description, steps, owner_id})
      .returning('id');

    res.status(200).send({message: "Recipe created!", data: dbres});
  } catch (err: any) {
    console.log('error:\n', err);
    res.sendStatus(500).render(err.stack);
  };
});

// TODO: jump through hoops to handle a missing lookup like in the get by ID method
// PUT update recipe by id
router.put('/:id', async (req: Request, res: Response) => {
  const { id } = req.params;
  const { version, isPublic, name, description, steps} = req.body;

  try {
    await db('recipes')
      .where('id', '=', id)
      .update({version, is_public: isPublic, name, description, steps}, ['id'])
      .then((val: Recipe[]) => {
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
router.delete('/:id', async (req: Request, res: Response) => {
  const { id } = req.params;

  let dbres = await db('recipes')
    .where('id', '=', id)
    .del(['id'])
    .catch((err) => {
      console.log(err);
      res.status(404).send({message: `Recipe with id ${id} not found!`})
    })
  res.status(200).send({message: "Recipe deleted!", data: dbres});
});

export default router;