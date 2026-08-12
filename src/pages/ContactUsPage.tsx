import type { FC } from 'react';
import { CONTACT } from '../data/contactPage.data';
import { useContactForm } from '../hooks/useContactForm';
import { TextInput, TextArea } from '../components/features/contact/ContactFormFields';
import Seo from '../components/common/Seo';

const ContactUsPage: FC = () => {
  const { form, error, success, handleChange, handleSubmit } = useContactForm();

  return (
    <main className="flex justify-center">
      <Seo
        title="Contact"
        description="Get in touch with Mocci & Co. — questions about our handmade plush toys, orders and shipping."
        path="/contact"
      />
      <section className="p-6 sm:p-8 lg:p-10 max-w-2xl w-full">
        <h1 className="font-cardo text-2xl md:text-3xl lg:text-4xl font-black mb-8 mt-6 lg:m-10 text-primary text-center uppercase">{CONTACT.TITLE}</h1>
        <div className="mb-10">
          <h2 className="text-md sm:text-xl font-normal mb-4">{CONTACT.SUBTITLE}</h2>
          <p className="text-sm md:text-base lg:text-lg font-light mb-2 text-justify">{CONTACT.DESCRIPTION}</p>
        </div>
        <form className="space-y-6" onSubmit={handleSubmit} noValidate>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <TextInput
              id="name"
              name="name"
              placeholder="Name"
              value={form.name}
              onChange={handleChange}
              required
            />
            <TextInput
              id="email"
              name="email"
              type="email"
              placeholder="Email"
              value={form.email}
              onChange={handleChange}
              required
            />
          </div>
          <div>
            <TextInput
              id="phone"
              name="phone"
              type="tel"
              placeholder="Phone number"
              value={form.phone}
              onChange={handleChange}
            />
          </div>
          <div>
            <TextArea
              id="comment"
              name="comment"
              placeholder="Comment"
              value={form.comment}
              onChange={handleChange}
              required
            />
          </div>
          {error && (
            <div className="text-red-600 text-xs italic">{error}</div>
          )}
          {success && (
            <div className="text-green-600 text-xs italic">{success}</div>
          )}
          <div>
            <button
              type="submit"
              className="w-auto px-8 py-3 bg-primary text-white font-medium rounded-sm shadow-sm hover:bg-primary/90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary text-base"
            >
              Send
            </button>
          </div>
        </form>
      </section>
    </main>
  );
};

export default ContactUsPage;
