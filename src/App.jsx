import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import UpsideDown from './pages/UpsideDown';
import RotatePuzzle from './pages/RotatePuzzle';
import SequenceMemory from './pages/SequenceMemory';
import WordFinder from './pages/WordFinder';
import Hawkins from './pages/Hawkins';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/upside-down" element={<UpsideDown />} />
        <Route path="/rotate-puzzle" element={<RotatePuzzle />} />
        <Route path="/sequence-memory" element={<SequenceMemory />} />
        <Route path="/word-finder" element={<WordFinder />} />
        <Route path="/hawkins" element={<Hawkins />} />
      </Routes>
    </Router>
  );
}

export default App;
