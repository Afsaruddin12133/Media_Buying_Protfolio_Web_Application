import React, { useState } from 'react';
import { Send, CheckCircle2 } from 'lucide-react';

export default function Contact() {
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [status, setStatus] = useState('idle'); // 'idle' | 'submitting' | 'success'

  const handleSubmit = (e) => {
    e.preventDefault();
    setStatus('submitting');
    
    // Simulate API request
    setTimeout(() => {
      setStatus('success');
      setFormData({ name: '', email: '', message: '' });
    }, 1500);
  };

  return (
    <section id="contact" className="py-24 px-6 md:px-12 max-w-7xl mx-auto scroll-mt-20">
      <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
        <h2 className="text-3xl md:text-4xl font-bold font-display text-brandText">
          Let's Work <span className="text-brandAccent">Together</span>
        </h2>
        <div className="w-16 h-1 bg-brandAccent mx-auto"></div>
        <p className="text-sm text-brandMuted">
          Scale your brand with predictable ad frameworks and server-side tracking pipelines.
        </p>
      </div>

      <div className="max-w-2xl mx-auto bg-brandCard border border-gray-800 p-8 md:p-12 relative overflow-hidden">
        {status === 'success' ? (
          <div className="flex flex-col items-center justify-center text-center py-12 space-y-4 animate-fadeIn">
            <div className="p-4 bg-brandSuccess/10 border border-brandSuccess/25 text-brandSuccess">
              <CheckCircle2 size={40} />
            </div>
            <h3 className="text-xl font-bold font-display text-brandText">Message Sent Successfully!</h3>
            <p className="text-xs text-brandMuted max-w-md">
              Thank you for reaching out. Hafiz will review your brand details and reach back to you within 24 hours.
            </p>
            <button
              onClick={() => setStatus('idle')}
              className="mt-6 px-6 py-2 border border-gray-850 hover:border-brandAccent text-brandText text-2xs font-bold uppercase tracking-widest transition-colors duration-300"
            >
              Send Another Message
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Name Input */}
            <div className="space-y-2">
              <label htmlFor="name" className="block text-2xs font-bold uppercase tracking-widest text-brandMuted">
                Your Name
              </label>
              <input
                id="name"
                type="text"
                required
                placeholder="John Doe"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                disabled={status === 'submitting'}
                className="w-full px-4 py-3 bg-brandBg border border-gray-800 text-brandText text-sm focus:outline-none focus:border-brandAccent disabled:opacity-50 transition-colors"
              />
            </div>

            {/* Email Input */}
            <div className="space-y-2">
              <label htmlFor="email" className="block text-2xs font-bold uppercase tracking-widest text-brandMuted">
                Your Email
              </label>
              <input
                id="email"
                type="email"
                required
                placeholder="john@example.com"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                disabled={status === 'submitting'}
                className="w-full px-4 py-3 bg-brandBg border border-gray-800 text-brandText text-sm focus:outline-none focus:border-brandAccent disabled:opacity-50 transition-colors"
              />
            </div>

            {/* Message Area */}
            <div className="space-y-2">
              <label htmlFor="message" className="block text-2xs font-bold uppercase tracking-widest text-brandMuted">
                Project Details
              </label>
              <textarea
                id="message"
                required
                rows={5}
                placeholder="Tell me about your brand, current monthly ad spend, and marketing objectives..."
                value={formData.message}
                onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                disabled={status === 'submitting'}
                className="w-full px-4 py-3 bg-brandBg border border-gray-800 text-brandText text-sm focus:outline-none focus:border-brandAccent disabled:opacity-50 transition-colors resize-none"
              />
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={status === 'submitting'}
              className="w-full py-4 bg-brandAccent hover:bg-blue-600 disabled:bg-brandAccent/60 text-brandText text-xs font-bold uppercase tracking-widest flex items-center justify-center space-x-2 transition-all duration-300"
            >
              <span>{status === 'submitting' ? 'Sending...' : 'Send Message'}</span>
              {status !== 'submitting' && <Send size={14} />}
            </button>
          </form>
        )}
      </div>
    </section>
  );
}
