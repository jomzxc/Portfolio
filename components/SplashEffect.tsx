import React from 'react';

type DuckPhase = 'entering' | 'scanning' | 'noticing' | 'panicking' | 'fleeing';

interface SplashEffectProps {
  phase: DuckPhase;
}

const SplashEffect: React.FC<SplashEffectProps> = ({ phase }) => {
  if (phase !== 'panicking') {
    return null;
  }

  return (
    <div
      aria-hidden="true"
      className="absolute bottom-2 left-1/2 -translate-x-1/2 w-24 h-24"
      style={{ willChange: 'transform, opacity' }}
    >
      <svg viewBox="-50 -50 100 100" preserveAspectRatio="xMidYMid meet" className="w-full h-full">
        <g fill="var(--color-primary)" opacity="0.8">
          <circle cx="0" cy="0" r="5" className="animate-splash-particle-1" style={{ transformOrigin: 'center' }} />
          <circle cx="0" cy="0" r="6" className="animate-splash-particle-2" style={{ transformOrigin: 'center', animationDelay: '0.05s' }} />
          <circle cx="0" cy="0" r="5" className="animate-splash-particle-3" style={{ transformOrigin: 'center' }} />
          <circle cx="0" cy="0" r="4" className="animate-splash-particle-4" style={{ transformOrigin: 'center', animationDelay: '0.1s' }} />
          <circle cx="0" cy="0" r="6" className="animate-splash-particle-5" style={{ transformOrigin: 'center', animationDelay: '0.05s' }} />
        </g>
      </svg>
    </div>
  );
};

export default SplashEffect;