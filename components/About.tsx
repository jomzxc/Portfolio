import React, { useRef } from 'react';
import Section from './Section';

const initialDetails = {
  intro: "Hi, I'm Joms—a dedicated Machine Learning Engineer and Software Developer passionate about building tech with medical impact. I specialize in training custom ML models and exploring innovations in voice cloning, speech analysis, image enhancement, and game development.",
  email: "sabaterjommelrowin@outlook.com",
  github: "https://github.com/jomzxc",
  linkedin: "https://www.linkedin.com/in/jomszxc/",
  languages: [
    { name: 'Tagalog', fluency: 'Native' },
    { name: 'English', fluency: 'Fluent' },
  ],
  cvPath: "/path/to/cv.pdf"
};

const About: React.FC = () => {
  const cardRef = useRef<HTMLDivElement>(null);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (window.matchMedia("(pointer: coarse)").matches) return;
    const card = cardRef.current;
    if (!card) return;
    const { left, top, width, height } = card.getBoundingClientRect();
    const x = e.clientX - left - width / 2;
    const y = e.clientY - top - height / 2;
    const rotateX = (y / height) * -20;
    const rotateY = (x / width) * 20;
    card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.05, 1.05, 1.05)`;
    card.style.transition = 'transform 0.1s ease-out';
  };
  
  const handleMouseLeave = () => {
    if (window.matchMedia("(pointer: coarse)").matches) return;
    const card = cardRef.current;
    if (!card) return;
    card.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) scale3d(1, 1, 1)';
    card.style.transition = 'transform 0.6s cubic-bezier(0.23, 1, 0.32, 1)';
  };

  return (
    <Section id="about" title="about.md">
      <div 
        ref={cardRef}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        className="bg-bg-card backdrop-blur-md rounded-lg p-6 sm:p-8 border border-primary/20 shadow-xl shadow-primary/10 interactive-card hover:border-transparent hover:shadow-2xl hover:shadow-primary/30 transition-all duration-300"
        style={{ transformStyle: 'preserve-3d' }}
      >
        <p className="text-base sm:text-lg leading-relaxed mb-8">{initialDetails.intro}</p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-6">
          <div>
            <h3 className="font-mono text-primary mb-4 text-xl">./contact</h3>
            <div className="space-y-3">
              <a href={`mailto:${initialDetails.email}`} className="flex items-center group"><span className="text-primary-focus mr-2 font-mono">&gt;</span> <span className="group-hover:underline">Email</span></a>
              <a href={initialDetails.github} target="_blank" rel="noopener noreferrer" className="flex items-center group"><span className="text-primary-focus mr-2 font-mono">&gt;</span> <span className="group-hover:underline">GitHub</span></a>
              <a href={initialDetails.linkedin} target="_blank" rel="noopener noreferrer" className="flex items-center group"><span className="text-primary-focus mr-2 font-mono">&gt;</span> <span className="group-hover:underline">LinkedIn</span></a>
            </div>
          </div>
          <div>
            <h3 className="font-mono text-primary mb-4 text-xl">./languages</h3>
             <div className="space-y-3">
              {initialDetails.languages.map((lang, index) => (
                <div key={index} className="flex justify-between items-center">
                    <span>{lang.name}</span>
                    <span className="text-text-muted">{lang.fluency}</span>
                </div>
              ))}
             </div>
          </div>
        </div>
        
        <div className="mt-12 text-center">
          <a href={initialDetails.cvPath} download className="font-mono inline-block bg-primary/20 border border-primary text-primary-focus px-6 py-3 rounded-md hover:bg-primary/40 hover:shadow-lg hover:shadow-primary/20 transition-all duration-300">
            Download CV
          </a>
        </div>
      </div>
    </Section>
  );
};

export default About;