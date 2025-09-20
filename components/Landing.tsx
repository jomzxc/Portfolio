import React, { useState, useEffect } from 'react';

const NAME = "Jommel Rowin S. Sabater";
const TITLES = [
  "Machine Learning Engineer",
  "Software Developer",
];
const TYPING_SPEED = 80;
const DELETING_SPEED = 50;
const PAUSE_AFTER_TYPING = 1500;
const PAUSE_AFTER_DELETING = 500;

type LandingPhase = 'initial' | 'typingName' | 'animatingTitles';

const Landing: React.FC = () => {
    const [phase, setPhase] = useState<LandingPhase>('initial');
    const [displayName, setDisplayName] = useState('');

    // State for title animation
    const [titleIndex, setTitleIndex] = useState(0);
    const [displayTitle, setDisplayTitle] = useState('');
    const [isDeleting, setIsDeleting] = useState(false);

    // Effect for main phase transitions
    useEffect(() => {
        if (phase === 'initial') {
            const timer = setTimeout(() => setPhase('typingName'), 1000);
            return () => clearTimeout(timer);
        }
        if (phase === 'typingName' && displayName === NAME) {
            // Pause briefly after name is typed, before starting title animation
            const timer = setTimeout(() => setPhase('animatingTitles'), PAUSE_AFTER_DELETING);
            return () => clearTimeout(timer);
        }
    }, [phase, displayName]);

    // Effect for typing the name
    useEffect(() => {
        if (phase !== 'typingName' || displayName.length >= NAME.length) return;

        const timeoutId = setTimeout(() => {
            setDisplayName(NAME.slice(0, displayName.length + 1));
        }, TYPING_SPEED);
        return () => clearTimeout(timeoutId);
    }, [phase, displayName]);
    
    // Effect for the title animation loop
    useEffect(() => {
        if (phase !== 'animatingTitles') return;

        const currentTitle = TITLES[titleIndex];
        let timeoutId: number;

        if (isDeleting) {
            // Handle deleting
            if (displayTitle.length > 0) {
                timeoutId = window.setTimeout(() => {
                    setDisplayTitle(prev => prev.slice(0, -1));
                }, DELETING_SPEED);
            } else {
                // Finished deleting, pause then switch to next title
                timeoutId = window.setTimeout(() => {
                    setIsDeleting(false);
                    setTitleIndex(prev => (prev + 1) % TITLES.length);
                }, PAUSE_AFTER_DELETING);
            }
        } else {
            // Handle typing
            if (displayTitle.length < currentTitle.length) {
                timeoutId = window.setTimeout(() => {
                    setDisplayTitle(prev => currentTitle.slice(0, prev.length + 1));
                }, TYPING_SPEED);
            } else {
                // Finished typing, pause then start deleting
                timeoutId = window.setTimeout(() => {
                    setIsDeleting(true);
                }, PAUSE_AFTER_TYPING);
            }
        }

        return () => clearTimeout(timeoutId);
    }, [phase, displayTitle, isDeleting, titleIndex]);

    const renderCursor = () => (
        <span className="animate-blink">_</span>
    );

    return (
        <section className="h-screen flex flex-col items-center justify-center relative p-4 snap-section landing-vignette">
            <div className="text-center flex flex-col items-center justify-center space-y-6">
                <div className="h-10 sm:h-20 md:h-24 lg:h-28 flex items-center justify-center">
                    <h1 className="text-2xl sm:text-5xl md:text-6xl lg:text-7xl font-bold font-mono tracking-tight text-glow [filter:drop-shadow(0_2px_12px_var(--primary-glow))] whitespace-pre-wrap">
                        {phase === 'initial' && renderCursor()}
                        {phase === 'typingName' && <>{displayName}{displayName.length < NAME.length && renderCursor()}</>}
                        {phase === 'animatingTitles' && NAME}
                    </h1>
                </div>

                <div className="h-10 md:h-12">
                     <p className="text-base sm:text-xl md:text-2xl text-text-main font-sans">
                        {phase === 'animatingTitles' && <>{displayTitle}{renderCursor()}</>}
                     </p>
                </div>
            </div>

            {phase === 'animatingTitles' && (
                <a href="#about" aria-label="Scroll to main content" className="absolute bottom-10 left-1/2 -translate-x-1/2 cursor-pointer">
                    <div className="relative w-8 h-12">
                        {[0, 1, 2].map(i => (
                             <svg key={i} className="w-8 h-8 absolute text-text-muted hover:text-primary transition-colors animate-chevron-rain" style={{ animationDelay: `${i * 0.3}s` }} fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path>
                            </svg>
                        ))}
                    </div>
                </a>
            )}
        </section>
    );
};

export default Landing;
