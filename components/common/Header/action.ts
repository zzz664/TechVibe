import { createClient } from "@/lib/supabase/server";

export async function checkSession() {
  const supabase = await createClient();
  const { data: user_data } = await supabase.auth.getUser();

  if (user_data) {
    const { data: nickname_data } = await supabase
      .from("user")
      .select("nickname")
      .eq("id", user_data.user?.id)
      .single();

    return {
      status: "success",
      user: user_data.user,
      nickname: nickname_data?.nickname,
    };
  }

  return { status: "failed", user: null, nickname: "" };
}
