import React, { useState, useEffect, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';

const GRID_SIZE = 15;
// The word "TRAININGANDPLACEMENTCELL" is 24 characters long and cannot fit in a 15x15 grid.
// It has been split into 'TRAINING', 'PLACEMENT', and 'CELL' to accommodate the requested 15x15 grid size.
const WORDS_TO_PLACE = [
  'ANIKSS', 'NASH', 'HARISS', 'VENKY', 'SID', 'MAHENDRA', 
  'RIVERATOWN', 'MANIT', 'UPPERLAKE', 'TEKRI', 'LRC', 'NTB', 
  'DBMALL', 'CHARLOTTE', 'MIMANSA', 'SANCHI', 
  'TRAINING', 'PLACEMENT', 'CELL'
];

const DIRS = [
  [0, 1], [1, 0], [1, 1], [-1, 1], [0, -1], [-1, 0], [-1, -1], [1, -1]
];

function generateWordSearch() {
  let grid = Array(GRID_SIZE).fill(null).map(() => Array(GRID_SIZE).fill(''));
  let placements = [];
  
  for (let word of WORDS_TO_PLACE) {
    let placed = false;
    let attempts = 0;
    while (!placed && attempts < 500) {
      attempts++;
      const dir = DIRS[Math.floor(Math.random() * DIRS.length)];
      const startR = Math.floor(Math.random() * GRID_SIZE);
      const startC = Math.floor(Math.random() * GRID_SIZE);
      
      let canPlace = true;
      let cells = [];
      for (let i = 0; i < word.length; i++) {
        const r = startR + i * dir[0];
        const c = startC + i * dir[1];
        
        if (r < 0 || r >= GRID_SIZE || c < 0 || c >= GRID_SIZE) {
          canPlace = false;
          break;
        }
        
        if (grid[r][c] !== '' && grid[r][c] !== word[i]) {
          canPlace = false;
          break;
        }
        cells.push({ r, c });
      }
      
      if (canPlace) {
        cells.forEach((cell, i) => {
          grid[cell.r][cell.c] = word[i];
        });
        placements.push({ word, cells });
        placed = true;
      }
    }
    if (!placed) {
      return null; // Failed to place a word, triggers regeneration
    }
  }
  
  const letters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
  for (let r = 0; r < GRID_SIZE; r++) {
    for (let c = 0; c < GRID_SIZE; c++) {
      if (grid[r][c] === '') {
        grid[r][c] = letters[Math.floor(Math.random() * letters.length)];
      }
    }
  }
  
  return { grid, placements };
}

export default function WordFinder() {
  const [gameData, setGameData] = useState(null);
  const [selectedCells, setSelectedCells] = useState([]);
  const [foundWords, setFoundWords] = useState([]);
  const [foundCells, setFoundCells] = useState([]);
  const [isWon, setIsWon] = useState(false);

  useEffect(() => {
    let data = null;
    while (!data) {
      data = generateWordSearch();
    }
    setGameData(data);
  }, []);

  useEffect(() => {
    if (!gameData) return;
    
    for (const placement of gameData.placements) {
      if (!foundWords.includes(placement.word)) {
        if (placement.cells.length === selectedCells.length) {
          const isMatch = placement.cells.every(pc => 
            selectedCells.some(sc => sc.r === pc.r && sc.c === pc.c)
          );
          
          if (isMatch) {
            setFoundWords(prev => [...prev, placement.word]);
            setFoundCells(prev => {
              const newFound = [...prev];
              placement.cells.forEach(pc => {
                if (!newFound.some(fc => fc.r === pc.r && fc.c === pc.c)) {
                  newFound.push(pc);
                }
              });
              return newFound;
            });
            setSelectedCells([]);
            break; 
          }
        }
      }
    }
  }, [selectedCells, gameData, foundWords]);

  useEffect(() => {
    if (foundWords.length === WORDS_TO_PLACE.length && WORDS_TO_PLACE.length > 0) {
      setIsWon(true);
      localStorage.setItem('game_word_finder_completed', 'true');
    }
  }, [foundWords]);

  const toggleCell = (r, c) => {
    setSelectedCells(prev => {
      const isSelected = prev.some(cell => cell.r === r && cell.c === c);
      if (isSelected) {
        return prev.filter(cell => cell.r !== r || cell.c !== c);
      } else {
        return [...prev, { r, c }];
      }
    });
  };

  const foundSet = useMemo(() => new Set(foundCells.map(c => `${c.r},${c.c}`)), [foundCells]);
  const selectedSet = useMemo(() => new Set(selectedCells.map(c => `${c.r},${c.c}`)), [selectedCells]);

  if (!gameData) {
    return <div className="min-h-screen bg-black flex items-center justify-center text-red-600 font-cinzel text-2xl">Loading the Upside Down...</div>;
  }

  return (
    <div className="min-h-screen bg-[#0a0000] text-red-600 font-cinzel flex flex-col items-center py-12 px-4 selection:bg-red-900 selection:text-white relative overflow-hidden">
      
      {/* Eerie Background Effects */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-red-900/10 blur-[100px] rounded-full mix-blend-screen animate-pulse"></div>
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-blue-900/10 blur-[120px] rounded-full mix-blend-screen animate-pulse" style={{ animationDelay: '2s' }}></div>
      </div>

      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
        className="z-10 w-full max-w-6xl flex flex-col items-center"
      >
        <h1 className="text-4xl md:text-6xl font-bold mb-4 uppercase tracking-widest text-transparent bg-clip-text bg-gradient-to-b from-red-500 to-red-800 drop-shadow-[0_0_15px_rgba(220,38,38,0.8)] text-center">
          Word Finder
        </h1>
        
        <p className="text-xl md:text-2xl mb-10 text-red-400 drop-shadow-[0_0_5px_rgba(220,38,38,0.5)] tracking-widest text-center">
          Words Remaining: {WORDS_TO_PLACE.length - foundWords.length}
        </p>

        <div className="flex flex-col lg:flex-row gap-8 lg:gap-16 w-full justify-center items-start">
          
          {/* Game Grid */}
          <div className="bg-black/60 p-3 md:p-5 rounded-xl border border-red-900/50 shadow-[0_0_40px_rgba(220,38,38,0.15)] backdrop-blur-sm">
            <div 
              className="grid gap-[2px] md:gap-1"
              style={{ gridTemplateColumns: `repeat(${GRID_SIZE}, minmax(0, 1fr))` }}
            >
              {gameData.grid.map((row, r) => 
                row.map((letter, c) => {
                  const isFound = foundSet.has(`${r},${c}`);
                  const isSelected = selectedSet.has(`${r},${c}`);
                  
                  let cellClasses = 'text-red-500 hover:bg-red-900/40 hover:text-red-300 border border-transparent hover:border-red-900/50';
                  
                  if (isSelected && isFound) {
                    cellClasses = 'bg-red-500 text-white shadow-[0_0_15px_rgba(220,38,38,0.9)] border border-red-300 z-10';
                  } else if (isFound) {
                    cellClasses = 'bg-red-900/80 text-red-200 shadow-[0_0_10px_rgba(220,38,38,0.6)] border border-red-800/50';
                  } else if (isSelected) {
                    cellClasses = 'bg-red-600 text-white shadow-[0_0_12px_rgba(220,38,38,0.8)] border border-red-500 z-10';
                  }

                  return (
                    <motion.div
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                      key={`${r}-${c}`}
                      onClick={() => toggleCell(r, c)}
                      className={`
                        flex items-center justify-center font-bold cursor-pointer transition-all duration-200 select-none
                        w-6 h-6 text-xs md:w-8 md:h-8 md:text-base lg:w-10 lg:h-10 lg:text-xl rounded-sm
                        ${cellClasses}
                      `}
                    >
                      {letter}
                    </motion.div>
                  )
                })
              )}
            </div>
          </div>

          {/* Word List */}
          <div className="w-full lg:w-72 bg-black/60 p-6 rounded-xl border border-red-900/50 shadow-[0_0_20px_rgba(220,38,38,0.1)] backdrop-blur-sm">
            <h2 className="text-2xl font-bold mb-6 border-b border-red-900/50 pb-3 text-red-500 text-center uppercase tracking-widest">Targets</h2>
            <div className="flex flex-wrap lg:flex-col gap-3 lg:gap-4 justify-center">
              {WORDS_TO_PLACE.map(word => {
                const isFound = foundWords.includes(word);
                return (
                  <div 
                    key={word}
                    className={`text-sm md:text-base tracking-widest transition-all duration-700 font-bold ${
                      isFound 
                        ? 'line-through text-red-900/70 scale-95' 
                        : 'text-red-400 drop-shadow-[0_0_5px_rgba(220,38,38,0.4)]'
                    }`}
                  >
                    {word}
                  </div>
                )
              })}
            </div>
          </div>
        </div>

        <div className="mt-16 flex flex-col items-center gap-8">
          <AnimatePresence>
            {isWon && (
              <motion.div
                initial={{ opacity: 0, scale: 0.5, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                className="text-center"
              >
                <div className="text-3xl md:text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-red-600 via-red-400 to-red-600 drop-shadow-[0_0_20px_rgba(220,38,38,1)] uppercase tracking-widest mb-2 animate-pulse">
                  CONGRATULATIONS!
                </div>
                <div className="text-xl md:text-2xl text-red-400 opacity-90 font-bold tracking-widest">
                  You have escaped the Upside Down.
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          <Link 
            to={
              isWon &&
              localStorage.getItem('game_rotate_puzzle_completed') === 'true' &&
              localStorage.getItem('game_sequence_memory_completed') === 'true' &&
              localStorage.getItem('game_word_finder_completed') === 'true'
                ? '/hawkins'
                : '/upside-down'
            }
            className="inline-block px-10 py-4 border-2 border-red-800/80 text-red-500 hover:bg-red-900/30 hover:text-red-400 hover:shadow-[0_0_20px_rgba(220,38,38,0.5)] hover:border-red-600 transition-all duration-300 rounded uppercase tracking-widest font-bold bg-black/50"
          >
            {isWon &&
             localStorage.getItem('game_rotate_puzzle_completed') === 'true' &&
             localStorage.getItem('game_sequence_memory_completed') === 'true' &&
             localStorage.getItem('game_word_finder_completed') === 'true'
              ? 'Enter Hawkins'
              : (isWon ? 'Return to Reality' : 'Go Back')}
          </Link>
        </div>
      </motion.div>
    </div>
  );
}
