import { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { useHackathonStore } from '../store/hackathonStore';

export function CountdownTimer() {
  const endDate = useHackathonStore((state) => state.endDate);
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });
  const [isPaused, setIsPaused] = useState(false);
  const [offset, setOffset] = useState(0); // total pause time in ms
  const pauseStartRef = useRef<number | null>(null); // when pause started
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);


  useEffect(() => {
    const updateTimer = () => {
      const end = new Date(endDate).getTime();
      const now = new Date().getTime();

      const distance = end - now + offset;

      if (distance < 0) {
        clearInterval(timerRef.current!);
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 });
        return;
      }

      setTimeLeft({
        days: Math.floor(distance / (1000 * 60 * 60 * 24)),
        hours: Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
        minutes: Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60)),
        seconds: Math.floor((distance % (1000 * 60)) / 1000),
      });
    };

    if (!isPaused) {
      updateTimer(); // run immediately
      timerRef.current = setInterval(updateTimer, 1000);
    }

    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [endDate, offset, isPaused]);

  const togglePause = () => {
    if (isPaused) {
      // RESUMING: Add the time it was paused for to the offset
      const pauseEnd = new Date().getTime();
      if (pauseStartRef.current) {
        const pausedFor = pauseEnd - pauseStartRef.current;
        setOffset((prev) => prev + pausedFor);
      }
      pauseStartRef.current = null;
    } else {
      // PAUSING: record when we paused
      pauseStartRef.current = new Date().getTime();
    }
    setIsPaused((prev) => !prev);
  };

  return (
    <div className="relative">
      {/* Decorative background elements */}
      <div className="absolute inset-0 bg-gradient-to-r from-purple-500/20 to-cyan-500/20 blur-3xl transform -skew-y-6"></div>
      <div className="absolute inset-0 bg-gradient-to-l from-purple-500/10 to-cyan-500/10 blur-2xl"></div>

      <div className="relative bg-white/5 backdrop-blur-lg rounded-2xl p-12 shadow-2xl border border-white/10">
        <motion.h2 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-4xl md:text-6xl font-bold text-center mb-8 bg-gradient-to-r from-purple-500 to-cyan-500 text-transparent bg-clip-text"
        >
          Hackathon Countdown
        </motion.h2>

        <div className="flex justify-center gap-4 md:gap-8 mb-6">
          {Object.entries(timeLeft).map(([unit, value]) => (
            <motion.div
              key={unit}
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              className="flex flex-col items-center"
            >
              <motion.div
                key={value}
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                className="bg-gradient-to-br from-purple-500/10 to-cyan-500/10 backdrop-blur-md rounded-xl p-6 w-24 md:w-32 text-center shadow-xl border border-white/20"
              >
                <span className="text-3xl md:text-5xl font-bold bg-gradient-to-r from-white to-white/80 text-transparent bg-clip-text">
                  {value}
                </span>
              </motion.div>
              <span className="text-sm md:text-base mt-3 font-medium text-white/80 uppercase tracking-wider">
                {unit}
              </span>
            </motion.div>
          ))}
        </div>

        <div className="text-center">
          <button
            onClick={togglePause}
            className="px-6 py-2 bg-white/10 text-white rounded-full border border-white/20 hover:bg-white/20 transition"
          >
            {isPaused ? 'Resume' : 'Pause'}
          </button>
        </div>
      </div>
    </div>
  );
}
