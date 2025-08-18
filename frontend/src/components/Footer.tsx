export function Footer() {
  return (
    <footer className="mt-16 border-t">
      <div className="mx-auto max-w-5xl px-4 py-8 text-sm text-gray-600 flex flex-col sm:flex-row items-center justify-between gap-4">
        <p>&copy; {new Date().getFullYear()} Photos. All rights reserved.</p>
        <nav aria-label="Footer">
          <ul className="flex gap-4">
            <li><a href="#" aria-label="Twitter" className="hover:underline">Twitter</a></li>
            <li><a href="#" aria-label="Instagram" className="hover:underline">Instagram</a></li>
            <li><a href="#contact" className="hover:underline">Contact</a></li>
          </ul>
        </nav>
      </div>
    </footer>
  );
}
