"use client";

import Link from "next/link";
import HeroCarousel from "@/components/HeroCarousel";
import { useEffect, useState } from "react";
import { fetchListings } from "@/lib/har";
import { motion, AnimatePresence } from "framer-motion";

// ✅ Listing type
interface Listing {
  id: string;
  address: string;
  city: string;
  state: string;
  price: number;
  image?: string;
}

export default function Home() {
  const [listings, setListings] = useState<Listing[]>([]);
  const [loading, setLoading] = useState(true);

  // 🔹 Fetch mock listings
  useEffect(() => {
    fetchListings()
      .then((data) => {
        if (Array.isArray(data)) setListings(data.slice(0, 3));
      })
      .finally(() => setLoading(false));
  }, []);

  // 🔹 Auto-shuffle listings every 6 seconds
  useEffect(() => {
    if (listings.length === 0) return;
    const interval = setInterval(() => {
      setListings((prev) => [...prev].sort(() => Math.random() - 0.5));
    }, 6000);
    return () => clearInterval(interval);
  }, [listings]);

  return (
    <main className="min-h-screen bg-[var(--color-bg-paper)] text-[var(--color-charcoal)]">

      {/* HERO */}
      <section className="relative overflow-hidden min-h-[70vh] sm:min-h-[60vh] lg:min-h-[55vh] flex items-center justify-center">
        {/* Gradient background */}
        <div className="absolute inset-0 bg-gradient-to-b from-[var(--color-blush-light)] via-[var(--color-blush)] to-[var(--color-blush-deep)]" />

        {/* Content container */}
        <div className="relative max-w-6xl mx-auto px-6 lg:px-10 py-16 sm:py-20 md:py-24 text-center">
          {/* Logo */}
          <div className="flex justify-center items-center mb-8 sm:mb-10">
            <img
              src="/images/logo-chandelier-dark.png"
              alt="Carolyn Snell Realtor Logo"
              className="h-40 sm:h-48 md:h-52 w-auto mx-auto opacity-95"
            />
          </div>

         {/* Animated Heading */}
<motion.h1
  className="text-4xl sm:text-5xl md:text-6xl font-extrabold mb-5 sm:mb-6 tracking-tight text-[var(--color-charcoal)] drop-shadow-[0_1px_1px_rgba(255,255,255,0.6)] leading-tight inline-block"
  initial="hidden"
  animate="visible"
  variants={{
    hidden: {},
    visible: {
      transition: { staggerChildren: 0.06 }, // typing speed
    },
  }}
>
  {"Find Your Dream Home".split("").map((char, index) => (
    <motion.span
      key={index}
      variants={{
        hidden: { opacity: 0, y: 12 },
        visible: { opacity: 1, y: 0 },
      }}
      transition={{ duration: 0.04, ease: "easeOut" }}
      style={{ display: "inline-block" }}
    >
      {char === " " ? "\u00A0" : char}
    </motion.span>
  ))}
</motion.h1>

          {/* Subheading */}
          <p className="text-base sm:text-lg md:text-xl text-[var(--color-text-body)]/90 max-w-2xl mx-auto mb-8 sm:mb-10 leading-relaxed">
            Discover curated listings, crafted experiences, and a modern approach
            to real estate built for you.
          </p>

          {/* CTA Button */}
          <Link
            href="/listings"
            className="inline-block bg-[#4B5563] hover:bg-[#374151] text-white font-semibold px-8 sm:px-10 py-3 sm:py-4 rounded-full shadow-[0_6px_15px_rgba(75,85,99,0.25)] hover:shadow-[0_8px_20px_rgba(55,65,81,0.35)] transition-all duration-300"
          >
            View Featured Listings
          </Link>
        </div>
      </section>

      {/* ABOUT */}
      <section className="bg-[var(--color-bg-paper)] max-w-6xl mx-auto px-6 lg:px-10 py-24 grid md:grid-cols-2 gap-12 items-center">
        <div>
          <HeroCarousel />
        </div>
        <div>
          <h2 className="text-3xl font-bold mb-5 text-[var(--color-charcoal)]">
            A Fresh Approach to Real Estate
          </h2>
          <p className="text-[var(--color-text-body)] mb-8 leading-relaxed">
            We combine local expertise with innovative technology to make buying
            and selling homes effortless. From curated listings to personalized
            insights, our mission is to help you move forward with confidence.
          </p>

          <Link
            href="/contact"
            className="bg-[#4B5563] hover:bg-[#374151] text-white font-semibold px-8 py-3 rounded-full shadow-[0_4px_12px_rgba(75,85,99,0.25)] hover:shadow-[0_6px_16px_rgba(55,65,81,0.35)] transition-all duration-300"
          >
            Contact Us
          </Link>
        </div>
      </section>

      {/* FEATURED LISTINGS */}
      <section className="bg-gradient-to-b from-[var(--color-bg-paper)] to-[var(--color-blush-light)] py-24 text-center overflow-hidden">
        <div className="max-w-6xl mx-auto px-6 lg:px-10">
          <h2 className="text-3xl font-bold mb-12 text-[var(--color-charcoal)]">
            Featured Listings
          </h2>

          {loading ? (
            <p className="text-gray-500 text-lg animate-pulse">
              Loading featured listings...
            </p>
          ) : listings.length === 0 ? (
            <p className="text-gray-500 text-lg">
              No featured listings available.
            </p>
          ) : (
            <AnimatePresence mode="popLayout">
              <motion.div
                key={listings.map((l) => l.id).join("-")}
                layout
                className="grid md:grid-cols-3 gap-10"
                initial="hidden"
                animate="visible"
                exit="exit"
                variants={{
                  hidden: {},
                  visible: { transition: { staggerChildren: 0.25 } },
                  exit: { transition: { staggerChildren: 0.15, staggerDirection: -1 } },
                }}
              >
                {listings.map((home, i) => (
                  <motion.div
                    key={home.id}
                    layout
                    variants={{
                      hidden: { opacity: 0 },
                      visible: { opacity: 1 },
                      exit: { opacity: 0 },
                    }}
                    transition={{ duration: 0.9, ease: [0.4, 0, 0.2, 1] }}
                    className="group bg-white rounded-2xl overflow-hidden shadow-lg border border-[var(--color-divider)]
                               hover:shadow-2xl hover:-translate-y-2 transition-all duration-500 ease-out"
                  >
                    <div className="relative overflow-hidden">
                      {/* Ken Burns effect */}
                      <motion.img
                        key={home.image}
                        layout
                        src={home.image}
                        alt={home.address}
                        initial={{ scale: 1.05, opacity: 0 }}
                        animate={{
                          scale: [1.05, 1.1, 1.05],
                          opacity: 1,
                          x: [0, 10, -10, 0],
                        }}
                        exit={{ opacity: 0 }}
                        transition={{
                          opacity: { duration: 0.8, ease: "easeOut" }, // fast fade-in
                          scale: { duration: 12, ease: "easeInOut", repeat: Infinity },
                          x: { duration: 12, ease: "easeInOut", repeat: Infinity },
                        }}
                        className="object-cover w-full h-64 sm:h-72 md:h-80 group-hover:scale-105 transition-transform duration-700"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/10 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                    </div>

                    <div className="p-6 text-left">
                      <h3 className="text-xl font-semibold text-[var(--color-charcoal)] mb-2 line-clamp-1">
                        {home.address}
                      </h3>
                      <p className="text-[#6B6B6B] mb-4">
                        ${home.price.toLocaleString()} — {home.city}, {home.state}
                      </p>
                      <Link
                        href={`/listings/${home.id}`}
                        className="text-[var(--color-coral)] font-semibold hover:underline transition-colors"
                      >
                        View Details →
                      </Link>
                    </div>
                  </motion.div>
                ))}
              </motion.div>
            </AnimatePresence>
          )}
        </div>
      </section>

      {/* TESTIMONIALS */}
      <section className="bg-[var(--color-bg-paper)] py-24 px-6 lg:px-10 text-center">
        <h2 className="text-3xl font-bold mb-12 text-[var(--color-charcoal)]">
          What Clients Say
        </h2>
        <div className="max-w-4xl mx-auto grid md:grid-cols-2 gap-10">
          <div className="bg-white p-10 rounded-2xl shadow-md border border-[var(--color-divider)]">
            <p className="italic text-[var(--color-text-body)] mb-4 leading-relaxed">
              “Carolyn made the entire process seamless and enjoyable. Her
              attention to detail and calm confidence set her apart.”
            </p>
            <p className="font-semibold text-[var(--color-coral)]">
              — The Johnson Family
            </p>
          </div>
          <div className="bg-white p-10 rounded-2xl shadow-md border border-[var(--color-divider)]">
            <p className="italic text-[var(--color-text-body)] mb-4 leading-relaxed">
              “From our first meeting to closing day, Carolyn exceeded every
              expectation. She truly cares about her clients.”
            </p>
            <p className="font-semibold text-[var(--color-coral)]">
              — Amanda & Chris R.
            </p>
          </div>
        </div>
      </section>

      {/* FINAL CTA */}
      <section className="py-28 text-center bg-gradient-to-r from-[var(--color-blush-deep)] via-[var(--color-blush)] to-[var(--color-blush-light)] text-[var(--color-charcoal)]">
        <h2 className="text-3xl md:text-4xl font-bold mb-6">
          Ready to Start Your Next Chapter?
        </h2>
        <p className="max-w-2xl mx-auto text-lg text-[var(--color-text-body)]/90 mb-10 leading-relaxed">
          Whether you’re buying or selling, Carolyn is here to help you every
          step of the way. Let’s find your dream home today.
        </p>

        <Link
          href="/contact"
          className="bg-[#4B5563] hover:bg-[#374151] text-white font-semibold px-10 py-4 rounded-full shadow-[0_6px_15px_rgba(75,85,99,0.25)] hover:shadow-[0_8px_20px_rgba(55,65,81,0.35)] transition-all duration-300"
        >
          Get in Touch
        </Link>
      </section>

      {/* FOOTER */}
      <footer className="bg-[var(--color-blush-light)] py-10 text-center text-sm text-[#6B6B6B]">
        <p>
          © {new Date().getFullYear()} Carolyn Snell Realtor — Built with Next.js + Tailwind CSS
        </p>
      </footer>
    </main>
  );
}
