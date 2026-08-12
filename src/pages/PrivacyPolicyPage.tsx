import PRIVACY_POLICY from '../data/privacyPolicy.data';
import { LazySection, Section } from '../components/sections/policy/PolicySection';
import Seo from '../components/common/Seo';

const PrivacyPolicyPage = () => (
  <article
    className='py-8'
    aria-label='Privacy Policy'
  >
    <Seo title="Privacy Policy" description="How Mocci & Co. collects, uses and protects your data." path="/privacy-policy" />
    <div className='container mx-auto px-4 max-w-4xl'>
      <h1 className='font-cardo text-2xl md:text-3xl lg:text-4xl font-black text-primary m-6 lg:m-10 uppercase text-center'>
        {PRIVACY_POLICY.title}
      </h1>
      <div className='space-y-10 text-text/80 text-xs md:text-sm lg:text-lg leading-relaxed'>
        {PRIVACY_POLICY.sections.map(section => (
          <LazySection
            key={section.heading}
            id={section.heading.replace(/\s+/g, '-').toLowerCase()}
          >
            <Section section={section} />
          </LazySection>
        ))}
      </div>
    </div>
  </article>
);

export default PrivacyPolicyPage;
