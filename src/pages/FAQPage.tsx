import React, { useState, memo, useCallback } from 'react';
import { FAQ_CONTENT } from '../data/faqPage.data';
import type { FaqItem } from '../data/faqPage.data';
import Seo from '../components/common/Seo';

function generateFaqId(question: string) {
  return `faq-answer-${question.replace(/[^a-zA-Z0-9]+/g, '-').toLowerCase()}`;
}

type FAQItemProps = {
  item: FaqItem;
  isOpen: boolean;
  onToggle: () => void;
};

const FAQItem: React.FC<FAQItemProps> = memo(({ item, isOpen, onToggle }) => {
  const faqId = generateFaqId(item.question);
  return (
    <div className="border-b border-gray-200 py-4">
      <button
        className="flex justify-between items-center w-full text-left focus:outline-none"
        onClick={onToggle}
        aria-expanded={isOpen}
        aria-controls={faqId}
        id={`faq-question-${faqId}`}
        type="button"
      >
        <h3 className="font-medium text-base md:text-xl text-text">
          {item.question}
        </h3>
        <span className="text-primary text-lg md:text-xl">
          {isOpen ? '-' : '+'}
        </span>
      </button>
      <div
        id={faqId}
        role="region"
        aria-labelledby={`faq-question-${faqId}`}
        className={`overflow-hidden transition-all duration-300 ease-in-out ${
          isOpen ? 'max-h-screen opacity-100 mt-2' : 'max-h-0 opacity-0'
        }`}
      >
        {item.answer.map((paragraph, i) => (
          <p key={i} className="text-text/70 text-sm md:text-base mt-2">
            {paragraph}
          </p>
        ))}
      </div>
    </div>
  );
});
FAQItem.displayName = 'FAQItem';


const FAQPage: React.FC = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const handleToggle = useCallback((index: number) => {
    setOpenIndex((prev) => (prev === index ? null : index));
  }, []);

  const faqJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: FAQ_CONTENT.items.map(item => ({
      '@type': 'Question',
      name: item.question,
      acceptedAnswer: { '@type': 'Answer', text: item.answer.join(' ') },
    })),
  };

  return (
    <article className="py-8" aria-label="Frequently Asked Questions">
      <Seo
        title="FAQ"
        description="Answers to common questions about Mocci & Co. handmade plush toys, shipping and returns."
        path="/faq"
        jsonLd={faqJsonLd}
      />
      <div className="container mx-auto px-4 max-w-4xl">
        <h1 className="font-cardo text-2xl md:text-3xl lg:text-4xl font-black text-primary m-6 lg:m-10 uppercase text-center">
          {FAQ_CONTENT.title}
        </h1>
        <div className="space-y-4">
          {FAQ_CONTENT.items.map((item, index) => (
            <FAQItem
              key={item.question}
              item={item}
              isOpen={openIndex === index}
              onToggle={() => handleToggle(index)}
            />
          ))}
        </div>
      </div>
    </article>
  );
};

export default FAQPage;