import { useEffect } from 'react';
import site from '../content/site.json';

export function Home() {
  useEffect(() => {
    document.title = `${site.header.brand} — Home`;
  }, []);

  return (
    <main id="home" className="mx-auto max-w-5xl px-4" role="main">
      <section className="py-20 text-center">
        <h1 className="text-4xl sm:text-5xl font-bold tracking-tight">{site.home.hero.title}</h1>
        <p className="mt-4 text-gray-600 max-w-xl mx-auto">
          {site.home.hero.subtitle}
        </p>
        <div className="mt-8">
          <a
            href={site.home.hero.cta.href}
            className="inline-block rounded bg-black text-white px-5 py-2 text-sm font-medium hover:bg-gray-800"
          >
            {site.home.hero.cta.text}
          </a>
        </div>
      </section>

      <section id="about" aria-labelledby="about-heading" className="scroll-mt-24 py-12 grid sm:grid-cols-2 gap-8 items-center">
        <div>
          <h2 id="about-heading" className="text-2xl font-semibold">{site.home.about.title}</h2>
          <p className="mt-3 text-gray-700">
            {site.home.about.body}
          </p>
        </div>
        <div className="rounded-lg border aspect-video grid place-items-center text-gray-500">
          {site.home.featuredPlaceholder}
        </div>
      </section>

      <section id="featured" aria-labelledby="featured-heading" className="scroll-mt-24 py-12 grid sm:grid-cols-2 gap-8 items-center">
        <div>
          <h2 id="featured-heading" className="text-2xl font-semibold">{site.home.featured.title}</h2>
          <p className="mt-3 text-gray-700">
            {site.home.featured.body}
          </p>
          <a href={site.home.featured.cta.href} className="inline-block mt-4 rounded bg-black text-white px-5 py-2 text-sm font-medium hover:bg-gray-800">
            {site.home.featured.cta.text}
          </a>
        </div>
        <div className="rounded-lg border aspect-video grid place-items-center text-gray-500">
          {site.home.featuredPlaceholder}
        </div>
        <div className="rounded-lg border aspect-video grid place-items-center text-gray-500">
          {site.home.featuredPlaceholder}
        </div>
        <div className="rounded-lg border aspect-video grid place-items-center text-gray-500">
          {site.home.featuredPlaceholder}
        </div>
      </section>

      <section id="contact" aria-labelledby="contact-heading" className="scroll-mt-24 py-16 border-t mt-8">
        <h2 id="contact-heading" className="text-2xl font-semibold">{site.home.contactTitle}</h2>
        <p className="mt-3 text-gray-700">
            {site.home.contact.body}
        </p>
        <div>Placeholder - contact form coming soon</div>
      </section>
    </main>
  );
}
