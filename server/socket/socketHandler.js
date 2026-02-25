import { votes,voteMap } from "../memoryDB/votes.js";
let io_instance = null; //Holdoes IO instance
let vote_buffer = {};

export const handleSocket = (io) => {
  io_instance = io;
  io.on("connection", (client) => {
    //******On New vote*******
    client.on("increase-vote", ({ id }) => {
      vote_buffer[id] = (vote_buffer[id] || 0) + 1; //updating on buffer
    });
  });
};


setInterval(() => {
  if (!io_instance) return;
  if (Object.keys(vote_buffer).length === 0) return;

  // Take a snapshot of current votes
  const updates = vote_buffer;
  vote_buffer = {}; // reset buffer for new votes

  // Update memory counts
  Object.keys(updates).forEach((id) => {
    if (voteMap[id]) {
      voteMap[id].vote_count += updates[id];
    }
  });

  console.log("updated memory")
  // Broadcast updates
  io_instance.emit("new-vote", updates);
}, 1000);
