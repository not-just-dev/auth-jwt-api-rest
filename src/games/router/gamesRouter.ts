import express from "express";
import { GamesController } from "../controller/GamesController.js";
import { GamesInMemoryRepository } from "../repository/GamesInMemoryRepository.js";
import { authMiddleware } from "../../auth/middleware/authMiddleware.js";

const gamesRouter = express.Router();

const gamesInMemoryRepository = new GamesInMemoryRepository();
const gamesController = new GamesController(gamesInMemoryRepository);

gamesRouter.get("/", authMiddleware, gamesController.getGames);
gamesRouter.get("/:gameId", authMiddleware, gamesController.getGameById);

export default gamesRouter;
