import { useState } from 'react'

export function Header() {
  const [open, setOpen] = useState(false)

  return (
    <header className="sticky top-0 z-10 bg-white/80 backdrop-blur border-b">
      <a
        href="#home"
        className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-2 focus:rounded focus:bg-black focus:px-3 focus:py-1 focus:text-white"
      >
        Skip to content
      </a>
      <nav
        className="mx-auto max-w-5xl px-4 py-3 flex items-center justify-between"
        aria-label="Primary"
      >
        <a href="#home" className="text-xl font-semibold">
          Photos
        </a>

        <button
          type="button"
          className="sm:hidden inline-flex items-center justify-center rounded border px-3 py-2 text-sm"
          aria-controls="primary-nav"
          aria-expanded={open}
          onClick={() => setOpen((v) => !v)}
        >
          <span className="sr-only">Toggle navigation</span>
          {open ? 'Close' : 'Menu'}
        </button>

        <ul id="primary-nav" className="hidden sm:flex gap-6 text-sm">
          <li>
            <a href="#about" className="hover:underline">
              About
            </a>
          </li>
          <li>
            <a href="#contact" className="hover:underline">
              Contact
            </a>
          </li>
        </ul>
      </nav>

      {open && (
        <div className="sm:hidden border-t">
          <ul className="mx-auto max-w-5xl px-4 py-3 flex flex-col gap-3 text-sm">
            <li>
              <a href="#about" className="hover:underline" onClick={() => setOpen(false)}>
                About
              </a>
            </li>
            <li>
              <a href="#contact" className="hover:underline" onClick={() => setOpen(false)}>
                Contact
              </a>
            </li>
          </ul>
        </div>
      )}
    </header>
  )
}
