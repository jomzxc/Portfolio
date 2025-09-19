import React from 'react';
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
  return (
    <Section id="about" title="about.md">
      <div className="bg-bg-card backdrop-blur-md rounded-lg p-6 sm:p-8 border border-primary/20 shadow-xl shadow-primary/10">
        <p className="text-lg leading-relaxed mb-8">{initialDetails.intro}</p>

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