import "./HeroSection.css";
import { Link } from "react-router-dom";
// import { useAuth } from "../../context/AppContext";

const HeroSection = () => {
  // const { isDarkMode } = useAuth();

  // const heroDarkImageUrl = "/dark.jpg";
  // const heroLightImageUrl = "/ligth1.jpeg";
  return (
    <section className="hero-section">
      <div className="hero-container">
        <div className="hero-grid">
          <div className="hero-content">
            <h1 className="hero-title">
              Transform Your GitHub Into A
              <span className="highlight"> Professional Portfolio</span>
            </h1>
            <p className="hero-description">
              Build, track and showcase your developer journey with ease. Create
              stunning portfolios and professional resumes tailored to your
              dream job.
            </p>
            <div className="hero-buttons">
              <Link to="/signup" className="animated-border rounded-button">
                Get Started Free
              </Link>
              <Link to="/login" className="secondary-button rounded-button">
                View Demo
              </Link>
            </div>
          </div>

          <img src="/hero-img.png" alt="hero-image" className="hero-img" />
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
