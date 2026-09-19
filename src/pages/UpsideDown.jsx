import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

export default function UpsideDown() {
  const [allGamesCompleted, setAllGamesCompleted] = useState(false);

  useEffect(() => {
    const r = localStorage.getItem('game_rotate_puzzle_completed') === 'true';
    const s = localStorage.getItem('game_sequence_memory_completed') === 'true';
    const w = localStorage.getItem('game_word_finder_completed') === 'true';
    if (r && s && w) {
      setAllGamesCompleted(true);
    }
  }, []);

  const particles = Array.from({ length: 40 });

  return (
    <div className="relative min-h-screen bg-black overflow-x-hidden overflow-y-auto flex flex-col items-center justify-start pt-12 md:pt-20 pb-20 font-sans selection:bg-blue-900 selection:text-white text-white">
      {/* Background Effects */}
      <div className="fixed inset-0 z-0">
        <div className="absolute inset-0 bg-[#000511]" /> {/* Deep dark blue base */}
        <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-t from-[#001030] via-black to-black opacity-80" />
        <div className="lightning-flash absolute inset-0 bg-blue-500/10 z-0 pointer-events-none" />
        <div className="vhs-noise z-10 opacity-40 absolute inset-0 pointer-events-none" />
      </div>

      {/* Floating Particles (Floating DOWN instead of UP for upside down feel) */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none z-10 rotate-180">
        {particles.map((_, i) => (
          <div
            key={i}
            className="absolute bg-blue-500 rounded-full mix-blend-screen opacity-50"
            style={{
              width: Math.random() * 6 + 2 + 'px',
              height: Math.random() * 6 + 2 + 'px',
              left: Math.random() * 100 + 'vw',
              top: Math.random() * 100 + 'vh',
              animation: `float ${Math.random() * 5 + 5}s linear infinite`,
              animationDelay: `-${Math.random() * 5}s`,
              boxShadow: '0 0 10px 2px rgba(0,150,255,0.8)'
            }}
          />
        ))}
      </div>

      <motion.div 
        initial={{ opacity: 0, rotateX: 180 }}
        animate={{ opacity: 1, rotateX: 0 }}
        transition={{ duration: 2, ease: "easeOut" }}
        className="relative z-20 text-center flex flex-col items-center w-full max-w-6xl px-4"
      >
        <h1 className="font-cinzel text-3xl sm:text-5xl md:text-8xl font-black text-transparent bg-clip-text bg-gradient-to-b from-blue-400 to-blue-800 text-glow-blue uppercase tracking-widest mb-6 rotate-180 drop-shadow-2xl px-2">
          Happy Birthday NASH
        </h1>
        <p className="text-sm sm:text-base md:text-2xl text-blue-200/80 font-mono tracking-wider rotate-180 max-w-lg px-4 mb-16 sm:mb-20">
          Things might look a little different here... but the party is just getting started.
        </p>

        {/* Game Links Section */}
        <div className="flex flex-wrap justify-center gap-6 sm:gap-12 rotate-180 w-full">
          {/* Rotate Puzzle */}
          <Link to="/rotate-puzzle" className="group flex flex-col items-center transform transition-all duration-300 hover:scale-105">
            <div className="w-48 h-48 sm:w-56 sm:h-56 md:w-72 md:h-72 rounded-xl overflow-hidden border-2 border-red-900/50 group-hover:border-red-500 group-hover:shadow-[0_0_30px_rgba(239,68,68,0.6)] relative z-10 transition-all duration-500">
              <img src="/images/st_rotate_puzzle.png" alt="Rotate Puzzle" className="w-full h-full object-cover grayscale opacity-70 group-hover:grayscale-0 group-hover:opacity-100 transition-all duration-700" />
              <div className="absolute inset-0 bg-red-900/30 group-hover:bg-transparent transition-all duration-500" />
            </div>
            <span className="mt-4 sm:mt-6 font-cinzel text-base sm:text-xl md:text-2xl text-red-700/80 group-hover:text-red-400 tracking-[0.2em] uppercase transition-colors duration-300 drop-shadow-[0_0_8px_rgba(239,68,68,0.8)]">
              Rotate Puzzle
            </span>
          </Link>

          {/* Sequence Memory */}
          <Link to="/sequence-memory" className="group flex flex-col items-center transform transition-all duration-300 hover:scale-105">
            <div className="w-48 h-48 sm:w-56 sm:h-56 md:w-72 md:h-72 rounded-xl overflow-hidden border-2 border-blue-900/50 group-hover:border-blue-400 group-hover:shadow-[0_0_30px_rgba(59,130,246,0.6)] relative z-10 transition-all duration-500">
              <img src="/images/st_sequence_memory.png" alt="Sequence Memory" className="w-full h-full object-cover grayscale opacity-70 group-hover:grayscale-0 group-hover:opacity-100 transition-all duration-700" />
              <div className="absolute inset-0 bg-blue-900/30 group-hover:bg-transparent transition-all duration-500" />
            </div>
            <span className="mt-4 sm:mt-6 font-cinzel text-base sm:text-xl md:text-2xl text-blue-700/80 group-hover:text-blue-300 tracking-[0.2em] uppercase transition-colors duration-300 drop-shadow-[0_0_8px_rgba(59,130,246,0.8)]">
              Sequence Memory
            </span>
          </Link>

          {/* Word Finder */}
          <Link to="/word-finder" className="group flex flex-col items-center transform transition-all duration-300 hover:scale-105">
            <div className="w-48 h-48 sm:w-56 sm:h-56 md:w-72 md:h-72 rounded-xl overflow-hidden border-2 border-purple-900/50 group-hover:border-purple-400 group-hover:shadow-[0_0_30px_rgba(168,85,247,0.6)] relative z-10 transition-all duration-500">
              <img src="/images/st_word_finder.png" alt="Word Finder" className="w-full h-full object-cover grayscale opacity-70 group-hover:grayscale-0 group-hover:opacity-100 transition-all duration-700" />
              <div className="absolute inset-0 bg-purple-900/30 group-hover:bg-transparent transition-all duration-500" />
            </div>
            <span className="mt-4 sm:mt-6 font-cinzel text-base sm:text-xl md:text-2xl text-purple-700/80 group-hover:text-purple-300 tracking-[0.2em] uppercase transition-colors duration-300 drop-shadow-[0_0_8px_rgba(168,85,247,0.8)]">
              Word Finder
            </span>
          </Link>
        </div>

        {/* Hawkins Portal */}
        {allGamesCompleted && (
          <motion.div 
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1 }}
            className="rotate-180 mt-16 sm:mt-20 mb-10 w-full flex justify-center px-4"
          >
            <Link 
              to="/hawkins"
              className="relative group block animate-pulse"
            >
              <div className="absolute inset-0 bg-red-600 blur-[50px] opacity-50 group-hover:opacity-100 transition-opacity duration-500 rounded-full" />
              <div className="relative px-6 py-4 sm:px-12 sm:py-6 border-2 sm:border-4 border-red-500 bg-black/50 backdrop-blur-md rounded-full shadow-[0_0_50px_rgba(220,38,38,0.8)] overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-r from-red-900 via-transparent to-red-900 opacity-50 group-hover:opacity-80 transition-opacity duration-300" />
                <span className="relative z-10 font-cinzel text-lg sm:text-3xl md:text-5xl font-black text-white tracking-[0.15em] sm:tracking-[0.2em] uppercase drop-shadow-[0_0_10px_rgba(255,255,255,0.8)] group-hover:drop-shadow-[0_0_20px_rgba(255,255,255,1)] transition-all duration-300">
                  ENTER HAWKINS
                </span>
              </div>
            </Link>
          </motion.div>
        )}
      </motion.div>
    </div>
  );
}
