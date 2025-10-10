import React from 'react';

const Blog: React.FC = () => {
    return (
        <div className="relative min-h-screen font-sans overflow-x-hidden flex items-center justify-center">
            <div className="text-center p-4">
                <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold font-mono text-glow text-primary mb-4">
                    Blog Coming Soon
                </h1>
                <p className="text-lg sm:text-xl text-text-muted">
                    I'm currently working on some exciting articles and tutorials. Stay tuned!
                </p>
                <a href="/" className="mt-8 font-mono inline-block bg-primary/20 border border-primary text-primary-focus px-6 py-3 rounded-md hover:bg-primary/40 hover:shadow-lg hover:shadow-primary/20 transition-all duration-300">
                    &larr; Go Back Home
                </a>
            </div>
        </div>
    );
};

export default Blog;