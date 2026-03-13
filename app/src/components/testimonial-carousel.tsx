"use client";

import { useState, useEffect, useCallback } from "react";
import { Star, ChevronLeft, ChevronRight } from "lucide-react";
import Image from "next/image";

const QUOTES = [
  {
    text: "The right way is always the best way.",
    name: "Chairman Okezie Ofoegbu",
    title: "Transworld Investment & Securities",
    image:
      "https://res.cloudinary.com/dzv7br1md/image/upload/v1770217315/Okezie_Ofoegbu_omxyfz.jpg",
  },
  {
    text: "True success is not only what we build, but how we build it\u2014and who we build it for.",
    name: "Engr. Robert Okechukwu Ofoegbu",
    title: "Founder & Chairman Emeritus",
    image:
      "https://res.cloudinary.com/dzv7br1md/image/upload/v1770224858/Chairman_Emeritus2_tkakj6.jpg",
  },
];

const AUTO_PLAY_MS = 7000;

export function TestimonialCarousel() {
  const [active, setActive] = useState(0);

  const next = useCallback(() => {
    setActive((prev) => (prev + 1) % QUOTES.length);
  }, []);

  const prev = useCallback(() => {
    setActive((prev) => (prev - 1 + QUOTES.length) % QUOTES.length);
  }, []);

  useEffect(() => {
    const timer = setInterval(next, AUTO_PLAY_MS);
    return () => clearInterval(timer);
  }, [next]);

  const quote = QUOTES[active];

  return (
    <div className="flex flex-col items-center gap-8 px-8">
      {/* Stars */}
      <div className="flex gap-1">
        {[...Array(5)].map((_, i) => (
          <Star
            key={i}
            className="h-5 w-5 fill-[#C9A64D] text-[#C9A64D]"
          />
        ))}
      </div>

      {/* Quote — fixed height so layout doesn't jump */}
      <div className="flex min-h-[120px] items-center">
        <blockquote
          key={active}
          className="animate-in fade-in duration-500 text-center text-[30px] font-medium leading-[1.27] text-white"
        >
          &ldquo;{quote.text}&rdquo;
        </blockquote>
      </div>

      {/* Attribution */}
      <div
        key={`attr-${active}`}
        className="animate-in fade-in duration-500 flex flex-col items-center gap-4"
      >
        <Image
          src={quote.image}
          alt={quote.name}
          width={64}
          height={64}
          className="h-16 w-16 rounded-full object-cover"
          unoptimized
        />
        <div className="text-center">
          <p className="text-base font-semibold text-white">{quote.name}</p>
          <p className="text-sm font-medium text-white/60">{quote.title}</p>
        </div>
      </div>

      {/* Navigation — arrows + dots */}
      <div className="flex items-center gap-16">
        <button
          onClick={prev}
          className="flex h-9 w-9 items-center justify-center rounded-lg text-white/50 transition-colors hover:text-white"
          aria-label="Previous quote"
        >
          <ChevronLeft className="h-5 w-5" />
        </button>

        <div className="flex items-center gap-4">
          {QUOTES.map((_, i) => (
            <button
              key={i}
              onClick={() => setActive(i)}
              className={`h-2.5 w-2.5 rounded-full transition-colors ${
                i === active ? "bg-white" : "bg-white/25"
              }`}
              aria-label={`Go to quote ${i + 1}`}
            />
          ))}
        </div>

        <button
          onClick={next}
          className="flex h-9 w-9 items-center justify-center rounded-lg text-white/50 transition-colors hover:text-white"
          aria-label="Next quote"
        >
          <ChevronRight className="h-5 w-5" />
        </button>
      </div>
    </div>
  );
}
