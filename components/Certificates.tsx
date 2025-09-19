import React, { useState } from 'react';
import Section from './Section';

const certificatesData = [
  {
    name: 'PMI Project Management Ready™',
    issuer: 'Project Management Institute',
    link: 'https://www.credly.com/badges/517266f6-0c26-43b0-97b1-928e6569c605/linked_in_profile',
  },
  {
    name: 'CCNA: Introduction to Networks',
    issuer: 'Cisco',
    link: 'https://www.credly.com/badges/2feedb03-db24-4af0-9788-2ef88fcd789d/linked_in_profile',
  },
  {
    name: 'IT Specialist - Python',
    issuer: 'Certiport - A Pearson VUE Business',
    link: 'https://www.credly.com/badges/289253aa-d61b-4437-8363-5e10f767f2ec/linked_in_profile',
  },
  {
    name: 'Problem Solving (Basic)',
    issuer: 'HackerRank',
    link: 'https://www.hackerrank.com/certificates/026fca22967b',
  },
  {
    name: 'SQL (Basic) Certificate',
    issuer: 'HackerRank',
    link: 'https://www.hackerrank.com/certificates/3cd2be759727',
  },
  {
    name: 'Python (Basic)',
    issuer: 'HackerRank',
    link: 'https://www.hackerrank.com/certificates/b3a10a91b23a',
  },
  {
    name: 'CS50 Certificate',
    issuer: 'CS50',
    link: 'https://certificates.cs50.io/2bb2f09b-7290-4010-bdcf-d92b3940febd.pdf?size=letter',
  },
];

const INITIAL_VISIBLE_COUNT = 3;

const Certificates: React.FC = () => {
  const [showAll, setShowAll] = useState(false);
  const certificatesToShow = showAll ? certificatesData : certificatesData.slice(0, INITIAL_VISIBLE_COUNT);

  return (
    <Section id="certificates" title="certificates.log">
      <div className="space-y-4">
        {certificatesToShow.map((cert, index) => (
          <div key={index} className="group relative bg-bg-card backdrop-blur-md border border-primary/20 rounded-lg p-6 overflow-hidden transition-all duration-300 hover:border-primary/50 hover:shadow-xl hover:shadow-primary/20">
            <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_center,var(--color-primary-focus-transparent,rgba(110,231,183,0.15)),transparent_40%)] opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
            <div className="relative z-10">
              <h3 className="font-mono text-lg text-primary">{cert.name}</h3>
              <p className="text-text-muted italic mb-2">{cert.issuer}</p>
              <a href={cert.link} target="_blank" rel="noopener noreferrer" className="text-sm text-secondary hover:underline">
                View Certificate &rarr;
              </a>
            </div>
          </div>
        ))}
      </div>
      {certificatesData.length > INITIAL_VISIBLE_COUNT && (
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

export default Certificates;