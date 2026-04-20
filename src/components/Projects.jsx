import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

// Assets
import eventHorizon from '../assets/event-horizon.jpg';
import kanbanBoard from '../assets/kanban-board.png';
import nebulaDashboard from '../assets/nebula-dashboard.png';
import novaAI from  '../assets/nova-ai.png';
import pulsarAudio from '../assets/pulsar-audio.jpg';
import stellarEdit from '../assets/stellar-edit.png';
import taskManagement from '../assets/task-management.jpg';
import thisProject from '../assets/this-project.png';

const Projects = () => {
  const [loadedCount, setLoadedCount] = useState(0);
  const [isReady, setIsReady] = useState(false);

  const projectList = [
    { id: 1, title: "Portfolio 2026", img: thisProject, desc: "This very website!", tech: "Framer Motion" },
    { id: 2, title: "Task Manager", img: taskManagement, desc: "Drag and drop productivity.", tech: "Redux" },
    { id: 3, title: "Nebula Dash", img: nebulaDashboard, desc: "High-performance data visualization.", tech: "Chart.js, Firebase" },
    { id: 4, title: "Orbit Tasks", img: kanbanBoard, desc: "A gravity-based kanban board.", tech: "React.js, Tailwind" },
    { id: 5, title: "Nova AI", img: novaAI, desc: "Minimalist LLM interface.", tech: "OpenAI, Next.js" },
    { id: 6, title: "Event Horizon", img: eventHorizon, desc: "Encrypted vault for secure notes.", tech: "REST API" },
    { id: 7, title: "Pulsar Audio", img: pulsarAudio, desc: "Real-time reactive music visualizer.", tech: "Web Audio" },
    { id: 8, title: "Stellar Edit", img: stellarEdit, desc: "Zen-mode Markdown writing tool.", tech: "React-Markdown" },
  ];

  // Logic: Reveal if all images load OR if 2 seconds pass (Safety Net)
  useEffect(() => {
    if (loadedCount >= projectList.length) {
      setIsReady(true);
    }
  }, [loadedCount, projectList.length]);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsReady(true);
    }, 2000); // 2 second max wait
    return () => clearTimeout(timer);
  }, []);
  
return (
    <div className="projects-container">
      <h1 className="project-title">My Work</h1>

      <motion.div 
        className="projects-grid"
        initial={{ opacity: 0, y: 10 }}
        animate={{ 
          opacity: isReady ? 1 : 0, 
          y: isReady ? 0 : 10 
        }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        style={{ 
          display: 'grid', 
          gap: '20px', 
          gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))' 
        }}
      >
        {projectList.map((project) => (
          <motion.div 
            key={project.id} 
            className="project-card"
            whileHover={{ 
              scale: 1.03,
              transition: { duration: 0.2 } 
            }}
            whileTap={{ scale: 0.98 }}
          >
            <div className="card-header">
              <img 
                src={project.img} 
                alt={project.title} 
                className="project-img" 
                onLoad={() => setLoadedCount(prev => prev + 1)}
                onError={() => setLoadedCount(prev => prev + 1)} 
              />
              <div className="title-area">
                <span className="tech-badge">{project.tech}</span>
                <h3>{project.title}</h3>
              </div>
            </div>
            <p className="project-desc">{project.desc}</p>
            <button className="view-btn">View Details</button>
          </motion.div>
        ))}
      </motion.div>
    </div>
  );
};

export default Projects;