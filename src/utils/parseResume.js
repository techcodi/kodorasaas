// export function parseSection(text, label) {
//   const patterns = [
//     new RegExp(`^${label}:\\s*(.*)$`, "im"), // Label: value
//     new RegExp(`^\\*\\*${label}:\\*\\*\\s*(.*)$`, "im"), // **Label:** value
//     new RegExp(`^#{1,6}\\s*${label}\\s*\\n(.*)`, "im"), // ## Label newline value
//     new RegExp(`${label}\\s*-\\s*(.*)$`, "im"), // Label - value
//   ];

//   for (const pattern of patterns) {
//     const match = text.match(pattern);
//     if (match && match[1]) return match[1].trim();
//   }

//   return ""; // fallback if nothing found
// }

// export function parseList(text, label) {
//   const sectionRegex = new RegExp(
//     `(${label}:|\\*\\*${label}:\\*\\*|#{1,6}\\s*${label})[\\s\\n]*([\\s\\S]*?)(?=\\n\\n|\\n[A-Z][a-z]+:|\\n\\*\\*|\\n#|$)`,
//     "im"
//   );

//   const match = text.match(sectionRegex);
//   if (!match || !match[2]) return [];

//   const rawList = match[2];

//   const lines = rawList
//     .split(/\n|•|-|\*/g) // supports multiple bullet styles
//     .map((line) => line.trim())
//     .filter(Boolean)
//     .filter((line) => line.length > 2);

//   return lines;
// }

// ✅ Safely parse single-line sections
export function parseSection(text, label) {
  const regex = new RegExp(`${label}[\\s&\\w]*:\\s*(.*?)\\n(?=\\w|$)`, "s");
  const match = text.match(regex);
  return match ? match[1].trim() : "Not available";
}

// ✅ Safely parse lists (skills, hobbies, projects, etc.)
export function parseList(text, label) {
  const regex = new RegExp(
    `${label}[\\s&\\w]*:\\s*([\\s\\S]*?)(?=\\n\\w|$)`,
    "s"
  );
  const match = text.match(regex);
  if (!match) return [];

  return match[1]
    .split("\n")
    .map((line) => line.replace(/^-|•|\*/g, "").trim())
    .filter(Boolean);
}

// export function parseSection(text, label) {
//   const regex = new RegExp(`${label}:\\s*(.*?)\\n(?=\\w+:|$)`, "s");
//   const match = text.match(regex);
//   return match ? match[1].trim() : "";
// }

// export function parseSection(text, label) {
//   // Escape special regex characters in label
//   const safeLabel = label.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
//   const regex = new RegExp(
//     `^${safeLabel}\\s*:\\s*\\n?([\\s\\S]*?)(?=^\\w[\\w\\s&]*\\s*:\\s*\\n?|\\Z)`,
//     "im"
//   );
//   const match = text.match(regex);
//   return match ? match[1].trim() : "";
// }

// export function parseList(text, label) {
//   // Escape special regex characters in label
//   const safeLabel = label.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
//   const regex = new RegExp(
//     `^${safeLabel}\\s*:\\s*\\n?([\\s\\S]*?)(?=^\\w[\\w\\s&]*\\s*:\\s*\\n?|\\Z)`,
//     "im"
//   );
//   const match = text.match(regex);
//   if (!match) return [];
//   return match[1]
//     .split("\n")
//     .map((line) => line.replace(/^-|•|\*/g, "").trim())
//     .filter(Boolean);
// }

// export function parseSection(text, label) {
//   const regex = new RegExp(
//     `^${label}:\\s*\\n?([\\s\\S]*?)(?=^\\w[\\w\\s&]*:\\s*\\n?|\\Z)`,
//     "im"
//   );
//   const match = text.match(regex);
//   return match ? match[1].trim() : "";
// }

// export function parseList(text, label) {
//   const regex = new RegExp(
//     `^${label}:\\s*\\n?([\\s\\S]*?)(?=^\\w[\\w\\s&]*:\\s*\\n?|\\Z)`,
//     "im"
//   );
//   const match = text.match(regex);
//   if (!match) return [];
//   return match[1]
//     .split("\n")
//     .map((line) => line.replace(/^-|•|\*/g, "").trim())
//     .filter(Boolean);
// }
