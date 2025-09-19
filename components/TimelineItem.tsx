import React, { useEffect, useRef, useState } from 'react';

interface TimelineEvent {
  date: string;
  title: string;
  description: string;
  link?: string;
}

interface TimelineItemProps {
  event: TimelineEvent;
  index: number;
}

const TimelineItem: React.FC<TimelineItemProps> = ({ event, index }) => {
  const itemRef = useRef<HTMLDivElement>(null);
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
        threshold: 0.2,
      }
    );

    const currentRef = itemRef.current;
    if (currentRef) {
      observer.observe(currentRef);
    }

    return () => {
      if (currentRef) {
        observer.unobserve(currentRef);
      }
    };
  }, []);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const card = e.currentTarget;
    const { left, top, width, height } = card.getBoundingClientRect();
    const x = e.clientX - left - width / 2;
    const y = e.clientY - top - height / 2;
    const rotateX = (y / height) * -20;
    const rotateY = (x / width) * 20;
    card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.05, 1.05, 1.05)`;
    card.style.transition = 'transform 0.1s ease-out';
  };
  
  const handleMouseLeave = (e: React.MouseEvent<HTMLDivElement>) => {
    const card = e.currentTarget;
    card.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) scale3d(1, 1, 1)';
    card.style.transition = 'transform 0.6s cubic-bezier(0.23, 1, 0.32, 1)';
  };

  return (
    <div
      ref={itemRef}
      className={`relative mb-12 transition-all duration-700 ease-out ${
        isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
      }`}
      style={{ transitionDelay: `${index * 100}ms` }}
    >
      <div className="absolute -left-[30px] top-1.5 flex items-center justify-center w-6 h-6 bg-accent rounded-full ring-4 ring-bg-card">
        <div className="w-3 h-3 bg-primary rounded-full animate-pulse"></div>
      </div>
      <div 
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        style={{ transformStyle: 'preserve-3d' }}
        className="group relative bg-bg-card backdrop-blur-md border border-primary/20 rounded-lg p-6 overflow-hidden transition-all duration-300 hover:border-transparent hover:shadow-xl hover:shadow-primary/20 interactive-card"
      >
        <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_center,var(--color-primary-focus-transparent,rgba(110,231,183,0.15)),transparent_40%)] opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
        <div className="relative z-10">
          <time className="block mb-2 text-sm font-normal leading-none text-text-muted">{event.date}</time>
          <h3 className="text-lg font-semibold text-primary font-mono">{event.title}</h3>
          <p className="my-2 text-base font-normal text-text-main">{event.description}</p>
          {event.link && (
            <a href={event.link} className="inline-flex items-center px-4 py-2 text-sm font-medium text-secondary bg-accent/50 rounded-lg hover:bg-accent/80 focus:z-10 focus:ring-4 focus:outline-none focus:ring-accent/50 transition-colors">
              Learn more &rarr;
            </a>
          )}
        </div>
      </div>
    </div>
  );
};

export default TimelineItem;
