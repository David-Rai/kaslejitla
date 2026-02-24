import { votes } from "../memoryDB/votes.js";
let io_instance = null; //Holdoes IO instance
let vote_buffer = {};

export const handleSocket = (io) => {
  io_instance = io;
  io.on("connection", (client) => {
    // // console.log("New client connected:", client.id);

    //******On New vote*******
    //Increasing the votes on memory on server side
    client.on("increase-vote", ({ id }) => {
      // const index = votes.findIndex((v) => v.id === id);
      vote_buffer[id] = (vote_buffer[id] || 0) + 1; //updating on buffer

      // if (index !== -1) {
      //   votes[index].vote_count += 1;
      // }
    });
  });
};

setInterval(() => {
  if (io_instance === null) return;
  if ((Object.keys(vote_buffer).length === 0)) return;

  // console.log("Broadcasting every second");
  const updates = vote_buffer;
  vote_buffer = {};

  //updating the votes on memory
  Object.keys(updates).forEach((id) => {
    const index = votes.findIndex((v) => v.id === id);
    if (index !== -1) {
      votes[index].vote_count += vote_buffer[id];
    }
  });

  //Broadcasting into users now
  io_instance.emit("new-vote", vote_buffer);
}, 1000);
