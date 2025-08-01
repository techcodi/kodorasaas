import React from "react";
import "./HowItWorks.css";

const HowItWorks = () => {
  const steps = [
    {
      number: 1,
      title: "Connect GitHub Account",
      description:
        "Securely link your GitHub account to access your repositories and coding history.",
      imageUrl:
        "https://readdy.ai/api/search-image?query=modern%20github%20logo%20connection%20illustration%20with%20clean%20minimalist%20design%20on%20white%20background%20showing%20connectivity%20and%20integration%20concept&width=200&height=150&seq=step001&orientation=landscape",
      color: "indigo",
    },
    {
      number: 2,
      title: "Select Repositories",
      description:
        "Choose which projects you want to showcase in your professional portfolio.",
      imageUrl:
        "https://readdy.ai/api/search-image?query=clean%20interface%20showing%20multiple%20code%20repositories%20selection%20screen%20with%20checkboxes%20and%20project%20thumbnails%20in%20modern%20flat%20design%20style%20on%20white%20background&width=200&height=150&seq=step002&orientation=landscape",
      color: "purple",
    },
    {
      number: 3,
      title: "Customize Portfolio",
      description:
        "Personalize your portfolio with themes, colors, and layout options that match your style.",
      imageUrl:
        "https://readdy.ai/api/search-image?query=modern%20portfolio%20customization%20interface%20with%20color%20palette%20and%20theme%20options%20displayed%20in%20clean%20minimalist%20design%20on%20white%20background&width=200&height=150&seq=step003&orientation=landscape",
      color: "green",
    },
    {
      number: 4,
      title: "Generate & Share",
      description:
        "Publish your portfolio with a custom domain and share it with potential employers.",
      imageUrl:
        "https://readdy.ai/api/search-image?query=professional%20portfolio%20website%20being%20shared%20across%20multiple%20devices%20and%20platforms%20with%20sharing%20icons%20in%20modern%20clean%20design%20on%20white%20background&width=200&height=150&seq=step004&orientation=landscape",
      color: "orange",
    },
  ];

  return (
    <section className="how-it-works" id="how-it-work">
      <div className="works-container">
        <div className="works-header">
          <h2 className="works-title">How It Works</h2>
          <p className="works-subtitle">Get started in just 4 simple steps</p>
        </div>

        <div className="steps-grid">
          {steps.map((step) => (
            <div key={step.number} className="step-card">
              <div className="step-number-container">
                <div className={`step-number bg-${step.color}`}>
                  {step.number}
                </div>
                <img
                  src={step.imageUrl}
                  alt={step.title}
                  className="step-image"
                />
              </div>
              <h3 className="step-title">{step.title}</h3>
              <p className="step-description">{step.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;
