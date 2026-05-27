import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import { playRotateSound, playVictorySound } from '../utils/audio';


const GRID_SIZE = 5;
const TILE_COUNT = GRID_SIZE * GRID_SIZE;
const IMAGE_URL = '/images/puzzle.jpeg';

export default function RotatePuzzle() {
  const [tiles, setTiles] = useState([]);
  const [isSolved, setIsSolved] = useState(false);
  const [soundEnabled, setSoundEnabled] = useState(() => {
    return localStorage.getItem('sound_enabled') !== 'false';
  });

  useEffect(() => {
    // Initialize tiles with random rotations (0, 90, 180, 270 degrees)
    const initialTiles = Array.from({ length: TILE_COUNT }).map((_, index) => {
      // Favor mixed rotations
      let rotations = Math.floor(Math.random() * 4);
      // Give a slight chance to be correctly rotated just to mix it up, 
      // but mostly they will be scrambled
      return {
        id: index,
        currentRotation: rotations * 90,
      };
    });
    
    // Safety check in the astronomically rare case it's solved on load
    if (initialTiles.every(t => t.currentRotation % 360 === 0)) {
        initialTiles[0].currentRotation = 90;
    }

    setTiles(initialTiles);
  }, []);

  useEffect(() => {
    if (tiles.length > 0) {
      const solved = tiles.every((tile) => tile.currentRotation % 360 === 0);
      if (solved) {
        setIsSolved(true);
        if (soundEnabled) {
          playVictorySound();
        }
        localStorage.setItem('game_rotate_puzzle_completed', 'true');
      }
    }
  }, [tiles, soundEnabled]);

  const handleTileClick = (id) => {
    if (isSolved) return;

    if (soundEnabled) {
      playRotateSound();
    }

    setTiles((prevTiles) =>
      prevTiles.map((tile) =>
        tile.id === id
          ? { ...tile, currentRotation: tile.currentRotation + 90 }
          : tile
      )
    );
  };

  return (
    <div className="min-h-screen bg-black text-red-500 font-cinzel flex flex-col items-center justify-center p-4 md:p-8 selection:bg-red-900 selection:text-white relative overflow-hidden">
      
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

      {/* Background ambient effect */}
      <div className="absolute inset-0 pointer-events-none bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-red-900/10 via-black to-black opacity-80 z-0"></div>

      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
        className="z-10 w-full max-w-4xl flex flex-col items-center"
      >
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4 uppercase tracking-widest text-red-600 drop-shadow-[0_0_15px_rgba(220,38,38,0.8)] text-center">
          Demogorgon's Puzzle
        </h1>
        <p className="text-red-400/80 mb-8 text-sm md:text-base tracking-wide text-center uppercase">
          Realign the fragments to close the gate.
        </p>

        <div className="relative">
          <AnimatePresence>
            {isSolved && (
              <motion.div
                initial={{ opacity: 0, scale: 0.5 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.8, type: "spring", bounce: 0.4 }}
                className="absolute inset-[-20px] z-20 flex flex-col items-center justify-center bg-black/90 backdrop-blur-md border-4 border-red-600 rounded-xl shadow-[0_0_60px_rgba(220,38,38,0.8)]"
              >
                <motion.div 
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 }}
                  className="text-center"
                >
                  <h2 className="text-4xl md:text-6xl font-bold text-red-500 mb-2 drop-shadow-[0_0_20px_rgba(220,38,38,1)] animate-pulse uppercase">
                    Dimension Aligned
                  </h2>
                  <p className="text-red-400 mb-8 tracking-widest">The gate has been secured.</p>
                  
                  <Link
                    to={
                      localStorage.getItem('game_rotate_puzzle_completed') === 'true' &&
                      localStorage.getItem('game_sequence_memory_completed') === 'true' &&
                      localStorage.getItem('game_word_finder_completed') === 'true'
                        ? '/hawkins'
                        : '/upside-down'
                    }
                    className="inline-block px-8 py-4 bg-red-900/40 border-2 border-red-600 text-red-100 hover:bg-red-700 hover:text-white hover:shadow-[0_0_30px_rgba(220,38,38,1)] transition-all duration-300 rounded tracking-widest font-bold uppercase text-lg"
                  >
                    {localStorage.getItem('game_rotate_puzzle_completed') === 'true' &&
                     localStorage.getItem('game_sequence_memory_completed') === 'true' &&
                     localStorage.getItem('game_word_finder_completed') === 'true'
                      ? 'Enter Hawkins'
                      : 'Return to Reality'}
                  </Link>
                </motion.div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Puzzle Grid */}
          <div 
            className="grid grid-cols-5 grid-rows-5 gap-0.5 p-1 bg-black border-2 border-red-900/80 rounded shadow-[0_0_40px_rgba(153,27,27,0.4)] mx-auto relative z-10"
            style={{ 
              width: "min(85vw, 500px)", 
              height: "min(85vw, 500px)"
            }}
          >
            {tiles.map((tile) => {
              const row = Math.floor(tile.id / GRID_SIZE);
              const col = tile.id % GRID_SIZE;
              // Calculate background position percentages
              const bgPosX = (col / (GRID_SIZE - 1)) * 100;
              const bgPosY = (row / (GRID_SIZE - 1)) * 100;

              return (
                <motion.div
                  key={tile.id}
                  className="relative cursor-pointer overflow-hidden group bg-zinc-900"
                  onClick={() => handleTileClick(tile.id)}
                  whileHover={!isSolved ? { scale: 0.95, zIndex: 10 } : {}}
                  whileTap={!isSolved ? { scale: 0.9 } : {}}
                >
                  <motion.div
                    animate={{ rotate: tile.currentRotation }}
                    transition={{ type: "spring", stiffness: 200, damping: 20 }}
                    className="w-full h-full bg-no-repeat"
                    style={{
                      backgroundImage: `url(${IMAGE_URL})`,
                      backgroundSize: `${GRID_SIZE * 100}% ${GRID_SIZE * 100}%`,
                      backgroundPosition: `${bgPosX}% ${bgPosY}%`,
                    }}
                  />
                  {/* Subtle hover overlay */}
                  {!isSolved && (
                    <div className="absolute inset-0 bg-red-600/0 group-hover:bg-red-600/20 transition-colors duration-300 pointer-events-none" />
                  )}
                  {/* Subtle grid line overlay */}
                  <div className="absolute inset-0 border border-black/50 pointer-events-none" />
                </motion.div>
              );
            })}
          </div>
        </div>

        {!isSolved && (
          <div className="mt-12 flex flex-col items-center space-y-4">
            <p className="text-red-500/50 text-xs tracking-widest uppercase">Click on fragments to rotate them</p>
            <Link
              to="/upside-down"
              className="px-6 py-2 border border-red-900/80 text-red-600/80 hover:bg-red-900/30 hover:text-red-400 hover:border-red-600 transition-all duration-300 rounded tracking-widest text-sm uppercase"
            >
              Flee The Upside Down
            </Link>
          </div>
        )}
      </motion.div>
    </div>
  );
}
