export function Home() {
  return (
    <main id="home" className="mx-auto max-w-5xl px-4" role="main">
      <section className="py-20 text-center">
        <h1 className="text-4xl sm:text-5xl font-bold tracking-tight">Capturing Moments</h1>
        <p className="mt-4 text-gray-600 max-w-xl mx-auto">
          A clean, minimal portfolio built with React + Tailwind. Featured work coming soon.
        </p>
        <div className="mt-8">
          <a
            href="#contact"
            className="inline-block rounded bg-black text-white px-5 py-2 text-sm font-medium hover:bg-gray-800"
          >
            Get in touch
          </a>
        </div>
      </section>

      <section id="about" aria-labelledby="about-heading" className="scroll-mt-24 py-12 grid sm:grid-cols-2 gap-8 items-center">
        <div>
          <h2 id="about-heading" className="text-2xl font-semibold">About</h2>
          <p className="mt-3 text-gray-700">
            I shoot portraits, landscapes, and events. This site will showcase selected projects and prints.
          </p>
        </div>
        <div className="rounded-lg border aspect-video grid place-items-center text-gray-500">
          Featured work coming soon
        </div>
      </section>

      <section id="contact" aria-labelledby="contact-heading" className="scroll-mt-24 py-16 border-t mt-8">
        <h2 id="contact-heading" className="text-2xl font-semibold">Contact</h2>
        <p className="mt-3 text-gray-700">
          Email: <a href="mailto:hello@example.com" className="underline">hello@example.com</a>
        </p>
      </section>
    </main>
  )
}
