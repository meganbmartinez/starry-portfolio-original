import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import './About.css';

import animeCoding from '../assets/anime-girl-coding.jpg';
import { FaGithub, FaLinkedin } from 'react-icons/fa';

function About() {
  const [isReady, setIsReady] = useState(false);

  // Safety net: Show content after 1.5 seconds even if the image is slow
  useEffect(() => {
    const timer = setTimeout(() => setIsReady(true), 1500);
    return () => clearTimeout(timer);
  }, []);

  return (
    <motion.div 
      className="about-container"
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: isReady ? 1 : 0, y: isReady ? 0 : 15 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
    >
      <div className="about-card">
        <h2 className="about-title">About Me</h2>
        
        <div className="about-image">
          <img 
            src={animeCoding} 
            alt="anime girl coding" 
            onLoad={() => setIsReady(true)} // Reveal immediately once this image loads
            onError={() => setIsReady(true)}  // Reveal if image link is broken
          />
        </div>

        <p className="about-description">
          Hi I'm <strong>Megan</strong>, web developer from <strong>SoCal! </strong> 
          I'm passionate about <strong>game development, AI, and web systems</strong>. 
          As a graduate student, I've channeled this interest into <strong>competitive research</strong>, 
          where I enjoy the challenge of presenting and defending technical innovations in high-stakes environments. 
          Outside of coding, I love exploring <strong>video editing</strong> as a creative outlet—the 
          perfect blend of technical precision and narrative storytelling.
        </p>

		<div className="about-social-links">
		  <a href="https://github.com/" target="_blank" rel="noopener noreferrer">
			<FaGithub size={30} /> 
		  </a>
		  <a href="https://linkedin.com/" target="_blank" rel="noopener noreferrer">
			<FaLinkedin size={30} />
		  </a>
		</div>
	</div>
    </motion.div>
  );
}

export default About;