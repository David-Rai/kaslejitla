import { votes } from "../memoryDB/votes.js";

export const handleSocket = (io) => {
  io.on("connection", (client) => {
    console.log("New client connected:", client.id);

    // Handle "increase-vote" event from client
    client.on("increase-vote", (payload) => {
      const { id, new_vote_count } = payload;
      const index = votes.findIndex((v) => v.id === id);
      if (index !== -1) {
        votes[index].vote_count = new_vote_count;
      }

      console.log("payload from increase-vote event", payload);

      client.broadcast.emit("new-vote", payload);
    });
  });
};
