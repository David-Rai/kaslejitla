// utils/initialData.js
import { votes, voteMap } from "../memoryDB/votes.js"; // votes exported from votes.js
import supabase from "../supabase/supabaseconfig.js";

export async function initialData() {
  const r = await supabase.from("votes").select("*");
  // if(r.error) return

  if (!r.error) {
    votes.length = 0; // clear existing array
    votes.push(...r.data); // add new items
    // Build voteMap once at startup
    votes.forEach((v) => {
      voteMap[v.id] = v;
    });
    console.log("votes", votes);
    console.log("vote map", voteMap);
  }
}
