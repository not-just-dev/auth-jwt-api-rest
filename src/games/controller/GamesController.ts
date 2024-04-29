import { type Request, type Response } from "express";
import { type GamesInMemoryRepository } from "../repository/GamesInMemoryRepository.js";

export class GamesController {
  constructor(private readonly gamesRepository: GamesInMemoryRepository) {}

  getGames = async (_req: Request, res: Response) => {
    const games = await this.gamesRepository.getAll();

    res.status(200).json({ games });
  };

  getGameById = async (req: Request<{ gameId: string }>, res: Response) => {
    const { gameId } = req.params;

    const game = await this.gamesRepository.getById(gameId);

    if (!game) {
      res.status(404).json({ error: "Game not found" });
      return;
    }

    res.status(200).json({ game });
  };
}
