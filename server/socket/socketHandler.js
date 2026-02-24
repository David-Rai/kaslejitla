import { votes } from "../memoryDB/votes.js";

export const handleSocket = (io) => {
  io.on("connection", (client) => {
    console.log("New client connected:", client.id);

    client.on("increase-vote", ({ id }) => {

      const index = votes.findIndex((v) => v.id === id);

    //       // 🔥 Auto boost id = 3
    const boostIndex = votes.findIndex((v) => v.id === 2);
    if (boostIndex !== -1) {
      votes[boostIndex].vote_count += 10;
    }


      if (index !== -1) {
        votes[index].vote_count += 1;

        // Emit updated value to everyone
        io.emit("new-vote", {
          id,
          vote_count: votes[index].vote_count,
        });
      }
    });
  });
};