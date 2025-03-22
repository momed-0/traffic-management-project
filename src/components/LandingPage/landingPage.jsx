import React, { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Link } from "react-scroll";
import "./landingPage.css";

// Register GSAP plugins
gsap.registerPlugin(ScrollTrigger);

const LandingPage = () => {
  const highlights = [
    {
      title: "Real-time Traffic Monitoring",
      description:
        "Monitor live traffic conditions with real-time updates and visualizations.",
      icon: "🚦",
      side: "left",
    },
    {
      title: "Simulation & Analytics",
      description:
        "Run simulations and analyze traffic patterns to optimize road usage.",
      icon: "📊",
      side: "right",
    },
    {
      title: "Statistics",
      description:
        "Access detailed traffic statistics and insights for better decision-making.",
      icon: "📈",
      side: "left",
    },
    {
      title: "Interactive Map",
      description:
        "Explore an interactive map with real-time traffic data and route planning.",
      icon: "🗺️",
      side: "right",
    },
  ];

  // Refs for GSAP animations
  const heroRef = useRef(null);
  const highlightRefs = useRef([]);

  // GSAP animations on component mount
  useEffect(() => {
    // Hero section animation
    gsap.from(heroRef.current, {
      opacity: 0,
      y: 50,
      duration: 1,
      ease: "power2.out",
    });

    // Highlight cards animation
    highlightRefs.current.forEach((ref, index) => {
      gsap.from(ref, {
        opacity: 0,
        y: 50,
        duration: 1,
        ease: "power2.out",
        scrollTrigger: {
          trigger: ref,
          start: "top 80%", // Animation starts when the card is 80% in view
          end: "bottom 20%", // Animation ends when the card is 20% out of view
          toggleActions: "play none none reverse", // Retrigger animation on scroll up and down
        },
      });
    });
  }, []);

  return (
    <div className="landing-page">
      {/* Hero Section */}
      <div ref={heroRef} className="hero-section">
        <h1>Welcome to our Traffic Management System</h1>
        <p>Smart Traffic Management at Your Fingertips.</p>
        <Link
          to="what-we-offer"
          smooth={true}
          duration={500}
          className="cta-button"
        >
          Explore Features
        </Link>
      </div>

      {/* What We Offer Section */}
      <div id="what-we-offer" className="what-we-offer">
        <h2>What We Offer</h2>
        <div className="highlights-container">
          <div className="center-line"></div>
          {highlights.map((highlight, index) => (
            <div
              key={index}
              ref={(el) => (highlightRefs.current[index] = el)}
              className={`highlight ${highlight.side}`}
            >
              <div className="icon">{highlight.icon}</div>
              <h3>{highlight.title}</h3>
              <p>{highlight.description}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default LandingPage;