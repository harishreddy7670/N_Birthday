import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';

export default function StrangerThingsPopup() {
  const [answer, setAnswer] = useState('');
  const [isUnlocked, setIsUnlocked] = useState(false);
  const [error, setError] = useState(false);
  const navigate = useNavigate();

  // Floating particles array
  const particles = Array.from({ length: 30 });

  useEffect(() => {
    if (isUnlocked) {
      const timer = setTimeout(() => {
        navigate('/upside-down');
      }, 4000); // Wait 4 seconds for the success animation to play before routing
      return () => clearTimeout(timer);
    }
  }, [isUnlocked, navigate]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (answer.trim() === '11') {
      setIsUnlocked(true);
      setError(false);
    } else {
      setError(true);
      setTimeout(() => setError(false), 2000);
    }
  };

  return (
    <div className="relative min-h-screen bg-black overflow-hidden flex items-center justify-center font-sans">
      
      {/* Background Effects */}
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-[#0a0005]" /> {/* Deep dark base */}
        <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-b from-transparent via-[#200000] to-black opacity-60" />
        <div className="lightning-flash absolute inset-0 bg-white z-0 pointer-events-none" />
        <div className="vhs-noise z-10" />
      </div>

      {/* Floating Particles */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none z-10">
        {particles.map((_, i) => (
          <div
            key={i}
            className="absolute bg-red-500 rounded-full mix-blend-screen opacity-50"
            style={{
              width: Math.random() * 6 + 2 + 'px',
              height: Math.random() * 6 + 2 + 'px',
              left: Math.random() * 100 + 'vw',
              top: Math.random() * 100 + 'vh',
              animation: `float ${Math.random() * 5 + 5}s linear infinite`,
              animationDelay: `-${Math.random() * 5}s`,
              boxShadow: '0 0 10px 2px rgba(255,0,0,0.8)'
            }}
          />
        ))}
      </div>

      {/* Main Content */}
      <div className="relative z-20 flex flex-col items-center justify-center p-4 w-full max-w-xl">
        <AnimatePresence mode="wait">
          {!isUnlocked ? (
            <motion.div
              key="question"
              initial={{ opacity: 0, scale: 0.9, y: 50 }}
              whileInView={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 1.1, filter: 'blur(10px)' }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              className="bg-black/40 backdrop-blur-md p-8 md:p-12 border border-red-900/50 rounded-xl box-glow-red flex flex-col items-center text-center relative overflow-hidden w-full"
            >
              {/* Eerie portal glow inside box */}
              <div className="absolute inset-0 bg-gradient-to-t from-red-900/20 to-transparent pointer-events-none" />
              
              <h2 className="font-cinzel text-5xl md:text-6xl font-black text-transparent bg-clip-text bg-gradient-to-b from-red-500 to-red-800 text-glow-red mb-8 tracking-widest uppercase">
                Warning
              </h2>
              
              <p className="text-white/80 text-xl md:text-2xl mb-8 font-mono">
                What is the value of 1 adds 1?
              </p>

              <form onSubmit={handleSubmit} className="w-full flex flex-col items-center">
                <div className="relative w-full max-w-xs mb-6">
                  <input
                    type="text"
                    value={answer}
                    onChange={(e) => setAnswer(e.target.value)}
                    placeholder="Enter the answer..."
                    className={`w-full bg-black/60 border-2 ${error ? 'border-red-500 animate-pulse' : 'border-red-900/50'} text-red-500 text-center text-2xl font-cinzel py-3 px-4 rounded outline-none focus:border-red-500 transition-colors shadow-[inset_0_0_10px_rgba(255,0,0,0.2)]`}
                    autoComplete="off"
                  />
                  {error && (
                    <motion.p 
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      className="absolute -bottom-6 left-0 right-0 text-red-500 text-sm font-bold tracking-widest"
                    >
                      INCORRECT
                    </motion.p>
                  )}
                </div>
                
                <button
                  type="submit"
                  className="px-8 py-3 bg-red-900/30 hover:bg-red-800/50 text-red-100 font-cinzel text-xl tracking-widest border border-red-500/50 rounded transition-all box-glow-red hover:shadow-[0_0_30px_rgba(255,0,0,0.8)]"
                >
                  SUBMIT
                </button>
              </form>

              <p className="mt-8 text-gray-500 text-sm italic opacity-70 hover:opacity-100 transition-opacity font-mono">
                Hint: It is visible on screen.
              </p>
            </motion.div>
          ) : (
            <motion.div
              key="success"
              initial={{ opacity: 0, scale: 0.8, filter: 'blur(20px)' }}
              animate={{ opacity: 1, scale: 1, filter: 'blur(0px)' }}
              transition={{ duration: 1.5, ease: "easeOut" }}
              className="text-center"
            >
              <h2 className="font-cinzel text-7xl md:text-9xl font-black text-transparent bg-clip-text bg-gradient-to-b from-blue-400 to-blue-800 text-glow-blue tracking-[0.2em] uppercase">
                Welcome
              </h2>
              <motion.p 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1, duration: 2 }}
                className="mt-6 text-blue-200 text-2xl md:text-3xl font-cinzel tracking-widest text-glow-blue"
              >
                TO THE UPSIDE DOWN
              </motion.p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
