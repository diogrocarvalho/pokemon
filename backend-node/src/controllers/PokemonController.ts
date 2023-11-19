import { Request, Response } from 'express';

export class PokemonController {
  getAll(request: Request, response: Response) {
    response.send('deu bom...');
  }
}
