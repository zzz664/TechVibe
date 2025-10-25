"use server";

import { createClient } from "@/lib/supabase/server";

export async function onLogout() {
  const supabase = await createClient();
  await supabase.auth.signOut();
}