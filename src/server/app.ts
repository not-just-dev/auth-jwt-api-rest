import express from "express";
import morgan from "morgan";
import cors from "cors";
import app from "./index.js";
import gamesRouter from "../games/router/gamesRouter.js";
import authRouter from "../auth/router/authRouter.js";

app.use(cors());
app.use(morgan("dev"));
app.use(express.json());

app.use("/auth", authRouter);
app.use("/games", gamesRouter);
