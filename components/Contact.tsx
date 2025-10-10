import React, { useState } from 'react';
import Section from './Section';

const socialLinks = {
  github: "https://github.com/jomzxc",
  linkedin: "https://www.linkedin.com/in/jomszxc/",
  email: "sabaterjommelrowin@outlook.com"
};

const Contact: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submissionMessage, setSubmissionMessage] = useState<string | null>(null);
  const [isError, setIsError] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmissionMessage(null);
    setIsError(false);

    try {
      const response = await fetch('https://formspree.io/f/mblzzobl', { // Replace with your Formspree endpoint
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
      });

      if (response.ok) {
        setSubmissionMessage("Thank you for your message! I'll get back to you soon.");
        setFormData({ name: '', email: '', subject: '', message: '' }); // Clear form
      } else {
        throw new Error('Failed to send message.');
      }
    } catch (error) {
      setSubmissionMessage("Sorry, there was an error sending your message. Please try again later.");
      setIsError(true);
    } finally {
      setIsSubmitting(false);
    }
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
                <input type="text" id="name" name="name" value={formData.name} onChange={handleChange} required className="w-full bg-accent/50 border border-primary/20 rounded p-3 text-text-main focus:outline-none focus:border-primary-focus focus:ring-2 focus:ring-primary/50 transition-all duration-300" />
              </div>
              <div>
                <label htmlFor="email" className="block text-primary mb-2">_email:</label>
                <input type="email" id="email" name="email" value={formData.email} onChange={handleChange} required className="w-full bg-accent/50 border border-primary/20 rounded p-3 text-text-main focus:outline-none focus:border-primary-focus focus:ring-2 focus:ring-primary/50 transition-all duration-300" />
              </div>
            </div>
            <div>
              <label htmlFor="subject" className="block text-primary mb-2">_subject:</label>
              <input type="text" id="subject" name="subject" value={formData.subject} onChange={handleChange} required className="w-full bg-accent/50 border border-primary/20 rounded p-3 text-text-main focus:outline-none focus:border-primary-focus focus:ring-2 focus:ring-primary/50 transition-all duration-300" />
            </div>
            <div>
              <label htmlFor="message" className="block text-primary mb-2">_message:</label>
              <textarea id="message" name="message" value={formData.message} onChange={handleChange} rows={5} required className="w-full bg-accent/50 border border-primary/20 rounded p-3 text-text-main focus:outline-none focus:border-primary-focus focus:ring-2 focus:ring-primary/50 transition-all duration-300"></textarea>
            </div>
            <div className="text-center">
              <button type="submit" disabled={isSubmitting} className="font-mono inline-block bg-primary/20 border border-primary text-primary-focus px-8 py-3 rounded-md hover:bg-primary/40 hover:shadow-lg hover:shadow-primary/20 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed">
                {isSubmitting ? 'Sending...' : './send_message'}
              </button>
            </div>
          </form>
          {submissionMessage && (
              <div className={`mt-6 text-center text-sm font-mono p-3 rounded ${isError ? 'bg-red-500/20 text-red-400' : 'bg-green-500/20 text-green-400'}`}>
                {submissionMessage}
              </div>
          )}
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