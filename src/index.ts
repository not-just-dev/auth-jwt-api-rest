import "./server/app.js";
import { startServer } from "./server/index.js";

const port = process.env.PORT ?? 4000;

startServer(Number(port));
