import { useState } from "react";

import Header from "../components/Landingpage/Header";
import HeroSection from "../components/Landingpage/HeroSection";
import KeyBenefits from "../components/Landingpage/KeyBenefits";
import HowItWorks from "../components/Landingpage/HowItWorks";
import FeaturesShowcase from "../components/Landingpage/FeaturesShowcase";
import SocialProof from "../components/Landingpage/SocialProof";
import CallToAction from "../components/Landingpage/CallToAction";
import Footer from "../components/Landingpage/Footer";
import "./Landingpage.css";

function LandingPage() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <div className="landing-page">
      <Header isMenuOpen={isMenuOpen} setIsMenuOpen={setIsMenuOpen} />

      <HeroSection />
      <div className="landing-page-content">
        <KeyBenefits />
        <HowItWorks />
        <FeaturesShowcase />
        <SocialProof />
        <CallToAction />
        <Footer />
      </div>
    </div>
  );
}
export default LandingPage;
