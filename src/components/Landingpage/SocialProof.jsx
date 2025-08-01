import React from "react";
import "./SocialProof.css";

const SocialProof = () => {
  const testimonials = [
    {
      name: "Alex Chen",
      role: "Frontend Developer",
      quote:
        "Kodora helped me land my dream job at a top tech company. The automated portfolio generation saved me weeks of work!",
      imageUrl:
        "https://readdy.ai/api/search-image?query=professional%20headshot%20of%20young%20male%20software%20developer%20with%20friendly%20smile%20in%20modern%20office%20setting%20with%20clean%20background&width=60&height=60&seq=testimonial001&orientation=squarish",
    },
    {
      name: "Sarah Johnson",
      role: "Full Stack Developer",
      quote:
        "The skills tracking feature is incredible. I can see exactly how I've grown as a developer over the past year.",
      imageUrl:
        "https://readdy.ai/api/search-image?query=professional%20headshot%20of%20young%20female%20software%20engineer%20with%20confident%20expression%20in%20modern%20tech%20office%20with%20clean%20background&width=60&height=60&seq=testimonial002&orientation=squarish",
    },
    {
      name: "Mike Rodriguez",
      role: "Backend Developer",
      quote:
        "The resume builder is a game-changer. It perfectly highlights my GitHub projects in a professional format.",
      imageUrl:
        "https://readdy.ai/api/search-image?query=professional%20headshot%20of%20young%20male%20backend%20developer%20with%20glasses%20and%20warm%20smile%20in%20contemporary%20workspace%20with%20clean%20background&width=60&height=60&seq=testimonial003&orientation=squarish",
    },
  ];

  const stats = [
    { value: "100+", label: "Active Developers" },
    { value: "500+", label: "Portfolios Generated" },
    { value: "95%", label: "Success Rate" },
    { value: "99+", label: "Companies Hiring" },
  ];

  return (
    <section className="social-proof">
      <div className="proof-container">
        <div className="proof-header">
          <h2 className="proof-title">Trusted by Developers Worldwide</h2>
          <p className="proof-subtitle">
            Join thousands of developers who have transformed their careers
          </p>
        </div>

        <div className="proof-stats">
          {stats.map((stat, index) => (
            <div key={index} className="stat-item">
              <div className="stat-value">{stat.value}</div>
              <div className="stat-label">{stat.label}</div>
            </div>
          ))}
        </div>

        <div className="testimonials-grid">
          {testimonials.map((testimonial, index) => (
            <div key={index} className="testimonial-card">
              <div className="testimonial-header">
                <img
                  src={testimonial.imageUrl}
                  alt={testimonial.name}
                  className="testimonial-image"
                />
                <div>
                  <div className="testimonial-name">{testimonial.name}</div>
                  <div className="testimonial-role">{testimonial.role}</div>
                </div>
              </div>
              <p className="testimonial-quote">"{testimonial.quote}"</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default SocialProof;
