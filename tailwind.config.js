/** @type {import('tailwindcss').Config} */
module.exports = {
 content: [
  "./pages/**/*.{js,ts,jsx,tsx,mdx}",
  "./components/**/*.{js,ts,jsx,tsx,mdx}",
  "./src/**/*.{js,ts,jsx,tsx,mdx}",
  "./app/**/*.{js,ts,jsx,tsx,mdx}",
],

  theme: {
    extend: {
      colors: {
        // Core palette
        "brand-bg": "#FAF9F7",          // soft off-white background
        "brand-text": "#2A2A2A",        // deep charcoal for primary text
        "brand-deep": "#1F2937",        // dark slate/navy for accents & headers
        "brand-lux": "#BFA56C",         // muted brass/gold accent
        "brand-cta": "#8A6D5A",         // warm terracotta or brown-olive CTA
        "neutral-soft": "#E6E3DE",      // warm gray-beige neutral background

        // Optional supporting shades
        "brand-accent-light": "#D8D5D1", // light warm neutral (borders, cards)
        "brand-accent-dark": "#141B24",  // near-black for hover or footer
      },
    },
  },
  plugins: [],
};

