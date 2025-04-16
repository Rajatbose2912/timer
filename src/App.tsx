import { useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { PartnersSection } from './components/PartnersSection';
import { AdminPage } from './components/AdminPage';
import { CountdownTimer } from './components/CountdownTimer';
import { motion, AnimatePresence } from 'framer-motion';

type SectionType = 'timer' | 'partners';

function HomePage() {
  const [visibleSection, setVisibleSection] = useState<SectionType>('timer');

  useEffect(() => {
    let timeoutId: ReturnType<typeof setTimeout>;

    const cycleSections = () => {
      timeoutId = setTimeout(() => {
        setVisibleSection((prev) => (prev === 'timer' ? 'partners' : 'timer'));
      }, visibleSection === 'timer' ? 2*60*  1000 : 2*60*  1000);
    };

    cycleSections();

    return () => clearTimeout(timeoutId);
  }, [visibleSection]);

  const animationProps = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: -20 },
    transition: { duration: 0.6 },
  };

  return (
    <div className="min-h-screen flex justify-center items-center bg-gray-900 text-white">
      <div className="container mx-auto px-4 py-12">
        <AnimatePresence mode="wait">
          {visibleSection === 'timer' && (
            <motion.div key="timer" {...animationProps}>
              <CountdownTimer />
            </motion.div>
          )}
          {visibleSection === 'partners' && (
            <motion.div key="partners" {...animationProps}>
              <PartnersSection />
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/admin" element={<AdminPage />} />
        <Route path="/" element={<HomePage />} />
      </Routes>
    </Router>
  );
}

export default App;
