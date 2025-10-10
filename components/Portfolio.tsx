import React from 'react';
import Landing from './Landing';
import About from './About';
import TechStack from './TechStack';
import Projects from './Projects';
import Certificates from './Certificates';
import Timeline from './Timeline';
import Contact from './Contact';
import Footer from './Footer';

const Portfolio: React.FC = () => {
    return (
        <>
            <Landing />
            <main>
                <About />
                <TechStack />
                <Projects />
                <Certificates />
                <Timeline />
                <Contact />
            </main>
            <Footer />
        </>
    );
};

export default Portfolio;
