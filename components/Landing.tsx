import React, { useState, useEffect, useRef } from 'react';

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
    const [isIntersecting, setIsIntersecting] = useState(false); // State to track visibility

    // State for title animation
    const [titleIndex, setTitleIndex] = useState(0);
    const [displayTitle, setDisplayTitle] = useState('');
    const [isDeleting, setIsDeleting] = useState(false);

    // Ref for Web Audio API context and the section element
    const audioContextRef = useRef<AudioContext | null>(null);
    const sectionRef = useRef<HTMLElement>(null); // Ref for the section

    // --- Intersection Observer ---
    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                setIsIntersecting(entry.isIntersecting);
            },
            { threshold: 0.1 } // Start animation when 10% is visible
        );

        const currentRef = sectionRef.current;
        if (currentRef) {
            observer.observe(currentRef);
        }

        return () => {
            if (currentRef) {
                observer.unobserve(currentRef);
            }
        };
    }, []);

    // --- Audio Generation ---
    const getAudioContext = (): AudioContext | null => {
        if (typeof window === 'undefined') return null;
        if (!audioContextRef.current) {
            try {
                audioContextRef.current = new (window.AudioContext || (window as any).webkitAudioContext)();
            } catch (e) {
                console.error("Web Audio API is not supported in this browser.");
                return null;
            }
        }
        if (audioContextRef.current.state === 'suspended') {
            audioContextRef.current.resume();
        }
        return audioContextRef.current;
    };

    const playSound = (type: 'typing' | 'deleting') => {
        const audioContext = getAudioContext();
        if (!audioContext) return;

        const oscillator = audioContext.createOscillator();
        const gainNode = audioContext.createGain();

        oscillator.connect(gainNode);
        gainNode.connect(audioContext.destination);

        if (type === 'typing') {
            oscillator.type = 'triangle';
            oscillator.frequency.setValueAtTime(900, audioContext.currentTime);
            gainNode.gain.setValueAtTime(0.15, audioContext.currentTime);
            gainNode.gain.exponentialRampToValueAtTime(0.00001, audioContext.currentTime + 0.04);
            oscillator.start(audioContext.currentTime);
            oscillator.stop(audioContext.currentTime + 0.05);
        } else { // deleting
            oscillator.type = 'square';
            oscillator.frequency.setValueAtTime(300, audioContext.currentTime);
            gainNode.gain.setValueAtTime(0.1, audioContext.currentTime);
            gainNode.gain.exponentialRampToValueAtTime(0.00001, audioContext.currentTime + 0.05);
            oscillator.start(audioContext.currentTime);
            oscillator.stop(audioContext.currentTime + 0.06);
        }
    };


    // Effect for main phase transitions
    useEffect(() => {
        if (!isIntersecting) return;

        if (phase === 'initial') {
            const timer = setTimeout(() => setPhase('typingName'), 1000);
            return () => clearTimeout(timer);
        }
        if (phase === 'typingName' && displayName === NAME) {
            const timer = setTimeout(() => setPhase('animatingTitles'), PAUSE_AFTER_DELETING);
            return () => clearTimeout(timer);
        }
    }, [phase, displayName, isIntersecting]);

    // Effect for typing the name
    useEffect(() => {
        if (phase !== 'typingName' || displayName.length >= NAME.length || !isIntersecting) return;

        const timeoutId = setTimeout(() => {
            setDisplayName(NAME.slice(0, displayName.length + 1));
            playSound('typing');
        }, TYPING_SPEED);
        return () => clearTimeout(timeoutId);
    }, [phase, displayName, isIntersecting]);
    
    // Effect for the title animation loop
    useEffect(() => {
        if (phase !== 'animatingTitles' || !isIntersecting) return;

        const currentTitle = TITLES[titleIndex];
        let timeoutId: number;

        if (isDeleting) {
            if (displayTitle.length > 0) {
                timeoutId = window.setTimeout(() => {
                    setDisplayTitle(prev => prev.slice(0, -1));
                    playSound('deleting');
                }, DELETING_SPEED);
            } else {
                timeoutId = window.setTimeout(() => {
                    setIsDeleting(false);
                    setTitleIndex(prev => (prev + 1) % TITLES.length);
                }, PAUSE_AFTER_DELETING);
            }
        } else {
            if (displayTitle.length < currentTitle.length) {
                timeoutId = window.setTimeout(() => {
                    setDisplayTitle(prev => currentTitle.slice(0, prev.length + 1));
                    playSound('typing');
                }, TYPING_SPEED);
            } else {
                timeoutId = window.setTimeout(() => {
                    setIsDeleting(true);
                }, PAUSE_AFTER_TYPING);
            }
        }

        return () => clearTimeout(timeoutId);
    }, [phase, displayTitle, isDeleting, titleIndex, isIntersecting]);

    const renderCursor = () => (
        <span className="animate-blink">_</span>
    );

    return (
        <section 
            ref={sectionRef}
            className="h-screen flex flex-col items-center justify-center relative p-4 snap-section landing-vignette"
        >
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