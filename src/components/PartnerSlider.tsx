import { motion, AnimatePresence } from 'framer-motion';
import { useState, useEffect } from 'react';
import { ChevronRight, ChevronLeft } from 'lucide-react';

interface Partner {
  name: string;
  logo: string;
}

interface PartnerSliderProps {
  partners: Partner[];

}

export function PartnerSlider({ partners }: PartnerSliderProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const itemsPerSlide = 3;
  const totalSlides = Math.ceil(partners.length / itemsPerSlide);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % totalSlides);
    }, 5000);
    return () => clearInterval(timer);
  }, [totalSlides]);

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev + 1) % totalSlides);
  };

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev - 1 + totalSlides) % totalSlides);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="w-full bg-white/5 backdrop-blur-sm rounded-2xl p-8 shadow-xl border border-white/10"
    >


      <div className="relative">
        <button
          onClick={prevSlide}
          className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 z-10 bg-white/10 backdrop-blur-sm p-2 rounded-full hover:bg-white/20 transition-colors"
        >
          <ChevronLeft className="w-6 h-6 text-white" />
        </button>

        <button
          onClick={nextSlide}
          className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 z-10 bg-white/10 backdrop-blur-sm p-2 rounded-full hover:bg-white/20 transition-colors"
        >
          <ChevronRight className="w-6 h-6 text-white" />
        </button>

        <div className="overflow-hidden px-12">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentIndex}
              initial={{ opacity: 0, x: 100 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -100 }}
              transition={{ duration: 0.5 }}
              className="flex justify-center gap-8"
            >
              {partners
                .slice(
                  currentIndex * itemsPerSlide,
                  (currentIndex + 1) * itemsPerSlide
                )
                .map((partner, index) => (
                  <motion.div
                    key={`${partner.name}-${index}`}
                    whileHover={{ scale: 1.05 }}
                    className="bg-white/5 backdrop-blur-sm p-6 rounded-xl border border-white/10 shadow-lg"
                  >
                    <div className="w-36 sm:w-44 md:w-52 h-36 sm:h-44 md:h-52 flex items-center justify-center">
                      <img
                        src={partner?.logo}
                        alt={partner.name}
                        className="w-full h-full object-contain"
                      />
                    </div>
                    <div className="mt-4 text-center">
                      <h4 className="font-medium text-white/90">{partner.name}</h4>
                    </div>
                  </motion.div>
                ))}
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </motion.div>
  );
}