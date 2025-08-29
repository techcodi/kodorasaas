// import { useEffect, useState } from "react";
// import { analyzeSkillFromRepo } from "../services/analyzeSkillFromRepo";

// import "./SkillProgress.css";
// import supabase from "../services/supabase";

// export default function SkillProgress({ user, repoList }) {
//   const [skills, setSkills] = useState([]);
//   const [totalRepos, setTotalRepos] = useState(1);

//   useEffect(() => {
//     if (!user || repoList.length === 0) return;

//     const analyzeAndSaveSkills = async () => {
//       // Clear previous records
//       await supabase.from("user_skills").delete().eq("user_id", user.id);

//       for (const repo of repoList) {
//         const detected = await analyzeSkillFromRepo(
//           repo.name,
//           repo.description || ""
//         );

//         for (const skill of detected) {
//           await supabase.from("user_skills").upsert(
//             [
//               {
//                 user_id: user.id,
//                 repo_name: repo.name,
//                 repo_url: repo.html_url,
//                 skill_name: skill,
//               },
//             ],
//             { onConflict: "user_id,repo_name,skill_name" }
//           );
//         }
//       }

//       fetchUpdatedSkills();
//     };

//     const fetchUpdatedSkills = async () => {
//       const { data, error } = await supabase
//         .from("user_skills")
//         .select("skill_name, repo_name")
//         .eq("user_id", user.id);

//       if (error) {
//         console.error("Fetch error:", error.message);
//         return;
//       }

//       const skillMap = {};

//       data.forEach(({ skill_name, repo_name }) => {
//         if (!skillMap[skill_name]) {
//           skillMap[skill_name] = new Set();
//         }
//         skillMap[skill_name].add(repo_name);
//       });

//       const grouped = Object.entries(skillMap).map(([skill, repoSet]) => ({
//         skill_name: skill,
//         count: repoSet.size,
//       }));

//       setSkills(grouped);
//       setTotalRepos(repoList.length || 1);
//     };

//     analyzeAndSaveSkills();
//   }, [user, repoList]);

//   return (
//     <div className="skills-container">
//       {skills.map((skill) => {
//         const rawPercent = (skill.count / totalRepos) * 100;
//         const percentage = Math.min(rawPercent + 30, 100).toFixed(0);

//         return (
//           <div className="skill-item" key={skill.skill_name}>
//             <div className="skill-label">
//               <span>{skill.skill_name}</span>
//               <span>{percentage}%</span>
//             </div>
//             <div className="progress-bar">
//               <div
//                 className="progress-fill"
//                 style={{ width: `${percentage}%` }}
//               ></div>
//             </div>
//           </div>
//         );
//       })}
//     </div>
//   );
// }

import "./SkillProgress.css";

function SkillProgress({ repoList, skills }) {
  // Calculate progress per skill
  const totalRepos = repoList.length;

  const skillUsage = skills.map((skill) => {
    const count = repoList.filter((repo) => repo.language === skill).length;
    const rawPercentage = Math.round((count / totalRepos) * 100);
    const percentage = Math.min(rawPercentage + 50, 70);
    return { name: skill, count, percentage };
  });

  return (
    <div className="skill-progress">
      <h3>Skill Progress</h3>
      {skillUsage.length === 0 && <p>No skills detected yet.</p>}
      {skillUsage.map(({ name, percentage }) => (
        <div key={name} className="skill-progress-item">
          <div className="skill-name">{name}</div>
          <div className="progress-fill"> {percentage}%</div>
          <div
            className="progress-bar"
            style={{ width: `${percentage}%`, backgroundColor: "#3b82f6" }}
          ></div>
        </div>
      ))}
    </div>
  );
}

export default SkillProgress;
