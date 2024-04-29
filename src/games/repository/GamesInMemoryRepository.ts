import { type Repository } from "../../repository/types.js";
import { games } from "../data.js";
import { type Game } from "../types.js";

export class GamesInMemoryRepository implements Repository<Game> {
  async getAll(): Promise<Game[]> {
    return games;
  }

  async getById(gameId: string): Promise<Game | null> {
    const foundGame = games.find((game) => game.id === gameId);

    return foundGame ?? null;
  }
}
