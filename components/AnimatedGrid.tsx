import React, { useRef, useEffect } from 'react';

const FONT_SIZE = 16;
const CHARS = 'アァカサタナハマヤャラワガザダバパイィキシチニヒミリヰギジヂビピウゥクスツヌフムユュルグズブヅプエェケセテネヘメレヱゲゼデベペオォコソトノホモヨョロヲゴゾドボポヴッン0123456789';

const AnimatedGrid: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const dropsRef = useRef<number[]>([]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;

    const getThemeColor = (name: string) => getComputedStyle(document.documentElement).getPropertyValue(name).trim();

    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;

      const columns = Math.floor(canvas.width / FONT_SIZE);
      dropsRef.current = [];
      for (let i = 0; i < columns; i++) {
        dropsRef.current[i] = Math.random() * canvas.height;
      }
    };

    const draw = () => {
      // Use theme color for the background trail effect
      const bgColor = getThemeColor('--color-bg-main');
      ctx.fillStyle = `${bgColor}1A`; // Adds low opacity for trail effect
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      const textColor = getThemeColor('--color-primary');
      ctx.fillStyle = textColor;
      ctx.font = `${FONT_SIZE}px 'Roboto Mono', monospace`;

      const drops = dropsRef.current;
      for (let i = 0; i < drops.length; i++) {
        const text = CHARS[Math.floor(Math.random() * CHARS.length)];
        ctx.fillText(text, i * FONT_SIZE, drops[i] * FONT_SIZE);

        if (drops[i] * FONT_SIZE > canvas.height && Math.random() > 0.975) {
          drops[i] = 0;
        }
        drops[i]++;
      }
    };

    const animate = () => {
      draw();
      animationFrameId = requestAnimationFrame(animate);
    };

    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);
    animate();

    return () => {
      window.removeEventListener('resize', resizeCanvas);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <canvas 
      ref={canvasRef} 
      className="fixed top-0 left-0 w-full h-full opacity-50"
    />
  );
};

export default AnimatedGrid;
