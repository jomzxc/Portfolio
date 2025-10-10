import React, { useMemo, useEffect, useRef } from 'react';
import Section from './Section';

const allSkills = [
  { name: 'Python', iconPath: '/logos/python.png' },
  { name: 'JavaScript', iconPath: '/logos/javascript.png' },
  { name: 'SQL', iconPath: '/logos/sql.png' },
  { name: 'C', iconPath: '/logos/c.png' },
  { name: 'Java', iconPath: '/logos/java.png' },
  { name: 'HTML', iconPath: '/logos/html.png' },
  { name: 'PyTorch', iconPath: '/logos/pytorch.png' },
  { name: 'Nvidia NeMo', iconPath: '/logos/nvidia-nemo.png' },
  { name: 'OpenVoice', iconPath: '/logos/openvoice.png' },
  { name: 'React / Next.js', iconPath: '/logos/react.png' },
  { name: 'Vue.js', iconPath: '/logos/vuejs.png' },
  { name: 'Django', iconPath: '/logos/django.png' },
  { name: 'FastAPI', iconPath: '/logos/fastapi.png' },
  { name: 'PostgreSQL', iconPath: '/logos/postgresql.png' },
  { name: 'GCP', iconPath: '/logos/gcp.png' },
  { name: 'Docker', iconPath: '/logos/docker.png' },
  { name: 'Vercel', iconPath: '/logos/vercel.png' },
  { name: 'Git', iconPath: '/logos/git.png' },
  { name: 'Linux', iconPath: '/logos/linux.png' },
  { name: 'Windows', iconPath: '/logos/windows.png' },
  { name: 'JetBrains Suite', iconPath: '/logos/jetbrains.png' },
  { name: 'GitHub Copilot', iconPath: '/logos/github-copilot.png' },
];

const TechStack: React.FC = () => {
  const scrollerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Start the animation if the user doesn't have "prefers-reduced-motion" enabled
    if (!window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      scrollerRef.current?.setAttribute("data-animated", "true");
    }
  }, []);

  const skillList = (
      // The list now gets its spacing from the parent's gap property
      <ul className="flex items-center">
        {allSkills.map((skill, index) => (
            <li key={`${skill.name}-${index}`} className="flex-shrink-0 w-36 h-36 flex flex-col items-center justify-center text-center group">
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
          <div
              ref={scrollerRef}
              className="scroller w-full overflow-hidden"
              // This mask creates the fade-out effect on the sides
              style={{ mask: "linear-gradient(90deg, transparent, white 20%, white 80%, transparent)" }}
          >
            {/* The `gap-16` class now controls the spacing between logos */}
            <div className="scroller__inner flex gap-16">
              {skillList}
              {/* We duplicate the list for a seamless loop */}
              {skillList}
            </div>
          </div>
        </div>
      </Section>
  );
};

export default TechStack;