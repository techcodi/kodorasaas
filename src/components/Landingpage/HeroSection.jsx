import React from "react";
import "./HeroSection.css";
import { Link } from "react-router-dom";

const HeroSection = () => {
  const heroImageUrl = "future.jpg";

  return (
    <section
      className="hero-section"
      style={{
        backgroundImage: `url(${heroImageUrl})`,
      }}
    >
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
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
