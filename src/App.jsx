import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import './App.css';

import Home from './components/Home';
import About from './components/About';
import Contact from './components/Contact';
import Projects from './components/Projects'; 
import Stars from './components/Stars';

function App() {
  const [activePage, setActivePage] = useState('home');
  const [isOpen, setIsOpen] = useState(false);

  const fadeVariants = {
    initial: { opacity: 0, x: -20 },
    enter: { opacity: 1, x: 0 },
    exit: { opacity: 0, x: 20 },
  };

  const menuVariants = {
    closed: { x: '-100%', transition: { type: 'spring', stiffness: 300, damping: 30 } },
    opened: { x: 0, transition: { type: 'spring', stiffness: 300, damping: 30 } }
  };

  const navigateTo = (page) => {
    setActivePage(page);
    setIsOpen(false);
  };

  return (
    <div className="app-container">
      {/* 🌌 Background */}
      <Stars />

      {/* 🍔 Hamburger Trigger */}
      <button 
        className="hamburger-btn" 
        onClick={() => setIsOpen(!isOpen)}
        aria-label="Toggle Navigation"
      >
        {isOpen ? '✕' : '☰'}
      </button>

      {/* 🧭 Sliding Navigation Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.nav 
            className="mobile-nav"
            initial="closed"
            animate="opened"
            exit="closed"
            variants={menuVariants}
          >
            <button onClick={() => navigateTo('home')}>Home</button>
            <button onClick={() => navigateTo('about')}>About</button>
            <button onClick={() => navigateTo('projects')}>Projects</button>
            <button onClick={() => navigateTo('contact')}>Contact</button>
          </motion.nav>
        )}
      </AnimatePresence>

      {/* 📄 Pages */}
      <main className="content-area">
        <AnimatePresence mode="wait">
          {/* HOME PAGE */}
          {activePage === 'home' && (
            <motion.div
              key="home"
              variants={fadeVariants}
              initial="initial"
              animate="enter"
              exit="exit"
              transition={{ duration: 0.3 }}
            >
              <Home setActivePage={setActivePage} />
            </motion.div>
          )}

          {/* ABOUT PAGE */}
          {activePage === 'about' && (
            <motion.div
              key="about"
              variants={fadeVariants}
              initial="initial"
              animate="enter"
              exit="exit"
              transition={{ duration: 0.3 }}
            >
              <About />
            </motion.div>
          )}

          {/* PROJECTS PAGE */}
          {activePage === 'projects' && (
            <motion.div
              key="projects"
              variants={fadeVariants}
              initial="initial"
              animate="enter"
              exit="exit"
              transition={{ duration: 0.3 }}
            >
              <Projects />
            </motion.div>
          )}

          {/* CONTACT PAGE */}
          {activePage === 'contact' && (
            <motion.div
              key="contact"
              variants={fadeVariants}
              initial="initial"
              animate="enter"
              exit="exit"
              transition={{ duration: 0.3 }}
            >
              <Contact />
            </motion.div>
          )}
        </AnimatePresence>
      </main>
    </div>
  );
}

export default App;