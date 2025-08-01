import React from "react";
import "./FeaturesShowcase.css";

const FeaturesShowcase = () => {
  const features = [
    {
      icon: "fas fa-sync-alt",
      title: "Real-time GitHub Sync",
      description:
        "Your portfolio automatically updates when you push new code or create new repositories.",
      color: "blue",
    },
    {
      icon: "fas fa-globe",
      title: "Custom Domain Support",
      description:
        "Use your own domain name to create a professional web presence that stands out.",
      color: "purple",
    },
    {
      icon: "fas fa-palette",
      title: "Multiple Portfolio Themes",
      description:
        "Choose from professionally designed themes that showcase your work in the best light.",
      color: "green",
    },
    {
      icon: "fas fa-chart-bar",
      title: "Skills Progress Tracking",
      description:
        "Visualize your skill development over time with detailed analytics and progress charts.",
      color: "yellow",
    },
    {
      icon: "fas fa-file-pdf",
      title: "Resume Templates",
      description:
        "Generate professional resumes using data from your portfolio and GitHub activity.",
      color: "red",
    },
    {
      icon: "fas fa-analytics",
      title: "Project Analytics",
      description:
        "Track portfolio views, project engagement, and visitor insights to optimize your presence.",
      color: "indigo",
    },
  ];

  return (
    <section className="features-showcase" id="feature">
      <div className="features-container">
        <div className="features-header">
          <h2 className="features-title">Powerful Features</h2>
          <p className="features-subtitle">
            Everything you need to build your developer brand
          </p>
        </div>

        <div className="features-grid">
          {features.map((feature, index) => (
            <div key={index} className="feature-card">
              <div className={`feature-icon bg-${feature.color}`}>
                <i className={feature.icon}></i>
              </div>
              <h3 className="feature-name">{feature.title}</h3>
              <p className="feature-description">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturesShowcase;
