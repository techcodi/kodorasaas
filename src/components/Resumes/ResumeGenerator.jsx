import ResumeForm from "./ResumeForm";
import ResumePreview from "./ResumePreview";
import "./ResumeGenerator.css";
import { useResumeGenerator } from "./useResumeGenerator";
import Loader from "../Loader";
import { useState } from "react";
import { useAuth } from "../../context/AppContext";

function ResumeGenerator() {
  const { loading } = useAuth();
  const { generateResume, resume, isLoading, isSuccess } = useResumeGenerator();
  const [selectedTemplates, setSelectedTemplates] = useState("modern");
  const [openForm, setOpenForm] = useState(false);

  // ✅ loader for auth check — this is allowed because it's after hook calls
  if (loading) return <Loader />;

  console.log("Loading", isLoading);

  return (
    <div className="resume-container">
      <div className="resume_header-box">
        <h2 className="resume-header">Resume Generator</h2>
        <p className="resume-subtitle">
          Create a professional resume in minutes. Choose a template and fill
          out the form to generate your resume.
        </p>

        <div className="custom-select">
          <div>
            {" "}
            <h3>Choose Template:</h3>
            <select
              value={selectedTemplates}
              onChange={(e) => setSelectedTemplates(e.target.value)}
            >
              <option value="classic">Classic</option>
              <option value="modern">Modern</option>
              <option value="minimal">Normal</option>
            </select>
          </div>
        </div>

        <button onClick={() => setOpenForm(true)} className="btn-resume">
          Create Resume
        </button>
      </div>

      <ResumeForm
        generateResume={generateResume}
        isLoading={isLoading}
        openForm={openForm}
        setOpenForm={setOpenForm}
      />

      {isLoading && (
        <div
          className="spinner-container"
          style={{ textAlign: "center", padding: "1rem" }}
        >
          <div className="spinner"></div>
          <p>Generating your resume...</p>
        </div>
      )}

      {resume && isSuccess && !isLoading && (
        <ResumePreview
          resume={resume}
          template={selectedTemplates}
          isLoading={isLoading}
        />
      )}
    </div>
  );
}

export default ResumeGenerator;
