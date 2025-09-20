import React from 'react';
import Section from './Section';

const socialLinks = {
  github: "https://github.com/jomzxc",
  linkedin: "https://www.linkedin.com/in/jomszxc/",
  email: "sabaterjommelrowin@outlook.com"
};

const Contact: React.FC = () => {
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // In a real application, you would handle form submission here.
    // For this demo, we'll just log it.
    console.log("Form submitted!");
    alert("Thank you for your message! This is a demo form.");
  };

  return (
    <Section id="contact" title="contact.sh">
      <div className="bg-bg-card backdrop-blur-md rounded-lg p-6 sm:p-8 border border-primary/20 shadow-xl shadow-primary/10">
        <p className="text-center text-base sm:text-lg mb-8">
          Have a question or want to work together? Feel free to reach out.
        </p>
        <form onSubmit={handleSubmit} className="space-y-6 font-mono">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label htmlFor="name" className="block text-primary mb-2">_name:</label>
              <input type="text" id="name" name="name" required className="w-full bg-accent/50 border border-primary/20 rounded p-3 text-text-main focus:outline-none focus:border-primary-focus focus:ring-2 focus:ring-primary/50 transition-all duration-300" />
            </div>
            <div>
              <label htmlFor="email" className="block text-primary mb-2">_email:</label>
              <input type="email" id="email" name="email" required className="w-full bg-accent/50 border border-primary/20 rounded p-3 text-text-main focus:outline-none focus:border-primary-focus focus:ring-2 focus:ring-primary/50 transition-all duration-300" />
            </div>
          </div>
          <div>
            <label htmlFor="subject" className="block text-primary mb-2">_subject:</label>
            <input type="text" id="subject" name="subject" required className="w-full bg-accent/50 border border-primary/20 rounded p-3 text-text-main focus:outline-none focus:border-primary-focus focus:ring-2 focus:ring-primary/50 transition-all duration-300" />
          </div>
          <div>
            <label htmlFor="message" className="block text-primary mb-2">_message:</label>
            <textarea id="message" name="message" rows={5} required className="w-full bg-accent/50 border border-primary/20 rounded p-3 text-text-main focus:outline-none focus:border-primary-focus focus:ring-2 focus:ring-primary/50 transition-all duration-300"></textarea>
          </div>
          <div className="text-center">
            <button type="submit" className="font-mono inline-block bg-primary/20 border border-primary text-primary-focus px-8 py-3 rounded-md hover:bg-primary/40 hover:shadow-lg hover:shadow-primary/20 transition-all duration-300">
              ./send_message
            </button>
          </div>
        </form>
        <div className="text-center mt-12">
            <p className="mb-4">Or contact me directly:</p>
            <div className="flex justify-center items-center space-x-6">
                <a href={socialLinks.github} target="_blank" rel="noopener noreferrer" className="text-text-muted hover:text-primary transition-colors">GitHub</a>
                <span className="text-gray-600">|</span>
                <a href={socialLinks.linkedin} target="_blank" rel="noopener noreferrer" className="text-text-muted hover:text-primary transition-colors">LinkedIn</a>
                <span className="text-gray-600">|</span>
                <a href={`mailto:${socialLinks.email}`} className="text-text-muted hover:text-primary transition-colors">Email</a>
            </div>
        </div>
      </div>
    </Section>
  );
};

export default Contact;