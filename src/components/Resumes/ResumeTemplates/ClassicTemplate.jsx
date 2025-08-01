import "./ClassicTemplate.css";

function ClassicTemplate({ resume }) {
  return (
    <div className="resume-preview classic">
      <h2>
        {resume.name} – {resume.title}
      </h2>
      <div className="resume-contact">
        <p>{resume.contact.email}</p>
        <p>{resume.contact.phone}</p>
        <p>{resume.contact.address}</p>
        <p>{resume.contact.github}</p>
      </div>

      <h3>Summary</h3>
      <p>{resume.summary}</p>

      <h3>Skills & Tools</h3>
      {Object.entries(resume.skills).map(([category, skills], idx) => (
        <div key={idx}>
          <strong>{category}</strong>
          <ul>
            {skills.map((skill, i) => (
              <li key={i}>{skill}</li>
            ))}
          </ul>
        </div>
      ))}

      <h3>Work Experience</h3>
      <ul>
        {resume.experience.map((exp, i) => (
          <li key={i}>
            <strong>{exp.company}</strong>
            <ul>
              {exp.description.map((desc, j) => (
                <li key={j}>{desc}</li>
              ))}
            </ul>
          </li>
        ))}
      </ul>

      <h3>Education</h3>
      <ul>
        {resume.education.map((edu, i) => (
          <li key={i}>{edu}</li>
        ))}
      </ul>

      <h3>Languages Spoken</h3>
      <ul>
        {resume.languagesSpoken.map((lang, i) => (
          <li key={i}>{lang}</li>
        ))}
      </ul>

      <h3>Hobbies</h3>
      <ul>
        {resume.hobbies.map((hobby, i) => (
          <li key={i}>{hobby}</li>
        ))}
      </ul>

      <h3>Projects</h3>
      <ul>
        {resume.projects.map((proj, i) => (
          <li key={i}>
            <strong>{proj.name}:</strong> {proj.description}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default ClassicTemplate;
