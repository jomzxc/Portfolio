import React from 'react';
import Section from './Section';

const initialDetails = {
  intro: "I am Jommel Rowin S. Sabater, a passionate Machine Learning Engineer and Software Developer with a knack for building intelligent systems and seamless user experiences. I thrive on solving complex problems, from developing robust backend services to creating intuitive frontend interfaces. My journey in tech is driven by a deep curiosity for AI and its potential to reshape our world.",
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