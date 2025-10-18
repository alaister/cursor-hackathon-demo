import { createClient } from "@supabase/supabase-js";
import type { Database } from "./database-types";

export const supabase = createClient<Database>(
  import.meta.env.VITE_SUPABASE_URL,
  import.meta.env.VITE_SUPABASE_ANON_KEY,
);

// @ts-expect-error - supabase is not typed
window.supabase = supabase;
