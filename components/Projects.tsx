import React, { useState } from 'react';
import Section from './Section';

interface Project {
  title: string;
  description: string;
  tech: Record<string, string[]>;
  repoLink: string;
  liveLink: string | null;
}

const projectsData: Project[] = [
  {
    title: 'Cleft2Speech',
    description: 'An AI-driven web app for cleft speech therapy, using voice cloning and phoneme-level analysis to personalize rehabilitation.',
    tech: {
      'AI/ML': ['PyTorch', 'Nvidia NeMo', 'OpenVoice'],
      'Backend': ['Python', 'Django', 'FastAPI', 'PostgreSQL'],
      'Cloud/DevOps': ['GCP', 'Docker', 'Git'],
      'Frontend': ['HTML', 'JavaScript'],
    },
    repoLink: 'https://github.com/jomzxc/Cleft2Speech',
    liveLink: null,
  },
  {
    title: 'Interactive CLI Portfolio',
    description: 'This personal portfolio website, designed to mimic a command-line interface. Built with modern frontend technologies for a dynamic, responsive, and themed user experience.',
    tech: {
        'Frontend': ['React', 'TypeScript', 'Tailwind CSS'],
        'Deployment': ['Vercel', 'Git'],
    },
    repoLink: 'https://github.com/jomzxc/portfolio-cli',
    liveLink: '#',
  },
];

const INITIAL_VISIBLE_COUNT = 4;


const Projects: React.FC = () => {
  const [showAll, setShowAll] = useState(false);
  const projectsToShow = showAll ? projectsData : projectsData.slice(0, INITIAL_VISIBLE_COUNT);

  return (
    <Section id="projects" title="projects/">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {projectsToShow.map((project, index) => (
          <div key={index} className="group relative bg-bg-card backdrop-blur-md border border-primary/20 rounded-lg p-6 flex flex-col justify-between overflow-hidden transition-all duration-300 hover:border-primary/50 hover:shadow-xl hover:shadow-primary/20">
            <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_center,var(--color-primary-focus-transparent,rgba(110,231,183,0.15)),transparent_40%)] opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
            <div className="relative z-10 flex flex-col justify-between h-full">
              <div>
                <h3 className="font-mono text-xl text-primary mb-2">{project.title}</h3>
                <p className="text-text-muted mb-4">{project.description}</p>
                <div className="space-y-3 mb-4">
                  {Object.entries(project.tech).map(([category, tools]) => (
                    <div key={category}>
                      <p className="text-sm font-mono text-secondary/80 mb-1.5">{category}</p>
                      <div className="flex flex-wrap gap-2">
                        {tools.map((t, i) => (
                          <span key={i} className="bg-primary/10 text-xs text-primary-focus font-mono px-2 py-1 rounded">
                            {t}
                          </span>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              <div className="flex items-center space-x-4 mt-4 font-mono">
                <a href={project.repoLink} target="_blank" rel="noopener noreferrer" className="text-text-main hover:text-primary transition-colors">[source_code]</a>
                {project.liveLink && (
                    <>
                      <span className="text-gray-600">/</span>
                      <a href={project.liveLink} target="_blank" rel="noopener noreferrer" className="text-text-main hover:text-primary transition-colors">[live_demo]</a>
                    </>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
      {projectsData.length > INITIAL_VISIBLE_COUNT && (
        <div className="mt-8 text-center">
          <button
            onClick={() => setShowAll(!showAll)}
            className="font-mono text-primary hover:text-glow transition-all"
          >
            {showAll ? '[show_less]' : '[show_more]'}
          </button>
        </div>
      )}
    </Section>
  );
};

export default Projects;