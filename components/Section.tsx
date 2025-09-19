import React, { useEffect, useRef, useState } from 'react';

interface SectionProps {
  id: string;
  title: string;
  children: React.ReactNode;
}

const Section: React.FC<SectionProps> = ({ id, title, children }) => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.unobserve(entry.target);
        }
      },
      {
        root: null,
        rootMargin: '0px',
        threshold: 0.1
      }
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

  return (
    <section 
      id={id} 
      ref={sectionRef} 
      className={`min-h-screen w-full flex flex-col items-center justify-center py-24 px-4 sm:px-8 scroll-mt-16 transition-all duration-1000 snap-section ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-5'}`}
    >
      <div className="max-w-4xl lg:max-w-6xl xl:max-w-7xl mx-auto w-full relative">
        <div className="absolute -top-4 -left-4 sm:-top-8 sm:-left-8 w-16 h-16 border-l-2 border-t-2 border-primary/20 opacity-50"></div>
        <div className="absolute -bottom-4 -right-4 sm:-bottom-8 sm:-right-8 w-16 h-16 border-r-2 border-b-2 border-primary/20 opacity-50"></div>
        <h2 className="text-2xl md:text-3xl xl:text-4xl font-mono font-bold text-primary mb-12 flex items-center text-glow">
          <span className="text-text-muted mr-2">$</span>
          <span className="text-text-main">cat ./</span>
          <span className="text-white">{title}</span>
          <span className="ml-2 w-2 h-6 bg-primary animate-blink"></span>
        </h2>
        {children}
      </div>
      
      <div className="section-separator w-full max-w-2xl lg:max-w-5xl xl:max-w-6xl mx-auto pt-24" aria-hidden="true">
        <div className="flex items-center">
            <div className="flex-grow border-t border-primary/20"></div>
            <span className="flex-shrink mx-4 text-primary/50 text-glow text-lg">◆</span>
            <div className="flex-grow border-t border-primary/20"></div>
        </div>
      </div>
    </section>
  );
};

export default Section;