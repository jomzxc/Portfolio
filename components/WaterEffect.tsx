import React from 'react';

interface WaterEffectProps {
  isSettling: boolean;
}

const WaterEffect: React.FC<WaterEffectProps> = ({ isSettling }) => {
  // Wrapper for a single layer of waves
  const WaveLayer = ({ animation, path, opacity }: { animation: string; path: string; opacity: number; }) => (
    <div 
      className={`absolute bottom-0 left-0 w-[200%] h-full flex ${animation}`}
      style={{ willChange: 'transform' }}
    >
      {/* Two SVGs side-by-side to fill the 200% width, ensuring a seamless loop */}
      <svg className="w-1/2 h-full" viewBox="0 0 1000 100" preserveAspectRatio="none" style={{ fill: 'var(--color-primary)', opacity }}>
        <path d={path} />
      </svg>
      <svg className="w-1/2 h-full" viewBox="0 0 1000 100" preserveAspectRatio="none" style={{ fill: 'var(--color-primary)', opacity }}>
        <path d={path} />
      </svg>
    </div>
  );

  return (
    <div className={`fixed bottom-0 left-0 w-full h-16 z-40 overflow-hidden pointer-events-none transition-transform duration-[3000ms] ease-in-out ${isSettling ? 'translate-y-full' : 'translate-y-0'}`}>
      <WaveLayer
        animation="animate-wave-slow"
        opacity={0.3}
        path="M0,50 C250,0 250,100 500,50 S750,0 1000,50 L1000,100 L0,100 Z"
      />
      <WaveLayer
        animation="animate-wave-fast"
        opacity={0.4}
        path="M0,60 C200,80 300,40 500,60 S700,80 800,40 C900,20 1000,60 1000,60 L1000,100 L0,100 Z"
      />
    </div>
  );
};

export default WaterEffect;