import { useEffect, useState } from "react";

const images = [
  "/images/carolyn-headshot.jpg", // always first
  "/images/home1.jpg",
  "/images/home2.jpg",
  "/images/home3.jpg",
];

export default function HeroCarousel() {
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);

  useEffect(() => {
    if (paused) return;
    const timer = setInterval(() => {
      setIndex((i) => (i + 1) % images.length);
    }, 6000);
    return () => clearInterval(timer);
  }, [paused]);

  return (
    <div
      className="relative w-full h-[26rem] md:h-[28rem] rounded-2xl overflow-hidden shadow-xl"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      {images.map((img, i) => (
        <img
          key={img}
          src={img}
          alt=""
          className={`absolute inset-0 w-full h-full object-cover object-top transition-all duration-[1500ms] ease-in-out ${
            i === index ? "opacity-100 scale-100" : "opacity-0 scale-105"
          }`}
        />
      ))}

      {/* soft overlay for balance */}
      <div className="absolute inset-0 bg-gradient-to-t from-[#00000033] via-[#00000010] to-transparent pointer-events-none" />

      {/* tagline (first image only) */}
      {index === 0 && (
        <div className="absolute bottom-5 left-0 w-full text-center px-4">
          <p
            className="font-serif text-[1.2rem] md:text-[1.4rem] tracking-wide 
                       text-transparent bg-[linear-gradient(90deg,#ffffff,#f4d0d6,#ffffff)] 
                       bg-[length:250%_auto] bg-clip-text 
                       animate-pinkshimmer whitespace-nowrap 
                       drop-shadow-[0_2px_6px_rgba(0,0,0,0.55)]"
          >
            Exceeding What Others Call Exceptional.
          </p>
        </div>
      )}
    </div>
  );
}
