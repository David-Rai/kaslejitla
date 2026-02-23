import { votes } from "../memoryDB/votes.js";

export const handleSocket = (io) => {
  io.on("connection", (client) => {
    console.log("New client connected:", client.id);

    // Handle "increase-vote" event from client
    client.on("increase-vote", (payload) => {
      console.log("payload from increase-vote event", payload);
      // Broadcast updated leaderboard to all clients
      client.broadcast.emit("new-vote", payload);
    });
  });
};
