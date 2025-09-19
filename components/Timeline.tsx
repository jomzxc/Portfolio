import React from 'react';
import Section from './Section';
import TimelineItem from './TimelineItem';

interface TimelineEvent {
  date: string;
  title: string;
  description: string;
  link?: string;
}

const initialTimelineData: TimelineEvent[] = [
  {
    date: '2023 - Present',
    title: 'Machine Learning Engineer',
    description: 'Developing and deploying production-level machine learning models for various business applications.',
    link: '#',
  },
  {
    date: '2021 - 2023',
    title: 'Software Developer',
    description: 'Worked on full-stack web applications, building features, fixing bugs, and contributing to system architecture.',
  },
  {
    date: '2021',
    title: 'Graduated University',
    description: 'Completed Bachelor of Science in Computer Science with a specialization in Artificial Intelligence.',
  },
];

const Timeline: React.FC = () => {
  return (
    <Section id="timeline" title="history.log">
      <div className="relative pl-8">
        <div className="absolute left-[11px] top-0 h-full w-0.5 bg-gradient-to-b from-primary/0 via-primary/50 to-primary/0"></div>
        {initialTimelineData.map((event, index) => (
          <TimelineItem key={index} event={event} index={index} />
        ))}
      </div>
    </Section>
  );
};

export default Timeline;