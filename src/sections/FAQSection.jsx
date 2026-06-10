import React from 'react';
import { portfolioData } from '../data/portfolioData';
import FAQAccordion from '../components/FAQAccordion';

export default function FAQSection() {
  const faqs = portfolioData.faqs;

  return (
    <section id="faqs" className="py-24 px-6 md:px-12 bg-[#0f172a] border-t border-b border-gray-800 scroll-mt-20">
      <div className="max-w-4xl mx-auto">
        {/* Header Title */}
        <div className="text-center mb-16 space-y-4">
          <h2 className="text-3xl md:text-4xl font-bold font-display text-brandText">
            Frequently Asked <span className="text-brandAccent">Questions</span>
          </h2>
          <div className="w-16 h-1 bg-brandAccent mx-auto"></div>
          <p className="text-sm text-brandMuted">
            Quick answers regarding pixel tracking, advertising channels, and contract options.
          </p>
        </div>

        {/* Collapsible Accordions */}
        <div className="space-y-4">
          {faqs.map((faq) => (
            <FAQAccordion key={faq.id} faq={faq} />
          ))}
        </div>
      </div>
    </section>
  );
}
