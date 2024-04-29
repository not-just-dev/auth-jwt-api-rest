import express from "express";

const app = express();

export const startServer = (port: number) => {
  app.listen(port, () => {
    console.log(`Listening on http://localhost:${port}`);
  });
};

export default app;
