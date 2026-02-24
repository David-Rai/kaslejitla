import supabase from '../supabase/supabaseconfig.js'
import { votes } from '../memoryDB/votes.js';

const TIME_GAP = 3 * 1000; //30s

//Updates DB using Time based Batching
export const db_updator = () => {
  setInterval(() => {
    Promise.all(
      votes.map((v) =>
        supabase
          .from("votes")
          .update({ vote_count: v.vote_count })
          .eq("id", v.id),
      ),
    );
    console.log("Updating DB....");

  }, TIME_GAP);
};
