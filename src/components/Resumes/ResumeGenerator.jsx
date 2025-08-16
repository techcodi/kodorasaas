import ResumeForm from "./ResumeForm";
import ResumePreview from "./ResumePreview";
import "./ResumeGenerator.css";
import { useResumeGenerator } from "./useResumeGenerator";
import Loader from "../Loader";
import { useState } from "react";
import { useAuth } from "../../context/AppContext";
import ResumeLoader from "../../ui/ResumeLoader";

function ResumeGenerator() {
  const { loading } = useAuth();
  const { generateResume, resume, isLoading, isSuccess, count } =
    useResumeGenerator();
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

        <p>You have generated {count} / 2 resumes today.</p>

        {count >= 2 && (
          <p className="error-text" style={{ color: "red", marginTop: 8 }}>
            You have reached your daily resume generation limit (2 per day).
          </p>
        )}
      </div>{" "}
      <ResumeForm
        generateResume={generateResume}
        isLoading={isLoading}
        openForm={openForm}
        setOpenForm={setOpenForm}
        count={count}
      />
      {isLoading && <ResumeLoader />}
      {resume && isSuccess && !isLoading && (
        <ResumePreview
          resume={resume}
          template={selectedTemplates}
          isLoading={isLoading}
          count={count}
        />
      )}
    </div>
  );
}

export default ResumeGenerator;
