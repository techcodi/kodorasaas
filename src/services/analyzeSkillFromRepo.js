export async function analyzeSkillFromRepo(repoName, repoDesc) {
  try {
    const res = await fetch("https://openrouter.ai/api/v1/chat/completions", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${import.meta.env.VITE_OPENROUTER_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "gpt-3.5-turbo",
        messages: [
          {
            role: "user",
            content: `From this repo name "${repoName}" and description "${repoDesc}", detect the programming languages or frameworks used (top 3 max). Reply with a comma-separated list like: "React, JavaScript, HTML"`,
          },
        ],
      }),
    });

    const data = await res.json();
    const content = data?.choices?.[0]?.message?.content?.trim();

    if (!content) return [];

    const skills = content
      .split(",")
      .map((s) => s.trim())
      .filter((s) => s.length > 1);

    return skills;
  } catch (err) {
    console.error("AI skill analyzer failed:", err);
    return [];
  }
}
