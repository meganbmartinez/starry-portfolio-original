import React, { useEffect, useRef } from "react";

const Stars = () => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");

    let particles = [];
    const particleCount = 80;

    const starChars = ['★', '✦', '✶', '✧'];

    const yellowShades = [
      'rgba(255, 255, 255, 0.9)',
      'rgba(254, 243, 199, 0.8)',
      'rgba(253, 230, 138, 0.8)',
    ];

    function init() {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;

      particles = [];

      for (let i = 0; i < particleCount; i++) {
        const isHero = Math.random() > 0.8;

        particles.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          vx: (Math.random() - 0.5) * 1.0,
          vy: (Math.random() - 0.5) * 1.0,
          size: Math.random() * 8 + 8,
          char: starChars[Math.floor(Math.random() * starChars.length)],
          color: yellowShades[Math.floor(Math.random() * yellowShades.length)],

          glowBase: isHero ? 15 : 2,
          glowRange: isHero ? 20 : 5,
          pulseSpeed: Math.random() * 0.05 + 0.01,
          pulseTimer: Math.random() * Math.PI * 2
        });
      }
    }

    function animate() {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      ctx.strokeStyle = 'rgba(255, 255, 255, 0.08)';
      ctx.lineWidth = 1;

      particles.forEach((p, i) => {
        p.x += p.vx;
        p.y += p.vy;
        p.pulseTimer += p.pulseSpeed;

        if (p.x < 0 || p.x > canvas.width) p.vx *= -1;
        if (p.y < 0 || p.y > canvas.height) p.vy *= -1;

        const currentGlow =
          p.glowBase + (Math.sin(p.pulseTimer) + 1) * p.glowRange;

        ctx.shadowBlur = currentGlow;
        ctx.shadowColor = p.color;
        ctx.fillStyle = p.color;

        ctx.font = `${p.size}px serif`;
        ctx.textAlign = "center";
        ctx.textBaseline = "middle";

        ctx.fillText(p.char, p.x, p.y);

        for (let j = i + 1; j < particles.length; j++) {
          const p2 = particles[j];
          const dist = Math.hypot(p.x - p2.x, p.y - p2.y);

          if (dist < 120) {
            ctx.beginPath();
            ctx.moveTo(p.x, p.y);
            ctx.lineTo(p2.x, p2.y);
            ctx.shadowBlur = 0;
            ctx.stroke();
          }
        }
      });

      requestAnimationFrame(animate);
    }

    function handleResize() {
      init();
    }

    window.addEventListener("resize", handleResize);

    init();
    animate();

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        zIndex: 0,
      }}
    />
  );
};

export default Stars;