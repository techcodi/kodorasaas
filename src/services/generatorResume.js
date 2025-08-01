// import { toast } from "react-toastify";
// import { useState } from "react";
// import { useMutation } from "@tanstack/react-query";
// import { generateResumePrompt } from "../utils/generateResumePrompt";
// import { useAuth } from "../context/AppContext";
// import supabase from "./supabase";

// export default function generatorResume() {
//   const { user } = useAuth();
//   const [resume, setResume] = useState("");

//   const { fields: skillFields, append: appendSkill } = useFieldArray({
//     control,
//     // name: "skills",
//   });

//   const { fields: expFields, append: appendExp } = useFieldArray({
//     control,
//     name: "experience",
//   });

//   const { mutate: generateResume, isLoading } = useMutation({
//     mutationFn: async (data) => {
//       const prompt = generateResumePrompt(data);

//       const res = await fetch("https://openrouter.ai/api/v1/chat/completions", {
//         method: "POST",
//         headers: {
//           Authorization: `Bearer ${import.meta.env.VITE_OPENROUTER_API_KEY}`,
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify({
//           model: "deepseek-chat",
//           messages: [{ role: "user", content: prompt }],
//         }),
//       });

//       const result = await res.json();
//       const content = result?.choices?.[0]?.message?.content;
//       if (!content) throw new Error("No response from AI");

//       return content;
//     },
//     onSuccess: async (content) => {
//       setResume(content);
//       toast.success("Resume generated ✅");

//       // Optional: Save to DB
//       await supabase.from("user_resumes").insert([
//         {
//           user_id: user?.id,
//           resume_text: content,
//         },
//       ]);
//     },
//     onError: (err) => {
//       toast.error("Failed to generate resume: " + err.message);
//     },
//   });
// }
