// import { useState } from "react";
// import { toast } from "react-toastify";
// import { useForm } from "react-hook-form";
// import { useAuth } from "../context/AppContext";
// import supabase from "../services/supabase";
// import Commits from "./Commits";
// import SkillProgress from "./SkillProgress";
// import "./Form.css";
// function Form() {
//   const { user } = useAuth();
//   const { register, handleSubmit, reset } = useForm();
//   const [repoList, setRepoList] = useState([]);
//   const [isLoading, setIsLoading] = useState(false);
//   const [skills, setSkills] = useState([]);

//   const onSubmitGitUsername = async ({ username }) => {
//     try {
//       setIsLoading(true);
//       const res = await fetch(
//         `https://api.github.com/users/${username}/repos?per_page=100&sort=updated`
//       );
//       const data = await res.json();

//       if (!Array.isArray(data)) {
//         toast.error(data.message || "Failed to fetch repositories");
//         setIsLoading(false);
//         return;
//       }

//       // Map repo data
//       const repos = data.map((repo) => ({
//         name: repo.name,
//         description: repo.description,
//         url: repo.html_url,
//         stars: repo.stargazers_count,
//         language: repo.language,
//       }));

//       setIsLoading(false);
//       // Detect unique languages
//       const detectedSkills = Array.from(
//         new Set(repos.map((repo) => repo.language).filter(Boolean))
//       );
//       setSkills(detectedSkills);

//       await supabase.from("user_skills").upsert(
//         detectedSkills.map((skill) => ({
//           user_id: user.id,
//           skill_name: skill,
//         })),
//         { onConflict: "user_id, skill_name" }
//       );

//       setRepoList(repos);

//       // Save to supabase (optional, adjust table/fields as needed)
//       const { error } = await supabase.from("user_repos").insert(
//         repos.map((repo) => ({
//           user_id: user.id,
//           repo_name: repo.name,
//           repo_description: repo.description,
//           repo_url: repo.url,
//           repo_stars: repo.stars,
//           repo_language: repo.language,
//         }))
//       );
//       if (error) toast.error(error.message);
//       else toast.success("Repositories saved successfully ✅");
//     } catch (err) {
//       toast.error("Failed to fetch GitHub repositories", err);
//     }

//     reset();
//   };

//   return (
//     <div>
//       <form
//         onSubmit={handleSubmit(onSubmitGitUsername)}
//         className="commit_form"
//       >
//         <input
//           placeholder="Enter your Github username"
//           type="text"
//           {...register("username", { required: true })}
//         />
//         <button type="submit" disabled={isLoading}>
//           Analyze commit
//         </button>
//       </form>

//       <div className="boards-cards">
//         <div className="card">
//           <div className="card-details">
//             <div className="card-text">
//               <small>Total Repositories</small>
//               <h4>{repoList.length}</h4>
//               <span>
//                 12%
//                 <small>from last month</small>
//               </span>
//             </div>
//             <i class="fa-solid fa-stethoscope"></i>
//           </div>
//         </div>

//         <div className="card">
//           <div className="card-details">
//             <div className="card-text">
//               <small>Total Skills Detected</small>
//               <h4>{skills.length}</h4>
//               <span>
//                 8%
//                 <small>from last month</small>
//               </span>
//             </div>
//             <i
//               className="fa-regular fa-lightbulb"
//               style={{ backgroundColor: "#6155bb" }}
//             ></i>
//           </div>
//         </div>
//         <div className="card">
//           <div className="card-details">
//             <small>Total Repositories Synced</small>
//             <h4>{repoList.length}</h4>
//             <span>
//               5%
//               <small>from last month</small>
//             </span>
//           </div>
//         </div>
//       </div>

//       <div className="commit_container">
//         <Commits repoList={repoList} isLoading={isLoading} />
//         <SkillProgress repoList={repoList} skills={skills} />
//       </div>
//     </div>
//   );
// }

// export default Form;

import { useState } from "react";
import { toast } from "react-toastify";
import { useForm } from "react-hook-form";
import { useAuth } from "../context/AppContext";
import supabase from "../services/supabase";
import Commits from "./Commits";
import SkillProgress from "./SkillProgress";
import "./Form.css";

function Form() {
  const { user } = useAuth();
  const { register, handleSubmit, reset } = useForm();
  const [repoList, setRepoList] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [skills, setSkills] = useState([]);
  const [totalStars, setTotalStars] = useState(0);

  const onSubmitGitUsername = async ({ username }) => {
    try {
      setIsLoading(true);

      const res = await fetch(
        `https://api.github.com/users/${username}/repos?per_page=100&sort=updated`
      );
      const data = await res.json();

      if (!Array.isArray(data)) {
        toast.error(data.message || "Failed to fetch repositories");
        setIsLoading(false);
        return;
      }

      const repos = data.map((repo) => ({
        name: repo.name,
        description: repo.description,
        url: repo.html_url,
        stars: repo.stargazers_count,
        language: repo.language,
      }));

      const starCount = repos.reduce((sum, repo) => sum + repo.stars, 0);
      setTotalStars(starCount);

      setRepoList(repos);

      const detectedSkills = Array.from(
        new Set(repos.map((repo) => repo.language).filter(Boolean))
      );
      setSkills(detectedSkills);

      // Delete old user_skills
      await supabase.from("user_skills").delete().eq("user_id", user.id);

      // Insert new skills
      if (detectedSkills.length > 0) {
        await supabase.from("user_skills").insert(
          detectedSkills.map((skill) => ({
            user_id: user.id,
            skill_name: skill,
          }))
        );
      }

      // Save repos
      await supabase.from("user_repos").insert(
        repos.map((repo) => ({
          user_id: user.id,
          repo_name: repo.name,
          repo_description: repo.description,
          repo_url: repo.url,
          repo_stars: repo.stars,
          repo_language: repo.language,
        }))
      );

      toast.success("Repositories and skills synced ✅");
    } catch (err) {
      toast.error("Failed to fetch GitHub repositories");
      console.log(err);
    } finally {
      setIsLoading(false);
      reset();
    }
  };

  return (
    <div>
      <form
        onSubmit={handleSubmit(onSubmitGitUsername)}
        className="commit_form"
      >
        <input
          placeholder="Enter your Github username"
          type="text"
          {...register("username", { required: true })}
        />
        <button type="submit" disabled={isLoading}>
          {isLoading ? "Analyzing..." : "Analyze repos"}
        </button>
      </form>

      <div className="boards-cards">
        <div className="card">
          <div className="card-details">
            <div className="card-text">
              <small>Total Repositories</small>
              <h4>{repoList.length}</h4>
            </div>
            <i className="fa-solid fa-stethoscope"></i>
          </div>
        </div>

        <div className="card">
          <div className="card-details">
            <div className="card-text">
              <small>Total Skills Detected</small>
              <h4>{skills.length}</h4>
            </div>
            <i
              className="fa-regular fa-lightbulb"
              style={{ backgroundColor: "#6155bb" }}
            ></i>
          </div>
        </div>

        <div className="card">
          <div className="card-details">
            <div className="card-text">
              <small>Total Stars</small>
              <h4>{totalStars}</h4>
            </div>
            <i
              className="fa-regular fa-star"
              style={{ backgroundColor: "orange" }}
            ></i>
          </div>
        </div>
      </div>

      <div className="commit_container">
        <Commits repoList={repoList} isLoading={isLoading} />
        <SkillProgress repoList={repoList} skills={skills} />
      </div>
    </div>
  );
}

export default Form;
