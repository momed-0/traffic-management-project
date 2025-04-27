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
      description: "Monitor live traffic conditions with real-time updates and visualizations.",
      icon: "🚦",
      side: "left",
    },
    {
      title: "Simulation & Analytics",
      description: "Run simulations and analyze traffic patterns to optimize road usage.",
      icon: "📊",
      side: "right",
    },
    {
      title: "Statistics",
      description: "Access detailed traffic statistics and insights for better decision-making.",
      icon: "📈",
      side: "left",
    },
    {
      title: "Interactive Map",
      description: "Explore an interactive map with real-time traffic data and route planning.",
      icon: "🗺️",
      side: "right",
    },
  ];

  // Refs for GSAP animations
  const heroRef = useRef(null);
  const highlightRefs = useRef([]);
  const containerRef = useRef(null);

  // Initialize highlight refs array
  useEffect(() => {
    highlightRefs.current = highlightRefs.current.slice(0, highlights.length);
  }, [highlights]);

  // GSAP animations on component mount
  useEffect(() => {
    // Hero section animation
    gsap.from(heroRef.current, {
      opacity: 0,
      y: 50,
      duration: 1.5,
      ease: "power3.out",
      delay: 0.3
    });

    // Highlight cards animation with ScrollTrigger
    highlightRefs.current.forEach((ref, index) => {
      gsap.from(ref, {
        opacity: 0,
        y: 80,
        duration: 1,
        ease: "back.out(1.7)",
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top 70%",
          end: "bottom 30%",
          toggleActions: "play none none none",
          markers: false, // Set to true for debugging
        },
        delay: index * 0.15
      });
    });

    // Clean up ScrollTrigger instances
    return () => {
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, []);

  return (
    <div className="landing-page">
      {/* Hero Section */}
      <div ref={heroRef} className="hero-section">
        <h1>Welcome to our Digital Twin for traffic management sytem.</h1>
        <p>Modern traffic solutions at your fingertips.</p>
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
      <div id="what-we-offer" className="what-we-offer" ref={containerRef}>
        <h2>What We Offer</h2>
        <div className="highlights-container">
          <div className="center-line"></div>
          {highlights.map((highlight, index) => (
            <div
              key={index}
              ref={el => (highlightRefs.current[index] = el)}
              className={`highlight ${highlight.side}`}
              style={{ willChange: "opacity, transform" }} // Apply will-change directly to the element
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