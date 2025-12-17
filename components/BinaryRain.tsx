import React, { useEffect, useRef } from 'react';

const BinaryRain: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    // Characters to rain (0 and 1)
    const chars = '01';
    const fontSize = 14;
    const columns = width / fontSize;
    const drops: number[] = [];

    // Initialize drops at random vertical positions to start
    for (let i = 0; i < columns; i++) {
      drops[i] = Math.floor(Math.random() * -height); // Start above canvas
    }

    const draw = () => {
      // Semi-transparent black to create trail effect
      ctx.fillStyle = 'rgba(10, 10, 10, 0.05)';
      ctx.fillRect(0, 0, width, height);

      ctx.fillStyle = '#10b981'; // Emerald/Green text
      ctx.font = `${fontSize}px "JetBrains Mono"`;

      for (let i = 0; i < drops.length; i++) {
        const text = chars.charAt(Math.floor(Math.random() * chars.length));
        
        // Draw 0s and 1s flowing BOTTOM to TOP (reverse rain)? 
        // Scope says "0s and 1s flowing bottom -> top"
        const x = i * fontSize;
        const y = height + drops[i] * fontSize; // Calculating from bottom

        ctx.fillText(text, x, y);

        // Reset when it goes off top
        if (y < 0 && Math.random() > 0.975) {
          drops[i] = 0;
        }

        // Move "up"
        drops[i]--;
      }
    };

    const interval = setInterval(draw, 50);

    const handleResize = () => {
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };

    window.addEventListener('resize', handleResize);

    return () => {
      clearInterval(interval);
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 z-0 opacity-20 pointer-events-none"
    />
  );
};

export default BinaryRain;