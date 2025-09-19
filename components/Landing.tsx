import React, { useState, useEffect } from 'react';

const NAME = "Jommel Rowin S. Sabater";
const TITLES = [
  "Machine Learning Engineer",
  "Software Developer",
];
const TYPING_SPEED = 100;
const DELETING_SPEED = 50;
const PAUSE_DURATION = 2000;

const Landing: React.FC = () => {
  const [nameComplete, setNameComplete] = useState(false);
  const [displayedTitle, setDisplayedTitle] = useState('');
  const [titleIndex, setTitleIndex] = useState(0);
  const [charIndex, setCharIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);

  // Effect to mark name animation as complete
  useEffect(() => {
    const animationTime = (NAME.length * 30) + 800; // Corresponds to CSS animation delay + duration
    const timer = setTimeout(() => {
      setNameComplete(true);
    }, animationTime);
    return () => clearTimeout(timer);
  }, []);

  // Effect for typing/deleting the titles
  useEffect(() => {
    if (!nameComplete) return;

    const handleTyping = () => {
      const currentTitle = TITLES[titleIndex];
      if (isDeleting) {
        if (charIndex > 0) {
          setDisplayedTitle((prev) => prev.substring(0, prev.length - 1));
          setCharIndex((prev) => prev - 1);
        } else {
          setIsDeleting(false);
          setTitleIndex((prev) => (prev + 1) % TITLES.length);
        }
      } else {
        if (charIndex < currentTitle.length) {
          setDisplayedTitle((prev) => prev + currentTitle.charAt(charIndex));
          setCharIndex((prev) => prev + 1);
        } else {
          const pauseTimeout = setTimeout(() => setIsDeleting(true), PAUSE_DURATION);
          return () => clearTimeout(pauseTimeout);
        }
      }
    };

    const speed = isDeleting ? DELETING_SPEED : TYPING_SPEED;
    const typingTimeout = setTimeout(handleTyping, speed);

    return () => clearTimeout(typingTimeout);
  }, [charIndex, isDeleting, titleIndex, nameComplete]);
  
  const animatedName = NAME.split('').map((char, index) => (
    <span
      key={index}
      className="inline-block opacity-0 animate-text-reveal"
      style={{ animationDelay: `${index * 0.03}s` }}
    >
      {char === ' ' ? '\u00A0' : char}
    </span>
  ));

  return (
    <section className="h-screen flex flex-col items-center justify-center relative p-4 snap-section">
      <div className="text-center flex flex-col items-center justify-center space-y-6">
        <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold font-mono tracking-tight text-glow [filter:drop-shadow(0_2px_8px_var(--primary-glow))] break-words">
          {animatedName}
        </h1>
        <div className="h-10 md:h-12">
          {nameComplete && (
            <p className="text-lg sm:text-xl md:text-2xl text-text-main font-sans">
              {displayedTitle}
              <span className="inline-block w-0.5 h-[80%] ml-1 bg-text-main animate-pulse align-middle"></span>
            </p>
          )}
        </div>
      </div>
      
      {nameComplete && (
        <a href="#about" aria-label="Scroll to main content" className="absolute bottom-10 left-1/2 -translate-x-1/2 animate-float cursor-pointer">
          <svg className="w-8 h-8 text-text-muted hover:text-primary transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path>
          </svg>
        </a>
      )}
    </section>
  );
};

export default Landing;
