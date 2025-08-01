import html2pdf from "html2pdf.js";
import "./useDownloadPDF.css";
export function useDownloadPDF() {
  const downloadResume = (elementId, fileName = "My_Resume.pdf") => {
    const element = document.getElementById(elementId);

    if (!element) {
      console.error("Element not found:", elementId);
      return;
    }

    const opt = {
      margin: 0,
      filename: fileName,
      image: { type: "jpeg", quality: 0.99 },
      html2canvas: { scale: 2, useCORS: true },
      jsPDF: { unit: "px", format: [794, 1123], orientation: "portrait" }, // A4 size in px
    };

    html2pdf().set(opt).from(element).save();
  };

  return { downloadResume };
}
