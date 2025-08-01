import { Link } from "react-router-dom";
import "./CallToAction.css";

const CallToAction = () => {
  return (
    <section className="call-to-action">
      <div className="cta-container">
        <h2 className="cta-title">
          Start Building Your Professional Portfolio Today
        </h2>
        <p className="cta-subtitle">
          Join thousands of developers who have transformed their GitHub
          repositories into career-boosting portfolios
        </p>
        <div className="cta-buttons">
          <Link to="/signup" className="cta-primary rounded-button">
            Get Started Free - No Credit Card Required
          </Link>
          <Link to="/signup" className="cta-secondary rounded-button">
            Schedule a Demo
          </Link>
        </div>
      </div>
    </section>
  );
};

export default CallToAction;
