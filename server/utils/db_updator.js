import supabase from "../supabase/supabaseconfig.js";
import { votes } from "../memoryDB/votes.js";

const TIME_GAP = 1500; // 1.5 seconds

export const db_updator = () => {
  setInterval(async () => {
    try {
      const results = await Promise.all(
        votes.map((v) =>
          supabase
            .from("votes")
            .update({ vote_count: v.vote_count })
            .eq("id", v.id).select()
        )
      );

      console.log("✅ DB Updated Successfully");
    } catch (err) {
      console.error("❌ Batch Update Failed:");
    }
  }, TIME_GAP);
};