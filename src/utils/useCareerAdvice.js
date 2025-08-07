import { useQuery } from "@tanstack/react-query";

const analyzePrompt = (skills) => `
You're an expert software career advisor. Analyze the following user's detected skills:

${skills.map((s) => `${s.name}: ${s.count}`).join("\n")}

Now give feedback in this strict JSON format only:

{
  "strengths": ["..."],
  "recommendations": [
    { "name": "...", "reason": "..." },
    { "name": "...", "reason": "..." }
  ],
  "projectIdeas": ["..."],
  "careerAdvice": "..."
}

Do not explain anything. Just return valid JSON. Be concise and helpful.
`;

export function useCareerAdvice(skillData) {
  return useQuery({
    queryKey: ["skill_insights", skillData],
    queryFn: async () => {
      const response = await fetch(
        "https://openrouter.ai/api/v1/chat/completions",
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${import.meta.env.VITE_OPENROUTER_API_KEY}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            // openai/gpt-3.5-turbo  qwen/qwen3-coder:free
            model: "qwen/qwen-2.5-coder-32b-instruct:free",
            messages: [
              {
                role: "system",
                content: "You're a helpful AI career advisor for developers.",
              },
              {
                role: "user",
                content: analyzePrompt(skillData),
              },
            ],
          }),
        }
      );

      const data = await response.json();
      const rawContent = data.choices?.[0]?.message?.content;

      try {
        const parsed = JSON.parse(rawContent);
        return parsed;
      } catch (error) {
        console.error("Failed to parse JSON from AI response:", error);
        return {
          strengths: [],
          recommendations: [],
          projectIdeas: [],
          careerAdvice: "Unable to generate advice at this time.",
          rawText: rawContent,
        };
      }
    },
    enabled: skillData.length > 0,
  });
}
