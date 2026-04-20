import React, { useState, useEffect } from "react"; // eslint-disable-next-line no-unused-vars
import { motion, AnimatePresence } from "framer-motion";

const phrases = [
  "Game Dev • AI • Web Systems",
  "Building Worlds • Training Models • Creating Experiences",
  "Where Code Meets Creativity"
];

function Home({ setActivePage }) {
  const [index, setIndex] = useState(0);
  const [fade, setFade] = useState(true);

  useEffect(() => {
    const interval = setInterval(() => {
      setFade(false);

      const timeout = setTimeout(() => {
        setIndex((prev) => (prev + 1) % phrases.length);
        setFade(true);
      }, 300);

      return () => clearTimeout(timeout);
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="hero-container">
      <div className="hero-card">
        <h1 className="hero-title">MEGAN BRITTANY</h1>
        
        <div className="hero-subtitle">
          <AnimatePresence mode="wait">
            {fade && (
              <motion.span
                key={index}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.3 }}
              >
                {phrases[index]}
              </motion.span>
            )}
          </AnimatePresence>
        </div>

        <div className="button-group">
          <button 
            className="button-outline" 
            onClick={() => setActivePage('about')}
          >
            ABOUT ME
          </button>
          <button 
            className="button-filled" 
            onClick={() => setActivePage('projects')}
          >
            MY PROJECTS
          </button>
        </div>
      </div>
    </div>
  );
}

export default Home;