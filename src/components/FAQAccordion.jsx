import  { useState } from 'react';
import { Plus, Minus } from 'lucide-react';

export default function FAQAccordion({ faq }) {
  const [isOpen, setIsOpen] = useState(false);
  const { question, answer } = faq;

  return (
    <div className="bg-brandCard border border-gray-800 p-5 transition-all duration-300">
      {/* Question Toggle Header */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex justify-between items-center text-left text-brandText font-semibold font-display hover:text-brandAccent transition-colors duration-200"
      >
        <span className="text-sm md:text-base pr-4">{question}</span>
        <span className="text-brandAccent flex-shrink-0">
          {isOpen ? <Minus size={18} /> : <Plus size={18} />}
        </span>
      </button>
      
      {/* Answer content block */}
      <div
        className={`overflow-hidden transition-all duration-300 ease-in-out ${
          isOpen ? 'max-h-60 opacity-100 mt-4 border-t border-gray-800/80 pt-4' : 'max-h-0 opacity-0'
        }`}
      >
        <p className="text-xs md:text-sm text-brandMuted leading-relaxed">
          {answer}
        </p>
      </div>
    </div>
  );
}
