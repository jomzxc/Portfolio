import React, { useState, useMemo, useEffect, useRef } from 'react';
import Section from './Section';

type Category = 'All' | 'Languages' | 'AI Frameworks' | 'Frontend' | 'Backend' | 'Cloud & DevOps';

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
  const scrollerRef = useRef<HTMLDivElement>(null);

  const filteredSkills = useMemo(() => {
    if (activeCategory === 'All') {
      return Object.values(allSkills).flat();
    }
    return allSkills[activeCategory];
  }, [activeCategory]);

  useEffect(() => {
    if (!window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      addAnimation();
    }
  }, [filteredSkills]);

  function addAnimation() {
    scrollerRef.current?.setAttribute("data-animated", "true");
  }

  const categories: Category[] = ['All', 'Languages', 'AI Frameworks', 'Frontend', 'Backend', 'Cloud & DevOps'];

  const skillList = (
      <ul className="flex items-center justify-center md:justify-start [&_li]:mx-8 [&_img]:max-w-none animate-infinite-scroll">
        {filteredSkills.map((skill, index) => (
            <li key={`${skill.name}-${index}`} className="flex-shrink-0 w-36 h-36 flex flex-col items-center justify-center text-center group">
              {/* This is the container that handles sizing and centering */}
              <div className="w-20 h-20 flex items-center justify-center">
                <img
                    src={skill.iconPath}
                    alt={`${skill.name} logo`}
                    className="max-w-full max-h-full object-contain transition-transform duration-300 transform group-hover:scale-110"
                />
              </div>
              <p className="mt-2 text-sm text-text-muted font-mono">{skill.name}</p>
            </li>
        ))}
      </ul>
  );

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

          <div
              ref={scrollerRef}
              className="scroller w-full overflow-hidden"
              style={{ mask: "linear-gradient(90deg, transparent, white 20%, white 80%, transparent)" }}
          >
            <div className="scroller__inner flex gap-8">
              {skillList}
              {skillList}
            </div>
          </div>

        </div>
      </Section>
  );
};

export default TechStack;