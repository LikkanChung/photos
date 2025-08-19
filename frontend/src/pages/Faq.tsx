import { useEffect } from 'react';
import faq from '../content/faq.json';
import site from '../content/site.json';

type FaqData = {
  title: string;
  intro?: string;
  items: { q: string; a: string }[];
  contact: {
    title: string;
    body: string;
    cta: { id: string; text: string; href: string }[];
  }
};

const typedFaq = faq as FaqData;

export default function Faq() {
  useEffect(() => {
    document.title = `${site.header.brand} — ${typedFaq.title}`;
  }, []);

  return (
    <main id="faq" className="mx-auto max-w-5xl px-4" role="main">
      <section className="py-12">
        <h1 className="text-3xl sm:text-4xl font-bold tracking-tight">{typedFaq.title}</h1>
        {typedFaq.intro && (
          <p className="mt-3 text-gray-700">{typedFaq.intro}</p>
        )}

        <div className="mt-8 space-y-4">
          {typedFaq.items.map((item, idx) => (
            <details key={`${idx}-${item.q}`} className="group rounded-lg border p-4">
              <summary className="cursor-pointer list-none select-none font-medium">
                {item.q}
              </summary>
              <div className="mt-2 text-gray-700">
                {item.a}
              </div>
            </details>
          ))}
        </div>
      </section>

      <section className="py-12">
        <h2 className="text-2xl sm:text-3xl font-semibold tracking-tight">{typedFaq.contact.title}</h2>
        {typedFaq.contact.body && (
          <p className="mt-3 text-gray-700">{typedFaq.contact.body}</p>
        )}

        <div className="mt-8 space-y-4">
          {typedFaq.contact.cta.map((item) => (
            <div key={item.id} className="mt-8">
              <a
                id={item.id}
                href={item.href}
                className="inline-block rounded bg-black text-white px-5 py-2 text-sm font-medium hover:bg-gray-800"
              >
                {item.text}
              </a>
            </div>
          ))}
        </div>
      </section>
    </main>
  );
}
