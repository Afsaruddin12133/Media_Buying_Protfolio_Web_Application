import React, { useState } from 'react';
import { ChevronDown } from 'lucide-react';
import { motion } from 'framer-motion';
import { portfolioData } from '../data/portfolioData';
import useScrollReveal from '../hooks/useScrollReveal';

function FAQItem({ faq, index, isOpen, onClick }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.06 }}
      className={`group bg-white border transition-all duration-300 overflow-hidden ${
        isOpen ? 'border-brandAccent shadow-[4px_4px_0px_var(--color-brandAccent)]' : 'border-black/10 hover:border-brandAccent/50'
      }`}
    >
      <button
        onClick={onClick}
        className="w-full flex items-center justify-between gap-4 px-6 py-6 text-left cursor-pointer focus:outline-none"
      >
        <span className="text-base font-bold font-display uppercase tracking-wider text-[#000] group-hover:text-brandAccent transition-colors duration-200 leading-snug">
          {faq.question}
        </span>
        <div className={`flex-shrink-0 w-8 h-8 flex items-center justify-center transition-transform duration-300 ${
          isOpen ? 'rotate-180 text-brandAccent' : 'text-[#000]'
        }`}>
          <ChevronDown size={24} />
        </div>
      </button>

      <div className={`overflow-hidden transition-all duration-300 ease-in-out ${isOpen ? 'max-h-96' : 'max-h-0'}`}>
        <p className="px-6 pb-6 text-sm text-brandMuted font-medium leading-relaxed border-t border-black/10 pt-6">
          {faq.answer}
        </p>
      </div>
    </motion.div>
  );
}

export default function FAQSection() {
  const faqs = portfolioData.faqs;
  const ref = useScrollReveal();
  // Initialize the first FAQ as open by default
  const [openId, setOpenId] = useState(faqs.length > 0 ? faqs[0].id : null);

  return (
    <section id="faqs" ref={ref} className="py-32 px-6 md:px-12 bg-brandBg relative overflow-hidden border-b border-black/10">
      {/* Stark Grid Background */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#00000008_1px,transparent_1px),linear-gradient(to_bottom,#00000008_1px,transparent_1px)] bg-[size:48px_48px] pointer-events-none" />

      <div className="max-w-4xl mx-auto relative z-10">
        {/* Header */}
        <div className="reveal text-center mb-16 space-y-4">
          <h2 className="text-5xl md:text-6xl font-black font-display text-[#000] uppercase tracking-tighter leading-none">
            Frequently Asked <br />
            <span className="text-brandAccent">Questions.</span>
          </h2>
          <p className="text-sm text-brandMuted max-w-xl mx-auto pt-4 font-medium">
            Quick answers about tracking, ad platforms, and how we collaborate to achieve scale.
          </p>
        </div>

        {/* FAQ Items */}
        <div className="space-y-4">
          {faqs.map((faq, i) => (
            <FAQItem 
              key={faq.id} 
              faq={faq} 
              index={i} 
              isOpen={openId === faq.id}
              onClick={() => setOpenId(openId === faq.id ? null : faq.id)}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
