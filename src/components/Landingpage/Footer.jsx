import React from "react";
import "./Footer.css";

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-container">
        <div className="footer-grid">
          <div className="footer-about">
            <div className="footer-logo">Kodora</div>
            <p className="footer-description">
              Transform your GitHub into a professional portfolio and accelerate
              your developer career.
            </p>
            <div className="footer-social">
              <a href="#" className="social-link">
                <i className="fab fa-twitter"></i>
              </a>
              <a href="#" className="social-link">
                <i className="fab fa-github"></i>
              </a>
              <a href="#" className="social-link">
                <i className="fab fa-linkedin"></i>
              </a>
            </div>
          </div>

          <div className="footer-links">
            <h3 className="footer-heading">Product</h3>
            <ul className="footer-list">
              <li>
                <a href="#" className="footer-link">
                  Features
                </a>
              </li>
              <li>
                <a href="#" className="footer-link">
                  Pricing
                </a>
              </li>
              <li>
                <a href="#" className="footer-link">
                  Templates
                </a>
              </li>
              <li>
                <a href="#" className="footer-link">
                  Integrations
                </a>
              </li>
            </ul>
          </div>

          <div className="footer-links">
            <h3 className="footer-heading">Company</h3>
            <ul className="footer-list">
              <li>
                <a href="#" className="footer-link">
                  About Us
                </a>
              </li>
              <li>
                <a href="#" className="footer-link">
                  Careers
                </a>
              </li>
              <li>
                <a href="#" className="footer-link">
                  Blog
                </a>
              </li>
              <li>
                <a href="#" className="footer-link">
                  Contact
                </a>
              </li>
            </ul>
          </div>

          <div className="footer-newsletter">
            <h3 className="footer-heading">Newsletter</h3>
            <p className="footer-description">
              Stay updated with the latest features and developer tips.
            </p>
            <div className="newsletter-form">
              <input
                type="email"
                placeholder="Enter your email"
                className="newsletter-input"
              />
              <button className="newsletter-button rounded-button">
                Subscribe
              </button>
            </div>
          </div>
        </div>

        <div className="footer-bottom">
          <div className="footer-copyright">
            © 2025 Kodora. All rights reserved.
          </div>
          <div className="footer-legal">
            <a href="#" className="footer-link">
              Privacy Policy
            </a>
            <a href="#" className="footer-link">
              Terms of Service
            </a>
            <a href="#" className="footer-link">
              Cookie Policy
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
