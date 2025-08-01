import { useDownloadPDF } from "../../../utils/useDownloadPDF";
import "./ModernTemplate.css";

function ModernTemplate({ resume }) {
  const { downloadResume } = useDownloadPDF();

  return (
    <>
      <button
        onClick={() => downloadResume("resume-to-download")}
        className="download-btn"
      >
        Download PDF <i className="fa-solid fa-download"></i>
      </button>

      <div className="resume-preview-wrapper">
        <div id="resume-to-download">
          <div className="modern" id="modern-template">
            <div className="modern-left">
              <header>
                <h2>{resume.name}</h2>
                <h4>
                  <i>{resume.title}</i>
                </h4>
              </header>

              <div className="resume-contact-preview">
                <h3>Contact</h3>
                <p>
                  <i className="fa-solid fa-envelope"></i>{" "}
                  {resume.contact.email}
                </p>
                <p>
                  {" "}
                  <i className="fa-solid fa-phone"></i> {resume.contact.phone}
                </p>
                <p>
                  {" "}
                  <i className="fa-solid fa-map-pin"></i>{" "}
                  {resume.contact.address}
                </p>
                <p>
                  {" "}
                  <i className="fa-solid fa-github"></i> https://github.com/
                  {resume.contact.github}
                </p>
              </div>

              <section className="summary">
                <h3>Summary</h3>
                <p>{resume.summary}</p>
              </section>

              <section>
                <h3>Skills & Tools</h3>
                <div>
                  <p>{Object.values(resume.skills).flat().join(" |")}</p>
                  <p>
                    Problem Solving | Attentions to Detaiils | Debugging | Team
                    Colaboration |
                  </p>
                </div>
              </section>
            </div>

            <div className="modern-rigth">
              {/* <section>
          <h3>Skills & Tools</h3>
          {Object.entries(resume.skills).map(([category, skills], idx) => (
            <div key={idx}>
              <strong>{category}</strong>
              <p>{skills.join(" | ")}</p>
            </div>
          ))}
        </section> */}

              <section>
                <h3>Work Experience</h3>
                {resume.experience.map((exp, i) => (
                  <div key={i}>
                    <strong>{exp.company}</strong>
                    <ul style={{ listStyleType: "disc", marginLeft: "20px" }}>
                      {exp.description.map((desc, j) => (
                        <li key={j} style={{ marginBottom: "10px" }}>
                          {desc}
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </section>

              <section className="projects">
                <h3>Projects</h3>
                {resume.projects.map((proj, i) => (
                  <div key={i}>
                    <strong style={{ textTransform: "capitalize" }}>
                      {proj.name}:
                    </strong>{" "}
                    {proj.description}
                  </div>
                ))}
              </section>

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
                {" "}
                <h3>Languages Spoken</h3>
                <ul>
                  {resume.languagesSpoken.map((lang, i) => (
                    <li key={i}>{lang}</li>
                  ))}
                </ul>
              </div>

              <div>
                {" "}
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
    </>
  );
}

export default ModernTemplate;
