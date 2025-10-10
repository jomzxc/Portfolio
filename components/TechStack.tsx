import React, { useState, useMemo } from 'react';
import Section from './Section';

type Category = 'All' | 'Languages' | 'AI Frameworks' | 'Frontend' | 'Backend' | 'Cloud & DevOps' | 'Tools & OS';

const allSkills = {
  'Languages': [
    { name: 'Python', iconPath: '/logos/python.png' },
    { name: 'JavaScript', iconPath: '/logos/javascript.png' },
    { name: 'SQL', iconPath: '/logos/sql.png' },
    { name: 'C', iconPath: '/logos/c.png' },
    { name: 'Java', iconPath: '/logos/java.png' },
    { name: 'HTML', iconPath: '/logos/html.png' },
  ],
  'AI Frameworks': [
    { name: 'PyTorch', iconPath: '/logos/pytorch.png' },
    { name: 'Nvidia NeMo', iconPath: '/logos/nvidia-nemo.png' },
    { name: 'OpenVoice', iconPath: '/logos/openvoice.png' },
  ],
  'Frontend': [
    { name: 'React / Next.js', iconPath: '/logos/react.png' },
    { name: 'Vue.js', iconPath: '/logos/vuejs.png' },
  ],
  'Backend': [
    { name: 'Django', iconPath: '/logos/django.png' },
    { name: 'FastAPI', iconPath: '/logos/fastapi.png' },
    { name: 'PostgreSQL', iconPath: '/logos/postgresql.png' },
  ],
  'Cloud & DevOps': [
    { name: 'GCP', iconPath: '/logos/gcp.png' },
    { name: 'Docker', iconPath: '/logos/docker.png' },
    { name: 'Vercel', iconPath: '/logos/vercel.png' },
    { name: 'Git', iconPath: '/logos/git.png' },
  ],
};

const TechStack: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState<Category>('All');

  const filteredSkills = useMemo(() => {
    if (activeCategory === 'All') {
      return Object.values(allSkills).flat();
    }
    return allSkills[activeCategory];
  }, [activeCategory]);

  const categories: Category[] = ['All', 'Languages', 'AI Frameworks', 'Frontend', 'Backend', 'Cloud & DevOps', 'Tools & OS'];

  return (
      <Section id="tech-stack" title="skills.json">
        <div className="bg-bg-card backdrop-blur-md rounded-lg p-6 sm:p-8 border border-primary/20 shadow-xl shadow-primary/10">
          <div className="flex flex-wrap justify-center gap-2 sm:gap-4 mb-8 font-mono">
            {categories.map(category => (
                <button
                    key={category}
                    onClick={() => setActiveCategory(category)}
                    className={`px-4 py-2 text-sm rounded-md transition-all duration-300 ${
                        activeCategory === category
                            ? 'bg-primary/20 text-primary-focus shadow-md'
                            : 'text-text-muted hover:bg-accent/80 hover:text-text-main'
                    }`}
                >
                  {category}
                </button>
            ))}
          </div>

          <div className="relative w-full h-48 overflow-hidden">
            <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-r from-bg-card via-transparent to-bg-card z-10"></div>
            <div className="flex animate-infinite-scroll hover:pause-animation">
              {[...filteredSkills, ...filteredSkills].map((skill, index) => (
                  <div key={index} className="flex-shrink-0 w-36 h-36 mx-8 flex flex-col items-center justify-center text-center group">
                    <img
                        src={skill.iconPath}
                        alt={`${skill.name} logo`}
                        className="w-16 h-16 object-contain transition-transform duration-300 transform group-hover:scale-110"
                    />
                    <p className="mt-2 text-sm text-text-muted font-mono">{skill.name}</p>
                  </div>
              ))}
            </div>
          </div>
        </div>
      </Section>
  );
};

export default TechStack;