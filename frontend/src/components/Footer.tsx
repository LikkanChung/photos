import site from '../content/site.json';

export function Footer() {
  return (
    <footer className="mt-16 border-t">
      <div className="mx-auto max-w-5xl px-4 py-8 text-sm text-gray-600 flex flex-col sm:flex-row items-center justify-between gap-4">
        <p>&copy; {new Date().getFullYear()} {site.header.brand}. All rights reserved.</p>
        <nav aria-label="Footer">
          <ul className="flex gap-4">
            {site.footer.social.map((item) => (
              <li key={`${item.label}-${item.href}`}><a href={item.href} aria-label={item.label} className="hover:underline">{item.label}</a></li>
            ))}
          </ul>
        </nav>
      </div>
    </footer>
  );
}
