import "./MinimalTemplate.css";
import { useDownloadPDF } from "../../../utils/useDownloadPDF";

function MinimalTemplate({ resume }) {
  const { downloadResume } = useDownloadPDF();

  return (
    <div className="">
      <button
        onClick={() => downloadResume("normal-resume-to-download")}
        className="download-btn"
      >
        Download PDF <i className="fa-solid fa-download"></i>
      </button>
      <div className="normal-wraper-resume">
        <div className="" id="normal-resume-to-download">
          <div className="minimal">
            <div className="minimal-left">
              <div className="minal-header">
                <h2>{resume.name}</h2>
                <div className="minal-header-contact">
                  <p style={{ textTransform: "capitalize" }}>
                    <strong>Address: </strong>
                    {resume.contact.address}
                  </p>
                  <p
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "3px",
                    }}
                  >
                    <strong>Email:</strong>
                    <span>{resume.contact.email}</span> |
                  </p>
                  <p>
                    {" "}
                    <strong>Phone: </strong>
                    {resume.contact.phone}
                  </p>
                </div>
                <p className="github-link">
                  GitHub: https://github.com/{resume.contact.github}{" "}
                </p>
              </div>
              <div>
                <h4 style={{ fontSize: "25px" }}>{resume.title}</h4>
                <h3>Professional Summary</h3>
                <p>{resume.summary}</p>
              </div>
              <div>
                <div>
                  <h3>Experience</h3>
                  {resume.experience.map((exp, i) => (
                    <div key={i}>
                      <strong style={{ color: "#555" }}>{exp.company}</strong>
                      <ul>
                        {exp.description.map((desc, j) => (
                          <li key={j}>{desc}</li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>
              </div>
              <div>
                {" "}
                <h3>Projects</h3>
                {resume.projects.map((proj, i) => (
                  <div key={i} style={{ marginBottom: "10px" }}>
                    <strong
                      style={{ textTransform: "capitalize", color: "#555" }}
                    >
                      {proj.name}
                    </strong>{" "}
                    – {proj.description}
                  </div>
                ))}
              </div>
            </div>
            <div className="minimal-rigth">
              <div className="minimal-skills">
                {" "}
                <h3>Skills</h3>
                {Object.entries(resume.skills).map(([category, skills]) => {
                  if (!skills || skills.length === 0) return null; // ⛔ skip empty categories

                  return (
                    <div key={category} style={{ marginBottom: "1rem" }}>
                      <strong
                        style={{
                          textTransform: "capitalize",
                          color: "#444444",
                        }}
                      >
                        {category}
                      </strong>
                      <ul>
                        {skills.map((skill, i) => (
                          <li key={i}>{skill}</li>
                        ))}
                      </ul>
                    </div>
                  );
                })}
                <div className="core-skills">
                  <strong>Soft Skills</strong>
                  <ul>
                    <li>Problem Solving</li>
                    <li>Attention to Detail</li>
                    <li>Debugging</li>
                    <li>Team Collaboration</li>
                  </ul>
                </div>
              </div>

              <div>
                <h3>Education</h3>
                <ul>
                  {resume.education.map((edu, i) => (
                    <li style={{ textTransform: "capitalize" }} key={i}>
                      {edu}
                    </li>
                  ))}
                </ul>
              </div>

              <div>
                <h3>Languages Spoken</h3>
                <ul>
                  {resume.languagesSpoken.map((lang, i) => (
                    <li style={{ textTransform: "capitalize" }} key={i}>
                      {lang}
                    </li>
                  ))}
                </ul>
              </div>

              <div>
                <h3>Hobbies</h3>
                <ul>
                  {resume.hobbies.map((hobby, i) => (
                    <li style={{ textTransform: "capitalize" }} key={i}>
                      {hobby}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default MinimalTemplate;
