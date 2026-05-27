import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import { playSequenceBeep, playErrorSound, playVictorySound } from '../utils/audio';


const ALL_IMAGES = [
  '/images/seq1.jpeg',
  '/images/seq2.jpeg',
  '/images/seq3.jpeg',
  '/images/seq4.jpeg',
  '/images/seq5.jpeg',
  '/images/seq6.jpeg',
  '/images/seq7.jpeg',
  '/images/seq8.jpeg',
  '/images/seq9.jpeg',
  '/images/seq10.jpeg',
];

const shuffleArray = (array) => {
  const newArr = [...array];
  for (let i = newArr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [newArr[i], newArr[j]] = [newArr[j], newArr[i]];
  }
  return newArr;
};

export default function SequenceMemory() {
  const [targetSequence, setTargetSequence] = useState([]);
  const [displayGrid, setDisplayGrid] = useState([]);
  const [showingSequence, setShowingSequence] = useState(false);
  const [currentShowIndex, setCurrentShowIndex] = useState(-1);
  const [selectedSequence, setSelectedSequence] = useState([]);
  const [gameStatus, setGameStatus] = useState('idle'); // idle, playing, won, error
  const [soundEnabled, setSoundEnabled] = useState(() => {
    return localStorage.getItem('sound_enabled') !== 'false';
  });

  useEffect(() => {
    const shuffledForTarget = shuffleArray(ALL_IMAGES);
    setTargetSequence(shuffledForTarget);
    setDisplayGrid(shuffleArray(ALL_IMAGES));
  }, []);

  const playSequence = () => {
    if (showingSequence) return;
    setShowingSequence(true);
    setSelectedSequence([]);
    setGameStatus('playing');
    setCurrentShowIndex(0);
  };

  useEffect(() => {
    if (showingSequence && currentShowIndex < targetSequence.length) {
      if (soundEnabled && currentShowIndex >= 0) {
        playSequenceBeep(currentShowIndex);
      }
      const timer = setTimeout(() => {
        setCurrentShowIndex(prev => prev + 1);
      }, 1000); 
      return () => clearTimeout(timer);
    } else if (showingSequence && currentShowIndex >= targetSequence.length) {
      setShowingSequence(false);
      setCurrentShowIndex(-1);
    }
  }, [showingSequence, currentShowIndex, targetSequence.length, soundEnabled]);

  const handleImageClick = (img) => {
    if (showingSequence || gameStatus === 'won') return;
    if (selectedSequence.includes(img)) return;

    const newSelection = [...selectedSequence, img];
    const currentIndex = newSelection.length - 1;

    if (img !== targetSequence[currentIndex]) {
      if (soundEnabled) {
        playErrorSound();
      }
      setGameStatus('error');
      setTimeout(() => {
        setSelectedSequence([]);
        setGameStatus('playing');
      }, 800);
      return;
    }

    if (soundEnabled) {
      playSequenceBeep(currentIndex);
    }

    setSelectedSequence(newSelection);

    if (newSelection.length === targetSequence.length) {
      if (soundEnabled) {
        playVictorySound();
      }
      setGameStatus('won');
      localStorage.setItem('game_sequence_memory_completed', 'true');
    }
  };

  return (
    <div className="min-h-screen bg-[#050505] text-red-600 font-cinzel flex flex-col items-center py-12 px-4 selection:bg-red-900 selection:text-white relative overflow-x-hidden">
      
      {/* Sound Toggle Button */}
      <button
        onClick={() => {
          const newSound = !soundEnabled;
          setSoundEnabled(newSound);
          localStorage.setItem('sound_enabled', String(newSound));
        }}
        className="absolute top-6 right-6 z-30 p-3 rounded-full border border-red-800/60 bg-black/50 text-red-500 hover:text-red-400 hover:border-red-500 hover:shadow-[0_0_15px_rgba(220,38,38,0.5)] transition-all duration-300 backdrop-blur-sm focus:outline-none"
        title={soundEnabled ? "Mute Sound" : "Unmute Sound"}
      >
        {soundEnabled ? (
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
            <path strokeLinecap="round" strokeLinejoin="round" d="M19.114 5.636a9 9 0 0 1 0 12.728M16.463 8.288a5.25 5.25 0 0 1 0 7.424M6.75 8.25l4.72-4.72a.75.75 0 0 1 1.28.53v15.88a.75.75 0 0 1-1.28.53l-4.72-4.72H4.51c-.88 0-1.704-.507-1.938-1.354A9.009 9.009 0 0 1 2.25 12c0-.83.112-1.633.322-2.396C2.806 8.756 3.63 8.25 4.51 8.25H6.75Z" />
          </svg>
        ) : (
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
            <path strokeLinecap="round" strokeLinejoin="round" d="M17.25 9.75 19.5 12m0 0 2.25 2.25M19.5 12l2.25-2.25M19.5 12l-2.25 2.25m-10.5-6 4.72-4.72a.75.75 0 0 1 1.28.53v15.88a.75.75 0 0 1-1.28.53l-4.72-4.72H4.51c-.88 0-1.704-.507-1.938-1.354A9.009 9.009 0 0 1 2.25 12c0-.83.112-1.633.322-2.396C2.806 8.756 3.63 8.25 4.51 8.25H6.75Z" />
          </svg>
        )}
      </button>

      {/* Background elements */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden opacity-20">
        <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_center,rgba(220,38,38,0.1)_0%,rgba(0,0,0,1)_70%)]" />
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-red-600/10 rounded-full blur-[100px]" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-red-800/10 rounded-full blur-[100px]" />
      </div>

      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="z-10 text-center mb-8"
      >
        <h1 className="text-4xl md:text-6xl font-bold uppercase tracking-[0.2em] text-red-600 drop-shadow-[0_0_15px_rgba(220,38,38,0.8)]">
          Sequence Memory
        </h1>
        <p className="mt-4 text-red-400/80 tracking-widest text-sm md:text-base max-w-xl mx-auto">
          Memorize the sequence. Reproduce it exactly. Do not fail.
        </p>
      </motion.div>

      <div className="z-10 flex flex-col items-center w-full max-w-4xl">
        
        {/* Controls */}
        <div className="mb-8 flex gap-4">
          <button
            onClick={playSequence}
            disabled={showingSequence || gameStatus === 'won'}
            className="px-6 py-2 border-2 border-red-700 text-red-500 hover:bg-red-900/30 hover:text-red-400 hover:shadow-[0_0_15px_rgba(220,38,38,0.6)] transition-all duration-300 rounded uppercase tracking-widest disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {showingSequence ? 'Memorize...' : 'Show Sequence'}
          </button>
        </div>

        {/* Error Flash */}
        <AnimatePresence>
          {gameStatus === 'error' && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-red-900/40 z-50 pointer-events-none mix-blend-screen"
            />
          )}
        </AnimatePresence>

        {/* Game Area */}
        <div className="relative w-full min-h-[500px] flex items-center justify-center">
          <AnimatePresence mode="wait">
            {showingSequence ? (
              <motion.div
                key={`show-${currentShowIndex}`}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 1.1 }}
                transition={{ duration: 0.3 }}
                className="absolute"
              >
                {currentShowIndex >= 0 && currentShowIndex < targetSequence.length && (
                  <div className="relative">
                    <img
                      src={targetSequence[currentShowIndex]}
                      alt={`Sequence ${currentShowIndex}`}
                      className="w-64 h-64 md:w-96 md:h-96 object-cover border-4 border-red-700 shadow-[0_0_40px_rgba(220,38,38,0.4)] rounded-md"
                    />
                    <div className="absolute -top-6 left-1/2 -translate-x-1/2 text-red-500 tracking-widest font-bold text-xl drop-shadow-[0_0_10px_rgba(220,38,38,0.8)]">
                      {currentShowIndex + 1} / {targetSequence.length}
                    </div>
                  </div>
                )}
              </motion.div>
            ) : gameStatus === 'won' ? (
              <motion.div
                key="won"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                className="text-center flex flex-col items-center p-8 bg-red-900/20 border-4 border-red-900/50 rounded-xl backdrop-blur-sm"
              >
                <motion.h2 
                  initial={{ y: -20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.2 }}
                  className="text-5xl md:text-7xl font-bold text-red-500 mb-4 drop-shadow-[0_0_20px_rgba(220,38,38,0.8)] tracking-widest"
                >
                  HAPPY BIRTHDAY!
                </motion.h2>
                <motion.h3
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.4 }}
                  className="text-2xl md:text-4xl text-red-400 mb-8 tracking-wider"
                >
                  CONGRATULATIONS ON MASTERING THE SEQUENCE!
                </motion.h3>
                <motion.p
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.6 }}
                  className="max-w-2xl text-red-300/80 mb-10 leading-relaxed text-lg"
                >
                  Your mind has survived the Upside Down. Wishing you an extraordinary year ahead, filled with as much mystery and excitement as Hawkins!
                </motion.p>
                <Link 
                  to={
                    localStorage.getItem('game_rotate_puzzle_completed') === 'true' &&
                    localStorage.getItem('game_sequence_memory_completed') === 'true' &&
                    localStorage.getItem('game_word_finder_completed') === 'true'
                      ? '/hawkins'
                      : '/upside-down'
                  } 
                  className="inline-block px-8 py-3 border-2 border-red-700 text-red-500 hover:bg-red-900/30 hover:text-red-400 hover:shadow-[0_0_15px_rgba(220,38,38,0.5)] transition-all duration-300 rounded uppercase tracking-widest"
                >
                  {localStorage.getItem('game_rotate_puzzle_completed') === 'true' &&
                   localStorage.getItem('game_sequence_memory_completed') === 'true' &&
                   localStorage.getItem('game_word_finder_completed') === 'true'
                    ? 'Enter Hawkins'
                    : 'Escape the Upside Down'}
                </Link>
              </motion.div>
            ) : (
              <motion.div
                key="grid"
                initial={{ opacity: 0 }}
                animate={{ 
                  opacity: 1,
                  x: gameStatus === 'error' ? [-10, 10, -10, 10, 0] : 0 
                }}
                transition={{ duration: gameStatus === 'error' ? 0.4 : 0.3 }}
                className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4 md:gap-6 w-full"
              >
                {displayGrid.map((img, idx) => {
                  const isSelected = selectedSequence.includes(img);
                  const selectionIndex = selectedSequence.indexOf(img);
                  
                  return (
                    <motion.div
                      key={idx}
                      whileHover={{ scale: isSelected ? 1 : 1.05 }}
                      whileTap={{ scale: isSelected ? 1 : 0.95 }}
                      onClick={() => handleImageClick(img)}
                      className={`relative aspect-square cursor-pointer rounded-md overflow-hidden border-2 transition-all duration-300 ${
                        isSelected 
                          ? 'border-red-500 shadow-[0_0_15px_rgba(220,38,38,0.6)] opacity-50' 
                          : 'border-red-900/50 hover:border-red-600 hover:shadow-[0_0_10px_rgba(220,38,38,0.4)]'
                      }`}
                    >
                      <img
                        src={img}
                        alt={`Grid image ${idx}`}
                        className="w-full h-full object-cover"
                      />
                      {isSelected && (
                        <div className="absolute inset-0 bg-red-900/40 flex items-center justify-center">
                          <span className="text-4xl md:text-5xl font-bold text-white drop-shadow-[0_0_10px_rgba(220,38,38,1)]">
                            {selectionIndex + 1}
                          </span>
                        </div>
                      )}
                    </motion.div>
                  );
                })}
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Progress Bar */}
        {!showingSequence && gameStatus === 'playing' && (
          <motion.div 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="mt-12 w-full max-w-md"
          >
            <div className="flex justify-between text-red-500 mb-2 tracking-widest text-sm">
              <span>Progress</span>
              <span>{selectedSequence.length} / {targetSequence.length}</span>
            </div>
            <div className="h-2 w-full bg-red-950 rounded overflow-hidden border border-red-900/50 shadow-[0_0_10px_rgba(220,38,38,0.2)]">
              <motion.div 
                className="h-full bg-red-600 shadow-[0_0_10px_rgba(220,38,38,0.8)]"
                initial={{ width: 0 }}
                animate={{ width: `${(selectedSequence.length / targetSequence.length) * 100}%` }}
                transition={{ duration: 0.3 }}
              />
            </div>
          </motion.div>
        )}
        
      </div>
    </div>
  );
}
