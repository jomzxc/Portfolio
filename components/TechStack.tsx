import React, { useEffect, useRef } from 'react';
import Section from './Section';

const allSkills = [
  { name: 'Python', iconPath: '/logos/python.png' },
  { name: 'JavaScript', iconPath: '/logos/javascript.png' },
  { name: 'SQL', iconPath: '/logos/sql.png' },
  { name: 'C', iconPath: '/logos/c.png' },
  { name: 'Java', iconPath: '/logos/java.png' },
  { name: 'HTML', iconPath: '/logos/html.png' },
  { name: 'PyTorch', iconPath: '/logos/pytorch.png' },
  // Example: Increase the size for logos that appear small
  { name: 'Nvidia NeMo', iconPath: '/logos/nvidia-nemo.png', sizeClass: 'h-14' },
  { name: 'OpenVoice', iconPath: '/logos/openvoice.png' },
  { name: 'React / Next.js', iconPath: '/logos/react.png' },
  { name: 'Vue.js', iconPath: '/logos/vuejs.png' },
  { name: 'Django', iconPath: '/logos/django.png', sizeClass: 'h-12' },
  { name: 'FastAPI', iconPath: '/logos/fastapi.png' },
  { name: 'PostgreSQL', iconPath: '/logos/postgresql.png', sizeClass: 'h-12' },
  { name: 'GCP', iconPath: '/logos/gcp.png' },
  { name: 'Docker', iconPath: '/logos/docker.png' },
  { name: 'Vercel', iconPath: '/logos/vercel.png' },
  { name: 'Git', iconPath: '/logos/git.png' },
];

const TechStack: React.FC = () => {
  const scrollerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      scrollerRef.current?.setAttribute("data-animated", "true");
    }
  }, []);

  const skillList = (
      <ul className="flex items-center">
        {allSkills.map((skill, index) => (
            <li key={`${skill.name}-${index}`} className="flex-shrink-0 w-40 flex flex-col items-center justify-center text-center group">
              <div className="h-16 flex items-center justify-center">
                <img
                    src={skill.iconPath}
                    alt={`${skill.name} logo`}
                    className={`${skill.sizeClass || 'h-8'} w-auto transition-transform duration-300 transform group-hover:scale-110`}
                />
              </div>
            </li>
        ))}
      </ul>
  );

  return (
      <Section id="tech-stack" title="skills.json">
        <div className="bg-bg-card backdrop-blur-md rounded-lg p-6 sm:p-8 border border-primary/20 shadow-xl shadow-primary/10">
          <div
              ref={scrollerRef}
              className="scroller w-full overflow-hidden"
              style={{ mask: "linear-gradient(90deg, transparent, white 20%, white 80%, transparent)" }}
          >
            <div className="scroller__inner flex">
              {skillList}
              {skillList}
            </div>
          </div>
        </div>
      </Section>
  );
};

export default TechStack;