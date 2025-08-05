import ClassicTemplate from "./ResumeTemplates/ClassicTemplate";
import MinimalTemplate from "./ResumeTemplates/MinimalTemplate";
import ModernTemplate from "./ResumeTemplates/ModernTemplate";
import Loader from "../Loader"; // Or your spinner

function ResumePreview({ resume, template, isLoading }) {
  if (isLoading) return <Loader />;
  if (!resume) return <p>No resume generated yet.</p>;

  switch (template) {
    case "modern":
      return <ModernTemplate resume={resume} />;
    case "minimal":
      return <MinimalTemplate resume={resume} />;
    default:
      return <ClassicTemplate resume={resume} />;
  }
}

export default ResumePreview;
