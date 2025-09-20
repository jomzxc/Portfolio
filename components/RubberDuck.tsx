import React, { useState, useEffect, useRef } from 'react';
import SplashEffect from './SplashEffect';

type DuckPhase = 'entering' | 'scanning' | 'noticing' | 'panicking' | 'fleeing';

interface RubberDuckProps {
  onClose: () => void;
}

const RubberDuck: React.FC<RubberDuckProps> = ({ onClose }) => {
  const [phase, setPhase] = useState<DuckPhase>('entering');
  const duckGroupRef = useRef<SVGGElement>(null);
  const animationFrameId = useRef<number | null>(null);

  useEffect(() => {
    const phaseTimers = {
      entering: 5000,
      scanning: 5000,
      noticing: 1000,
      panicking: 1500,
      fleeing: 3000,
    };

    let timer: number;

    switch (phase) {
      case 'entering':
        timer = window.setTimeout(() => setPhase('scanning'), phaseTimers.entering);
        break;
      case 'scanning':
        timer = window.setTimeout(() => setPhase('noticing'), phaseTimers.scanning);
        break;
      case 'noticing':
        timer = window.setTimeout(() => setPhase('panicking'), phaseTimers.noticing);
        break;
      case 'panicking':
        timer = window.setTimeout(() => setPhase('fleeing'), phaseTimers.panicking);
        break;
      case 'fleeing':
        timer = window.setTimeout(onClose, phaseTimers.fleeing);
        break;
    }

    return () => clearTimeout(timer);
  }, [phase, onClose]);

  useEffect(() => {
    const duckElement = duckGroupRef.current;
    if (!duckElement || phase === 'panicking') {
      if (animationFrameId.current) {
        cancelAnimationFrame(animationFrameId.current);
        animationFrameId.current = null;
      }
      if (duckElement) {
        duckElement.style.transform = '';
      }
      return;
    }

    const animate = (time: number) => {
      // The 'wave-fast' animation moves two full wave patterns across the screen in 8 seconds.
      // Therefore, the period for a single wave cycle passing under the duck is 4 seconds.
      const period = 4000;
      
      // The visual wave starts at its midpoint and rises. A standard cosine wave starts at a trough.
      // We add a 90-degree (PI/2) phase shift to align our mathematical model with the visual wave.
      const phaseShift = Math.PI / 2;
      const angle = (time / period) * 2 * Math.PI + phaseShift;

      // --- Physics of the Floating Motion ---

      // 1. Vertical Motion (Bobbing)
      // With the phase shift, the y-position now correctly starts at the wave's midpoint,
      // rises to a crest, and falls to a trough, matching the visual wave.
      const y = -8 * (1 - Math.cos(angle));

      // 2. Slope & Rotation
      // The slope calculation is derived from the y-position's derivative. This determines the tilt.
      const slopeFactor = Math.sin(angle);
      // When rising (positive slopeFactor), the duck tilts counter-clockwise (negative rotation)
      // to face "uphill" against the wave coming from the right.
      const rotation = -7 * slopeFactor;

      // 3. Horizontal Motion (Drifting)
      // The duck is pushed slightly left (negative x) on the wave's front (while rising)
      // and right (positive x) on its back (while falling).
      const x = -4 * slopeFactor;

      duckElement.style.transform = `translateY(${y}px) translateX(${x}px) rotate(${rotation}deg)`;
      
      animationFrameId.current = requestAnimationFrame(animate);
    };

    animationFrameId.current = requestAnimationFrame(animate);

    return () => {
      if (animationFrameId.current) {
        cancelAnimationFrame(animationFrameId.current);
      }
    };
  }, [phase]);

  const getContainerAnimation = () => {
    switch (phase) {
      case 'entering':
        return 'animate-duck-walk-in';
      case 'panicking':
        return 'animate-duck-jump';
      case 'fleeing':
        return 'animate-duck-run-out';
      case 'scanning':
      case 'noticing':
        return 'translate-x-[calc(50vw-40px)]'; // Apply transform for stationary phases
      default:
        return '';
    }
  };
  
  const getHeadAnimation = () => {
    switch(phase) {
      case 'entering':
      case 'fleeing':
        return 'animate-duck-head-turn';
      case 'scanning':
        return 'animate-look-left-right';
      default:
        return '';
    }
  };

  const showFrontFace = phase === 'noticing' || phase === 'panicking';

  return (
    <div
      aria-hidden="true"
      className={`fixed -bottom-4 z-50 w-20 h-32 drop-shadow-lg ${getContainerAnimation()}`}
      style={{ willChange: 'transform' }}
    >
      {phase === 'scanning' && (
        <div className="absolute top-4 left-1/2 -translate-x-1/2 animate-speech-bubble-appear">
          <div className="relative bg-white text-black rounded-full w-12 h-12 flex items-center justify-center shadow-lg">
            <span className="text-3xl font-bold animate-question-mark-float select-none">?</span>
            <div className="absolute bottom-[-8px] left-1/2 -translate-x-1/2 w-0 h-0 border-l-[10px] border-l-transparent border-t-[15px] border-t-white border-r-[10px] border-r-transparent"></div>
          </div>
        </div>
      )}
      {phase === 'panicking' && (
        <div className="absolute top-4 left-1/2 -translate-x-1/2 animate-speech-bubble-appear">
          <div className="relative bg-white text-red-500 rounded-full w-12 h-12 flex items-center justify-center shadow-lg">
            <span className="text-4xl font-bold animate-question-mark-float select-none">!</span>
            <div className="absolute bottom-[-8px] left-1/2 -translate-x-1/2 w-0 h-0 border-l-[10px] border-l-transparent border-t-[15px] border-t-white border-r-[10px] border-r-transparent"></div>
          </div>
        </div>
      )}
      <SplashEffect phase={phase} />
      <svg
        viewBox="0 0 100 100"
        xmlns="http://www.w3.org/2000/svg"
        className="absolute bottom-0 w-full h-20"
        style={{ filter: 'drop-shadow(0 4px 8px var(--primary-glow))' }}
        overflow="visible"
      >
        <g ref={duckGroupRef}>
          <path
            fill="#FFD700"
            d="M10,65 C10,45 40,35 55,50 L80,55 C100,60 100,80 80,80 L20,80 C0,80 0,65 10,65 Z"
          />
          {showFrontFace ? (
            <g>
              <ellipse cx="55" cy="45" rx="25" ry="22" fill="#FFD700" />
              <ellipse cx="55" cy="58" rx="15" ry="8" fill="#FF6347" />
              <circle fill="#212121" cx="45" cy="42" r="3.5" />
              <circle fill="#212121" cx="65" cy="42" r="3.5" />
            </g>
          ) : (
            <g
              className={getHeadAnimation()}
              style={{ transformOrigin: '55px 60px' }}
            >
              <path fill="#FFD700" d="M50,55 C40,30 70,20 85,35 C95,45 80,65 65,60 L50,55 Z" />
              <path fill="#FF6347" d="M82,38 C95,35 100,45 88,44 L82,38 Z" />
              <circle fill="#212121" cx="75" cy="42" r="3.5" />
            </g>
          )}
        </g>
      </svg>
    </div>
  );
};

export default RubberDuck;