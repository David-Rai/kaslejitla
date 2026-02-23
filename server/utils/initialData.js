// utils/initialData.js
import { votes } from '../memoryDB/votes.js'; // votes exported from votes.js
import supabase from '../supabase/supabaseconfig.js'

export async function initialData() {
  const r = await supabase.from('votes').select('*');

  votes.length = 0;       // clear existing array
  votes.push(...r.data);  // add new items

  console.log("Votes initialized:", votes);
}