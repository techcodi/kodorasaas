import supabase from "../services/supabase";

export async function getTodayResumeCount(user_id) {
  const { count, error } = await supabase
    .from("resume_generations")
    .select("*", { count: "exact", head: true })
    .eq("user_id", user_id)
    .gte("created_at", new Date().toISOString().split("T")[0]); // midnight today

  if (error) throw error;
  return count;
}
