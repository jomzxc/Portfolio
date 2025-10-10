import React, {useEffect, useRef} from 'react';
import Section from './Section';
import {icons} from './icons'; // Import the icons

const allSkills = [
    {name: 'Python', icon: icons.python},
    {name: 'JavaScript', icon: icons.javascript},
    {name: 'SQLite', icon: icons.sqlite},
    {nae: 'PostgreSQL', icon: icons.postgresql},
    {name: 'C', icon: icons.c},
    {name: 'C++', icon: icons.cpp},
    {name: 'HTML', icon: icons.html},
    {name: 'PyTorch', icon: icons.pytorch},
    {name: 'TensorFlow', icon: icons.tensorflow},
    {name: 'Nvidia NeMo', icon: icons.nvidiaNeMo},
    {name: 'React', icon: icons.react},
    {name: 'Next.js', icon: icons.nextjs},
    {name: 'Vue.js', icon: icons.vuejs},
    {name: 'Django', icon: icons.django},
    {name: 'FastAPI', icon: icons.fastapi},
    {name: 'GCP', icon: icons.gcp},
    {name: 'Docker', icon: icons.docker},
    {name: 'Vercel', icon: icons.vercel},
    {name: 'Git', icon: icons.git},
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
                <li key={`${skill.name}-${index}`}
                    className="flex-shrink-0 w-40 flex flex-col items-center justify-center text-center group">
                    <div
                        className="tech-logo w-16 h-16 text-text-muted group-hover:text-primary-focus transition-colors duration-300"
                        dangerouslySetInnerHTML={{__html: skill.icon}}
                    />
                    <p className="mt-4 text-sm text-text-muted font-mono">{skill.name}</p>
                </li>
            ))}
        </ul>
    );

    return (
        <Section id="tech-stack" title="skills.json">
            <div
                className="bg-bg-card backdrop-blur-md rounded-lg p-6 sm:p-8 border border-primary/20 shadow-xl shadow-primary/10">
                <div
                    ref={scrollerRef}
                    className="scroller w-full overflow-hidden"
                    style={{mask: "linear-gradient(90deg, transparent, white 20%, white 80%, transparent)"}}
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