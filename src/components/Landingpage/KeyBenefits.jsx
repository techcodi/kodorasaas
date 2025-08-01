import "./KeyBenefits.css";

const KeyBenefits = () => {
  return (
    <section className="key-benefits">
      <div className="benefits-container">
        <div className="benefits-header">
          <h2 className="benefits-title">Why Choose Kodora?</h2>
          <p className="benefits-subtitle">
            Streamline your developer career with our comprehensive platform
          </p>
        </div>

        <div className="benefits-grid">
          <div className="benefit-card card-blue">
            <div className="benefit-icon">
              <i className="fas fa-magic"></i>
            </div>
            <h3 className="benefit-name">Automated Portfolio Generation</h3>
            <p className="benefit-description">
              Instantly transform your GitHub repositories into stunning,
              professional portfolios with zero manual work required.
            </p>
          </div>

          <div className="benefit-card card-purple">
            <div className="benefit-icon">
              <i className="fas fa-chart-line"></i>
            </div>
            <h3 className="benefit-name">Skills Analytics & Tracking</h3>
            <p className="benefit-description">
              Monitor your skill development over time with detailed analytics
              and insights from your coding activity.
            </p>
          </div>

          <div className="benefit-card card-green">
            <div className="benefit-icon">
              <i className="fas fa-file-alt"></i>
            </div>
            <h3 className="benefit-name">Professional Resume Builder</h3>
            <p className="benefit-description">
              Generate tailored resumes that highlight your best projects and
              skills for your dream developer position.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default KeyBenefits;
