import express from "express";
import { Server } from "socket.io";
import http from "http";
import cors from "cors";
import { config } from "dotenv";
config();

import { votes } from "./memoryDB/votes.js";
import { db_updator } from "./utils/db_updator.js";
import { handleSocket } from "./socket/socketHandler.js";
import { initialData } from "./utils/initialData.js";

(async () => {
  //Socket instance
  const corsOption = {
    origin: "*",
  };
  const app = express();
  const server = http.createServer(app);
  const io = new Server(server, {
    cors: corsOption,
  });

  //Middlewares
  app.use(cors(corsOption));
  app.use(express.json());

  await initialData(); // fetch data from DB before starting the server

  //Socket connection handling
  handleSocket(io);

  //Storing into database on Every time Gap
  db_updator();

  //Routes to get initial states of app
  app.get("/", (req, res) => {
    res.json(votes);
  });

  const PORT = process.env.PORT || 1111;
  server.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
})();
