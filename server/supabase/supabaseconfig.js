import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.SUPABASE_URL || 'https://skwnxafpaqlhgynnzowj.supabase.co';
const supabaseKey = process.env.SUPABASE_PUBLISHABLE_DEFAULT_KEY || 'sb_publishable_BsGAM5LNa5Bh4jLop8lBig_xikm4y6O';

const supabase = createClient(supabaseUrl, supabaseKey);

export default supabase;
