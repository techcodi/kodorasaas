// import { useMutation } from "@tanstack/react-query";
// import { toast } from "react-toastify";
// import { generateResumePrompt } from "../../utils/generatedResumePrompt";
// import { useState } from "react";

// export function useResumeGenerator() {
//   const [resume, setResume] = useState("");

//   const { mutateAsync: generateResume, isLoading } = useMutation({
//     mutationFn: async (formData) => {
//       const prompt = generateResumePrompt(formData);

//       const res = await fetch("https://openrouter.ai/api/v1/chat/completions", {
//         method: "POST",
//         headers: {
//           Authorization: `Bearer ${import.meta.env.VITE_OPENROUTER_API_KEY}`,
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify({
//           model: "openai/gpt-3.5-turbo-16k",
//           messages: [{ role: "user", content: prompt }],
//         }),
//       });

//       const result = await res.json();
//       const content = result?.choices?.[0]?.message?.content;
//       if (!content) throw new Error("No AI response.");
//       return content;
//     },
//     onSuccess: (content) => {
//       setResume(content);
//       toast.success("Resume generated ✅");

//     },
//     onError: (err) => {
//       toast.error("Resume generation failed: " + err.message);
//     },
//   });

//   return { generateResume, isLoading, resume };
// }

import { useMutation } from "@tanstack/react-query";
import { toast } from "react-toastify";
import { generateResumePrompt } from "../../utils/generatedResumePrompt";
import { getTodayResumeCount } from "../../utils/getTodayResumecount";
import { useState, useEffect } from "react";

export function useResumeGenerator(userId) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (userId) {
      getTodayResumeCount(userId)
        .then(setCount)
        .catch((err) => {
          console.error(err);
          setCount(0);
        });
    }
  }, [userId]);

  const mutation = useMutation({
    mutationFn: async (formData) => {
      // Check daily limit before generating
      if (count >= 2) {
        throw new Error(
          "You have reached your daily resume generation limit (2 per day)."
        );
      }

      const prompt = generateResumePrompt(formData);
      const res = await fetch("https://openrouter.ai/api/v1/chat/completions", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${import.meta.env.VITE_OPENROUTER_API_KEY}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          model: "qwen/qwen3-coder:free",
          messages: [{ role: "user", content: prompt }],
        }),
      });

      const result = await res.json();
      const content = result?.choices?.[0]?.message?.content;

      if (!content) throw new Error("No AI response.");

      try {
        return JSON.parse(content);
      } catch {
        throw new Error("Invalid JSON returned");
      }
    },
    onSuccess: () => {
      toast.success("✅ Resume generated");
      setCount((prev) => prev + 1); // Increment count after success
    },
    onError: (err) => toast.error("❌ Failed: " + err.message),
  });

  return {
    generateResume: mutation.mutate,
    resume: mutation.data,
    isLoading: mutation.status === "pending",
    isSuccess: mutation.status === "success",
    isError: mutation.status === "error",
    error: mutation.error,
    count, // expose count for UI
  };
}
