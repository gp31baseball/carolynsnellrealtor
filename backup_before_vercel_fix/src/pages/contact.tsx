import { useState } from "react";

export default function Contact() {
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSubmitted(true);
    // In a real setup, you'd send the data to an API route or CRM here
  };

  return (
    <main className="min-h-screen bg-white text-blue-text">
      <section className="max-w-4xl mx-auto px-6 lg:px-10 py-20">
        <h1 className="text-4xl font-extrabold mb-6 text-center tracking-tight">
          Get In Touch
        </h1>
        <p className="text-gray-600 text-center mb-12 max-w-2xl mx-auto">
          Have questions, want to schedule a showing, or simply start the
          conversation? Fill out the form below — we’d love to connect.
        </p>

        {!submitted ? (
          <form
            onSubmit={handleSubmit}
            className="bg-gray-soft p-8 rounded-2xl shadow-md space-y-6 max-w-2xl mx-auto"
          >
            <div>
              <label htmlFor="name" className="block text-sm font-medium mb-2">
                Name
              </label>
              <input
                id="name"
                type="text"
                required
                className="w-full border border-gray-300 rounded-md px-4 py-3 focus:ring-2 focus:ring-blue-sky focus:outline-none"
              />
            </div>

            <div>
              <label htmlFor="email" className="block text-sm font-medium mb-2">
                Email
              </label>
              <input
                id="email"
                type="email"
                required
                className="w-full border border-gray-300 rounded-md px-4 py-3 focus:ring-2 focus:ring-blue-sky focus:outline-none"
              />
            </div>

            <div>
              <label
                htmlFor="message"
                className="block text-sm font-medium mb-2"
              >
                Message
              </label>
              <textarea
                id="message"
                rows={5}
                required
                className="w-full border border-gray-300 rounded-md px-4 py-3 focus:ring-2 focus:ring-pink-blush focus:outline-none resize-none"
              ></textarea>
            </div>

            <button
              type="submit"
              className="w-full bg-blue-sky hover:bg-pink-blush text-blue-text font-semibold py-3 rounded-full shadow-md hover:shadow-lg transition-all duration-300"
            >
              Send Message
            </button>
          </form>
        ) : (
          <div className="text-center mt-20 text-lg font-semibold text-blue-text">
            <p>✅ Thank you! Your message has been received.</p>
            <p className="text-gray-600 text-sm mt-2">
              We’ll get back to you shortly.
            </p>
          </div>
        )}
      </section>
    </main>
  );
}
