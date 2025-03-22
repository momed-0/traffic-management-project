import React, { useEffect, useRef } from "react";
import { motion, useAnimation } from "framer-motion";

const AnimatedSection = ({ children, sectionKey }) => {
  const controls = useAnimation();
  const ref = useRef(null);

  useEffect(() => {
    const handleScroll = () => {
      if (ref.current) {
        const elementTop = ref.current.getBoundingClientRect().top;
        const windowHeight = window.innerHeight;

        // Trigger animation when the element is in view
        if (elementTop < windowHeight * 0.75) {
          controls.start("visible");
        }
      }
    };

    // Add scroll event listener
    window.addEventListener("scroll", handleScroll);

    // Trigger on initial render
    handleScroll();

    // Cleanup
    return () => window.removeEventListener("scroll", handleScroll);
  }, [controls, sectionKey]); // Use `sectionKey` instead of `key`

  return (
    <motion.div
      ref={ref}
      initial="hidden"
      animate={controls}
      variants={{
        visible: { opacity: 1, y: 0 },
        hidden: { opacity: 0, y: 50 },
      }}
      transition={{ duration: 0.5 }}
    >
      {children}
    </motion.div>
  );
};

export default AnimatedSection;