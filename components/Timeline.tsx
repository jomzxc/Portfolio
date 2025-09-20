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
    date: '2022 - Present',
    title: 'B.S. in Computer Science, Specialization in Software Engineering',
    description: 'Started undergraduate studies at FEU Institute of Technology, focusing on software engineering principles and practices.',
  },
  {
    date: '2021',
    title: 'Discovered Passion for Code',
    description: 'Ignited a passion for programming through self-directed learning on various online platforms, building a strong foundation in core concepts.',
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