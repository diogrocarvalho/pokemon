import dotenv from 'dotenv';
import express, { Express, Request, Response } from 'express';
import connectDB from './config/db.js';
import { Pokemon } from './model/pokemon.js';

import axios from 'axios';
import cors from 'cors';
import { FilterQuery } from 'mongoose';
import { PokemonType } from './model/pokemonType.js';
dotenv.config();
const PORT = process.env.PORT || 5000;
const app: Express = express();
app.use(express.json());
app.use(cors());

connectDB();

//Starting the express server
app.listen(PORT, () =>
  console.log(`Server running at http://localhost:${PORT}`)
);

function getPokemonFiltersByQueryParams(
  query: any
): FilterQuery<typeof Pokemon> {
  const { name, id, type } = query;
  const filter: any = {};

  if (name?.length) {
    filter.name = { $regex: new RegExp(name + '', 'i') };
  }

  if (id) {
    filter.id = id;
  }

  const parsedType = Number(type);

  if (type && !isNaN(parsedType)) {
    filter['types.id'] = {
      $in: [parsedType],
    };
  }
  return filter;
}

//List pokemon
app.get('/pokemon', (request: Request, response: Response) => {
  const { query } = request;

  Pokemon.find(getPokemonFiltersByQueryParams(query))
    .sort({ id: 1 })
    .then((data) => {
      response.send(data);
    })
    .catch((err) => {
      response.status(500).send({
        message:
          err.message || 'Some error occurred while retrieving tutorials.',
      });
    });
});

// Get pokemon by id. If not found request it to poke_api, than save locally
app.get('/pokemon/:id', (request: Request, response: Response) => {
  const id = request.params.id;
  var condition = id ? { id } : {};

  Pokemon.find(condition)
    .then(async (data) => {
      if (!data[0]) {
        console.log(`Pokemon ${id} not found...`);
        const url = `${process.env.POKE_API_URL}pokemon/${id}`;
        console.log(`Trying to get it from the remote API`, url);

        try {
          const pokemon = (await axios.get(url)).data;
          console.log(`${pokemon.name} found!`);

          // Mapping types
          const typePromises = pokemon.types.map(async ({ type }: any) => {
            const t = await PokemonType.findOne({ name: type.name });
            if (!t) {
              throw new Error(`Type '${type.name}' not found.`);
            }
            return t;
          });

          // Wait for all type lookups to complete
          const types = await Promise.all(typePromises);
          const pkm = new Pokemon({
            id: pokemon.id,
            name: pokemon.name,
            types,
          });
          console.log(`Trying to save ${pokemon.name} on the database...`);
          const savedPkm = await pkm.save();
          console.log(`${pokemon.name} saved on the database...`);
          response.send(savedPkm);
        } catch (error) {
          console.error('Error:', error);
          response.status(500).send('Error while processing the request.');
        }
      } else {
        response.send(data);
      }
    })
    .catch((error) => {
      console.error('Error:', error);
      response.status(500).send('Error while processing the request.');
    });
});

//delete a pokemon by id
app.delete('/pokemon/:id', async (request: Request, response: Response) => {
  const id = parseInt(request.params.id);
  if (!id) {
    return response.status(400).send({ message: `Invalid id`, code: 1 });
  }
  try {
    await Pokemon.deleteOne({ id });
    response.send(`Pokemon #${id} removed!`);
  } catch (err: any) {
    response.status(400).send({
      message: err.message || 'Some error occurred while retrieving tutorials.',
    });
  }
});

//
app.get('/type/:id', async (request: Request, response: Response) => {
  const id = request.params.id;
  var condition = id ? { id } : {};

  PokemonType.find(condition)
    .then(async (data) => {
      if (!data[0]) {
        const url = `${process.env.POKE_API_URL}type`;
        const types = (await axios.get(url)).data.results;

        //Mapping types
        try {
          console.log('types found', types);
          types.forEach(async (type: { name: string; url: string }) => {
            const url = type.url.split('/');
            const id: Number = Number(url[url.length - 2]);

            const pokemonType = new PokemonType({
              name: type.name,
              url: type.url,
              id,
            });
            console.log(`trying to save ${type.name} on database...`);
            await pokemonType.save();
            console.log(`${type.name} saved on database...`);
          });
          response.send(types);
        } catch {
          throw new Error('cant find type');
        }
      } else {
        response.send(data);
      }
    })
    .catch((err) => {
      response.status(500).send({
        message:
          err.message || 'Some error occurred while retrieving tutorials.',
      });
    });
});

app.get('/type', (request: Request, response: Response) => {
  const name = request.query.name;
  var condition = name ? { name } : {};

  PokemonType.find(condition)
    .sort({ id: 1 })
    .then(async (data) => {
      response.send(data);
    })
    .catch((err) => {
      response.status(500).send({
        message:
          err.message || 'Some error occurred while retrieving tutorials.',
      });
    });
});
