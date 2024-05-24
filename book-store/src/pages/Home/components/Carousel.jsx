import { useEffect, useState } from "react";
import { ChevronLeft, ChevronRight } from "react-feather";

const Carousel = ({
  children: slides,
  autoSlide = false,
  autoSlideInterval = 3000,
}) => {
  const [curr, setCurr] = useState(0);

  const prev = () =>
    setCurr((curr) => (curr === 0 ? slides.length - 1 : curr - 1));
  const next = () =>
    setCurr((curr) => (curr === slides.length - 1 ? 0 : curr + 1));

  useEffect(() => {
    if (!autoSlide) return;
    const slideInterval = setInterval(next, autoSlideInterval);
    return () => clearInterval(slideInterval);
  });

  return (
    <div className="relative">
      <div className="overflow-hidden rounded-lg">
        <div
          className="flex transition-transform ease-out duration-500"
          style={{ transform: `translateX(-${curr * 100}%)` }}
        >
          {slides}
        </div>

        <div className="absolute bottom-3 right-0 left-0">
          <div className="flex items-center justify-center gap-2">
            {slides.map((_, i) => (
              <div
                className={`transition-all p-1 rounded-full ${
                  curr === i ? "px-3 bg-secondary" : "bg-white"
                }`}
              ></div>
            ))}
          </div>
        </div>
      </div>
      <div className="absolute inset-0 flex items-center justify-between">
        <button
          onClick={prev}
          className="p-[6px] custom-button hover:scale-175 ease-in duration-300 -translate-x-1/2"
        >
          <ChevronLeft size={13} />
        </button>
        <button
          onClick={next}
          className="p-[6px] custom-button hover:scale-175 ease-in duration-300 translate-x-1/2"
        >
          <ChevronRight size={13} />
        </button>
      </div>
    </div>
  );
};

export default Carousel;
