import { useForm, useFieldArray } from "react-hook-form";
import { useState } from "react";
import RepoSelector from "./RepoSelector";

import { fetchGithubData } from "./fetchGithubData";

import "./ResumeForm.css";

function ResumeForm({
  generateResume,
  isLoading,
  openForm,
  setOpenForm,
  count,
}) {
  const [repos, setRepos] = useState([]);
  const [selectedRepos, setSelectedRepos] = useState([]);
  const [userSkills, setUserSkills] = useState([]);

  const [isFetchingRepos, setIsFetchingRepos] = useState(false);

  const {
    register,
    handleSubmit,
    control,
    watch,
    formState: { errors },
  } = useForm({
    defaultValues: {
      name: "",
      bio: "",
      github: "",
      skills: [""],
      experience: [""],
      education: [""],
      hobbies: [""],
      languagesSpoken: [""],
      email: "",
      phone: "",
      address: "",
    },
  });

  const { fields: skillFields, append: appendSkill } = useFieldArray({
    control,
    name: "skills",
  });
  const { fields: expFields, append: appendExp } = useFieldArray({
    control,
    name: "experience",
  });
  const { fields: eduFields, append: appendEdu } = useFieldArray({
    control,
    name: "education",
  });
  const { fields: langFields, append: appendLang } = useFieldArray({
    control,
    name: "languagesSpoken",
  });
  const { fields: hobbyFields, append: appendHobby } = useFieldArray({
    control,
    name: "hobbies",
  });

  const githubUsername = watch("github");
  // const { generateResume, isLoading } = useResumeGenerator();

  const handleGithubFetch = async () => {
    setIsFetchingRepos(true);
    try {
      const { repos, skills } = await fetchGithubData(githubUsername);
      setRepos(repos);
      setUserSkills(skills);
    } catch (error) {
      console.error("Failed to fetch GitHub data", error);
    }

    setIsFetchingRepos(false);
  };

  const onSubmit = async (formData) => {
    generateResume({
      ...formData,
      skills: [...formData.skills.filter(Boolean), ...userSkills],
      projects: selectedRepos,
    });
    setOpenForm(false);
  };

  return (
    <div className="resumeForm_Container">
      {openForm && (
        <div className="form_modal">
          <form className="resume-form" onSubmit={handleSubmit(onSubmit)}>
            <button
              onClick={() => setOpenForm(false)}
              className="close-form-btn"
            >
              &times;
            </button>

            <div>
              <h4>Full Name</h4>
              <input
                type="text"
                placeholder="Full Name"
                {...register("name", { required: true })}
              />
            </div>

            <div>
              <h4>GitHub Username</h4>
              <input
                type="text"
                placeholder="GitHub Username"
                {...register("github", { required: true })}
              />
              <button
                type="button"
                className="fetch-repo-btn"
                onClick={handleGithubFetch}
              >
                Fetch GitHub Top Projects
              </button>
            </div>

            {isFetchingRepos ? (
              <div className="repo-loading">
                <div className="spinner"></div>
                <p>Fetching repositories...</p>
              </div>
            ) : (
              <RepoSelector
                repos={repos}
                selectedRepos={selectedRepos}
                setSelectedRepos={setSelectedRepos}
                isLoading={isLoading}
              />
            )}

            <div>
              <h4>Short Bio (Optional)</h4>
              <textarea
                placeholder="Short Bio (Optional)"
                {...register("bio")}
              />
            </div>

            <h4>
              {" "}
              <i className="fa-solid fa-briefcase"></i> Experience
            </h4>
            <div className="experience-form-grid">
              {" "}
              {expFields.map((_, i) => (
                <input
                  key={i}
                  {...register(`experience.${i}`)}
                  placeholder="E.g. Web Developer at Google (2020-2021)"
                />
              ))}
            </div>

            <button type="button" onClick={() => appendExp("")}>
              + Add Experience
            </button>

            <h4>
              <i className="fa-solid fa-brain"></i> Skills (Optional)
            </h4>
            <div className="experience-form-grid">
              {" "}
              {skillFields.map((_, i) => (
                <input
                  key={i}
                  {...register(`skills.${i}`)}
                  placeholder="E.g. React"
                />
              ))}
            </div>

            <button type="button" onClick={() => appendSkill("")}>
              + Add Skill
            </button>

            <h4>
              {" "}
              <i className="fa-solid fa-graduation-cap"></i> Education
            </h4>
            <div className="experience-form-grid ">
              {" "}
              {eduFields.map((_, i) => (
                <input
                  key={i}
                  {...register(`education.${i}`)}
                  placeholder="E.g. B.Sc. in Computer Science"
                />
              ))}
            </div>

            <button type="button" onClick={() => appendEdu("")}>
              + Add Education
            </button>

            <h4>
              {" "}
              <i className="fa-solid fa-language"></i> Languages Spoken
            </h4>
            <div className="experience-form-grid">
              {langFields.map((_, i) => (
                <input
                  key={i}
                  {...register(`languagesSpoken.${i}`)}
                  placeholder="E.g. English, French"
                />
              ))}
            </div>

            <button type="button" onClick={() => appendLang("")}>
              + Add Language
            </button>

            <h4>
              {" "}
              <i className="fa-solid fa-bullseye"></i> Hobbies
            </h4>
            <div className="experience-form-grid">
              {hobbyFields.map((_, i) => (
                <input
                  key={i}
                  {...register(`hobbies.${i}`)}
                  placeholder="E.g. Chess, Hiking"
                />
              ))}
            </div>

            <button type="button" onClick={() => appendHobby("")}>
              + Add Hobby
            </button>

            <h4>Contacts Details</h4>
            <div className="experience-form-grid">
              <input
                type="email"
                placeholder="Email"
                {...register("email", {
                  required: "Email is required",
                  pattern: {
                    value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                    message: "Enter a valid email address",
                  },
                })}
              />
              {errors.email && (
                <small className="error-text">{errors.email.message}</small>
              )}
              <input
                type="text"
                placeholder="Phone Number"
                {...register("phone", {
                  required: "Phone number is required",
                  pattern: {
                    value: /^\+?[0-9\s\-]{7,15}$/,
                    message: "Enter a valid phone number",
                  },
                })}
              />
              {errors.phone && (
                <p className="error-text">{errors.phone.message}</p>
              )}
              <input
                type="text"
                placeholder="Adress"
                {...register("address", { required: true })}
              />
            </div>

            <button
              type="submit"
              className="resume-btn"
              disabled={isLoading || count >= 2}
            >
              {isLoading
                ? "Generating..."
                : count >= 2
                ? "Daily Limit Reached"
                : "Generate Resume"}
            </button>
          </form>
        </div>
      )}
    </div>
  );
}

export default ResumeForm;
