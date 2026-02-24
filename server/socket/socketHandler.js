import { votes } from "../memoryDB/votes.js";
let io_instance = null; //Holdoes IO instance
let vote_updates=[]

export const handleSocket = (io) => {
  io_instance = io;
  io.on("connection", (client) => {
    // // console.log("New client connected:", client.id);

    //******On New vote*******
    //Increasing the votes on memory on server side
    client.on("increase-vote", ({ id }) => {
      // const index = votes.findIndex((v) => v.id === id);
      console.log("vote for ".id)

      // if (index !== -1) {
      //   votes[index].vote_count += 1;
      // }

      
    });
  });
};

setInterval(() => {
  if(io_instance === null) return 
  console.log("Broadcasting every second");
  io_instance.emit("new-vote",votes)
}, 1000);
