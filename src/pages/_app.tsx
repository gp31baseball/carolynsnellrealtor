import "@/styles/globals.css";
import type { AppProps } from "next/app";
import Link from "next/link";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      {/* ✨ STICKY LUXURY HEADER / NAVBAR */}
      <header className="fixed top-0 left-0 w-full z-50 bg-gradient-to-b from-[var(--color-blush-light)] via-[var(--color-blush)] to-[var(--color-blush-deep)] border-b border-[var(--color-divider)] shadow-[0_4px_12px_rgba(40,40,40,0.06)] backdrop-blur-md">
        <nav className="max-w-6xl mx-auto flex justify-between items-center px-6 lg:px-10 py-6">

          {/* Brand */}
          <div className="text-[var(--color-charcoal)] tracking-tight flex items-baseline">
            <span
              className="font-serif text-[1.7rem] md:text-[1.9rem] font-extrabold italic leading-none 
                         bg-gradient-to-b from-[#d3d1cf] to-[var(--color-charcoal)] bg-clip-text text-transparent 
                         drop-shadow-[0_1px_1px_rgba(255,255,255,0.4)]"
            >
              Carolyn Snell
            </span>
            <span className="font-sans text-[var(--color-coral)] font-medium text-[1rem] ml-2">
              Realtor
            </span>
          </div>

          {/* Nav Links */}
          <ul className="flex gap-10 font-medium text-[var(--color-charcoal)] tracking-wide">
            {[
              { name: "Home", href: "/" },
              { name: "Listings", href: "/listings" },
              { name: "Contact", href: "/contact" },
            ].map((link) => (
              <li key={link.name}>
                <Link
                  href={link.href}
                  className="relative transition-all duration-300 hover:text-[var(--color-coral)] before:content-[''] before:absolute before:w-0 before:h-[2px] before:bg-[var(--color-coral)] before:bottom-0 before:left-0 hover:before:w-full before:transition-all before:duration-300"
                >
                  {link.name}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        {/* ✨ Coral accent bar + soft shadow divider */}
        <div className="relative">
          {/* thin coral line with slight glow */}
          <div className="h-[2px] w-full bg-gradient-to-r from-[var(--color-coral)] via-[var(--color-coral-light)] to-[var(--color-coral)] shadow-[0_0_6px_rgba(200,100,76,0.35)]" />
          {/* smooth blush fade blending header → hero */}
          <div className="absolute bottom-[-20px] left-0 w-full h-[20px] bg-gradient-to-b from-[var(--color-blush-deep)]/80 via-[var(--color-blush)]/60 to-transparent" />
        </div>
      </header>

      {/* ✨ MAIN CONTENT (padding clears fixed header) */}
      <main className="bg-[var(--color-bg-paper)] min-h-screen text-[var(--color-charcoal)] pt-[160px]">
        <Component {...pageProps} />
      </main>

      {/* ✨ FOOTER */}
      <footer className="relative bg-[var(--color-bg-paper)] border-t border-[var(--color-divider)] py-10 text-center text-sm tracking-wide">
        <p className="text-[#6b6b6b]">
          © {new Date().getFullYear()}{" "}
          <span
            className="font-serif font-semibold italic bg-gradient-to-b from-[var(--color-silver-light)] to-[var(--color-silver-deep)] bg-clip-text text-transparent transition-all duration-500 hover:from-[#ffffff] hover:to-[#5a5a5a]"
          >
            Carolyn Snell
          </span>{" "}
          <span className="font-sans text-[var(--color-coral)] font-medium">
            Realtor
          </span>{" "}
          — Built with{" "}
          <span className="text-[var(--color-charcoal)] font-semibold">
            Next.js + Tailwind CSS
          </span>
        </p>

        {/* Footer accent bar + soft fade */}
        <div className="absolute top-0 left-0 w-full">
          <div className="h-[3px] w-full bg-gradient-to-r from-[var(--color-coral)] via-[var(--color-coral-light)] to-[var(--color-coral)]" />
          <div className="h-[12px] w-full bg-gradient-to-t from-[#00000010] to-transparent" />
        </div>
      </footer>
    </>
  );
}
