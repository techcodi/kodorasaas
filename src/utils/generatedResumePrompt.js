// // src/utils/generatedResumePrompt.js
// export function generateResumePrompt({
//   name,
//   github,
//   bio,
//   skills,
//   experience,
//   projects,
// }) {
//   const skillsText =
//     skills
//       ?.filter(Boolean)
//       .map((s) => `- ${s}`)
//       .join("\n") || "- Not listed";

//   const experienceText =
//     experience
//       ?.filter(Boolean)
//       .map((e) => `- ${e}`)
//       .join("\n") || "- Not listed";

//   const projectsText = projects?.length
//     ? projects.map((p) => `- ${p.name}: ${p.description}`).join("\n")
//     : "No public projects found.";

//   const defaultBio = `A passionate software developer with a strong foundation in modern development tools. Frequently contributes to open-source projects and builds innovative tools on GitHub.`;

//   return `
// Generate a professional resume for the following developer:

// Name: ${name}
// GitHub Username: ${github}

// Summary:
// ${bio?.trim() || defaultBio}

// Skills & Tools:
// ${skillsText}

// Work Experience:
// ${experienceText}

// Projects:
// ${projectsText}

// You must:
// - Analyze the GitHub projects to detect technologies and frameworks used (e.g., React, Vue, Tailwind, PostgreSQL, etc.)
// - Include both programming languages and tech stack tools.
// - Return in clean sections:
//   - Name + Title
//   - Summary
//   - Skills & Tools
//   - Work Experience
//   - Projects
//   - Contact (leave placeholder)
// `;
// }

// export function generateResumePrompt({
//   name,
//   github,
//   bio,
//   skills,
//   experience,
//   education,
//   hobbies,
//   languagesSpoken,
//   projects,
// }) {
//   // ✅ Format the user input for AI
//   const skillsText =
//     skills
//       ?.filter(Boolean)
//       .map((s) => `- ${s}`)
//       .join("\n") || "- Not listed";

//   const experienceText =
//     experience
//       ?.filter(Boolean)
//       .map((e) => `- ${e}`)
//       .join("\n") || "- Not listed";

//   const educationText =
//     education
//       ?.filter(Boolean)
//       .map((e) => `- ${e}`)
//       .join("\n") || "- Not listed";

//   const hobbiesText =
//     hobbies
//       ?.filter(Boolean)
//       .map((h) => `- ${h}`)
//       .join("\n") || "- Not listed";

//   const languagesSpokenText =
//     languagesSpoken
//       ?.filter(Boolean)
//       .map((l) => `- ${l}`)
//       .join("\n") || "- Not listed";

//   const projectsText = projects?.length
//     ? projects
//         .slice(0, 10) // ✅ Only take the top 10 recent projects
//         .map((p) => `- ${p.name}: ${p.description || "No description"}`)
//         .join("\n")
//     : "No public projects found.";

//   // ✅ Default bio if user does not provide one
//   const defaultBio = `A passionate software developer with a strong foundation in modern web and software development tools. Frequently contributes to open-source projects and builds innovative solutions on GitHub.`;

//   // ✅ Full prompt for AI
//   return `
// You are an expert resume writer for software developers. Analyze the provided details and generate a professional, cleanly formatted resume.

// Also:
// 1. Detect additional skills and **frameworks/tools** from the provided GitHub projects.
// 2. Present the most relevant and in-demand skills and tools.
// 3. Ensure a polished and concise tone suitable for global recruiters.

// ---

// Name: ${name}
// GitHub Username: ${github}

// Summary:
// ${bio?.trim() || defaultBio}

// Skills & Tools:
// ${skillsText}

// Work Experience:
// ${experienceText}

// Education:
// ${educationText}

// Languages Spoken:
// ${languagesSpokenText}

// Hobbies:
// ${hobbiesText}

// Projects:
// ${projectsText}

// ---

// ✅ **Format your response in clean sections**:
// - Name + Title
// - Summary
// - Skills & Tools
// - Work Experience
// - Education
// - Languages Spoken
// - Hobbies
// - Projects
// - Contact (Leave placeholder)
// `;
// }

import { skillGroups } from "./skillGroups";

export function generateResumePrompt({
  name,
  github,
  email,
  phone,
  address,
  bio,
  skills,
  experience,
  projects,
  education,
  hobbies,
  languagesSpoken,
}) {
  // Group skills into categories
  const groupedSkills = {};
  skills.forEach((skill) => {
    let found = false;
    for (const [category, items] of Object.entries(skillGroups)) {
      if (items.some((s) => s.toLowerCase() === skill.toLowerCase())) {
        if (!groupedSkills[category]) groupedSkills[category] = [];
        groupedSkills[category].push(skill);
        found = true;
        break;
      }
    }
    if (!found) {
      if (!groupedSkills["Core Skills"]) groupedSkills["Core Skills"] = [];
      groupedSkills["Core Skills"].push(skill);
    }
  });

  const defaultBio =
    "Results-driven software developer passionate about building scalable, maintainable applications. Adept at collaborating in fast-paced environments and delivering high-quality solutions that meet user needs , while continuously learning and adapting to new technologies.";

  const defaultExperience =
    "- Developed and maintained web applications using modern frameworks and technologies. -Collaborated with cross-functional teams to deliver high-quality software solutions. - Implemented best practices in software development to ensure code quality and performance. -Collaboration with team members to design and implement new features and enhancements.";

  return `
You are an expert technical resume writer. Generate ONLY a valid JSON object (no explanations, no markdown, no extra text).

The JSON structure should be:

{
  "name": "",
  "title": "",
  "contact": {
    "email": "",
    "phone": "",
    "address": "",
    "github": ""
  },
  "summary": "",
  "skills": {
    "Frontend": [],
    "Backend": [],
     "Core Skills": [],
    "DevOps": [],
    "Data": [],
    "Mobile": [],
   
  },
  "experience": [
    {
      "company": "",
      "description": ["", ""]
    }
  ],
  "education": [""],
  "languagesSpoken": [""],
  "hobbies": [""],
  "projects": [
    {
      "name": "",
      "description": ""
    }
  ]
}

Rules:
✅ Keep summary 3 sentences max, professional and recruiter-friendly.
✅ Expand experience into 2-3 professional bullet points.
✅ If project description is missing, generate one based on repo name.
✅ Make sure you provide provide a description for each project base on the project name.
✅ DO NOT repeat the same information in multiple sections.


Now fill the structure with this user's details:

Name: ${name}
Title: ${skills.includes("React") ? "Frontend Developer" : "Software Developer"}
GitHub Username: ${github}

Contact:
Email: ${email || "Not listed"}
Phone: ${phone || "Not provided"}
Address: ${address || "Not provided"}

Summary:
${bio?.trim() || defaultBio}

Skills:
${JSON.stringify(groupedSkills)}

Experience:
${experience.join(", ") || defaultExperience} 

Education:
${education.join(", ")} 

Languages Spoken:
${languagesSpoken.join(", ")}

Hobbies:
${hobbies.join(", ")}

Projects:
${projects
  .map((p) => `${p.name} - ${p.description || "Generate a short description"}`)
  .join(", ")}
`;
}
