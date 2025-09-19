import React from 'react';
import Section from './Section';

type SkillLevel = 'Advanced' | 'Intermediate' | 'Beginner' | 'Learning';

interface Skill {
  name: string;
  level: SkillLevel;
}

const initialSkills: Record<string, Skill[]> = {
  'Languages': [
    { name: 'Python', level: 'Advanced' },
    { name: 'JavaScript', level: 'Intermediate' },
    { name: 'SQL', level: 'Intermediate' },
    { name: 'C', level: 'Intermediate' },
    { name: 'Java', level: 'Intermediate' },
    { name: 'HTML', level: 'Intermediate' },
  ],
  'AI Frameworks': [
    { name: 'PyTorch', level: 'Intermediate' },
    { name: 'Nvidia NeMo', level: 'Intermediate' },
    { name: 'OpenVoice', level: 'Intermediate' },
  ],
  'Frontend': [
    { name: 'React / Next.js', level: 'Beginner' },
    { name: 'Vue.js', level: 'Beginner' },
  ],
  'Backend': [
    { name: 'Django', level: 'Intermediate' },
    { name: 'FastAPI', level: 'Beginner' },
    { name: 'PostgreSQL', level: 'Intermediate' },
  ],
  'Cloud & DevOps': [
    { name: 'GCP', level: 'Intermediate' },
    { name: 'Docker', level: 'Beginner' },
    { name: 'Vercel', level: 'Learning' },
    { name: 'Git', level: 'Intermediate' },
  ],
  'Tools & OS': [
    { name: 'Linux', level: 'Learning' },
    { name: 'Windows', level: 'Intermediate' },
    { name: 'JetBrains Suite', level: 'Intermediate' },
    { name: 'GitHub Copilot', level: 'Beginner' },
  ],
};

const levelConfig: Record<SkillLevel, { color: string; class: string }> = {
  'Advanced': { color: '#4ade80', class: 'bg-green-500' }, // green-400
  'Intermediate': { color: '#60a5fa', class: 'bg-blue-400' }, // blue-400
  'Beginner': { color: '#facc15', class: 'bg-yellow-400' }, // yellow-400
  'Learning': { color: '#f87171', class: 'bg-red-400' }, // red-400
};

const TechStack: React.FC = () => {
  return (
    <Section id="tech-stack" title="skills.json">
      <div className="bg-bg-card backdrop-blur-md rounded-lg p-6 sm:p-8 border border-primary/20 shadow-xl shadow-primary/10">
        <div className="flex flex-col md:flex-row gap-8">
          <div className="md:w-1/3">
            <h3 className="font-mono text-primary mb-4 text-xl">./legend</h3>
            <div className="space-y-2">
              {Object.entries(levelConfig).map(([level, { class: colorClass }]) => (
                <div key={level} className="flex items-center">
                  <span className={`w-3 h-3 rounded-full mr-3 ${colorClass}`}></span>
                  <span>{level}</span>
                </div>
              ))}
            </div>
          </div>
          <div className="md:w-2/3 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-6">
            {Object.entries(initialSkills).map(([category, skillList]) => (
              <div key={category}>
                <h4 className="font-mono text-secondary mb-3 text-lg">"{category}"</h4>
                <div className="space-y-2">
                  {skillList.map((skill) => (
                    <div key={skill.name} className="flex items-center group">
                      <span className={`w-2 h-2 rounded-full mr-3 ${levelConfig[skill.level].class}`}></span>
                      <span>{skill.name}</span>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </Section>
  );
};

export default TechStack;