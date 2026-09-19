import React, { useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';

const GALLERY_IMAGES = [
  {
    id: 1,
    src: "/images/WhatsApp Image 2026-05-17 at 3.00.38 PM.jpeg",
    title: "Hawkins Secret File",
    category: "moments",
    defaultStyle: "polaroid",
    date: "Nov 1983",
    caption: "A classified capture from the Hawkins Lab archives. Eerie, yet nostalgic."
  },
  {
    id: 2,
    src: "/images/WhatsApp Image 2026-05-17 at 3.00.38 PM (1).jpeg",
    title: "Arcade High Score",
    category: "moments",
    defaultStyle: "vhs",
    date: "Oct 1984",
    caption: "Chasing high scores at the Palace Arcade. The sweet scent of popcorn and 8-bit sound effects."
  },
  {
    id: 3,
    src: "/images/WhatsApp Image 2026-05-17 at 3.00.38 PM (2).jpeg",
    title: "Castle Byers Sanctuary",
    category: "moments",
    defaultStyle: "upsidedown",
    date: "Jul 1985",
    caption: "A secret hideout hidden deep in the woods. Keep out! Password required."
  },
  {
    id: 4,
    src: "/images/WhatsApp Image 2026-05-17 at 3.00.39 PM.jpeg",
    title: "Starcourt Rendezvous",
    category: "moments",
    defaultStyle: "neon",
    date: "Jul 1985",
    caption: "Meeting under the bright neon lights of the Starcourt Mall. Let's grab a scoop!"
  },
  {
    id: 5,
    src: "/images/WhatsApp Image 2026-05-17 at 3.00.39 PM (1).jpeg",
    title: "Wheeler Basement Briefing",
    category: "moments",
    defaultStyle: "comic",
    date: "Nov 1983",
    caption: "Where all the master plans, D&D campaigns, and rescue operations are born."
  },
  {
    id: 6,
    src: "/images/WhatsApp Image 2026-05-16 at 4.13.58 PM.jpeg",
    title: "Creel House Shadows",
    category: "moments",
    defaultStyle: "vhs",
    date: "Mar 1986",
    caption: "A haunting view of the old Creel House. The grandfather clock is ticking..."
  },
  {
    id: 7,
    src: "/images/harish.jpeg",
    title: "Yours Truly, Harish",
    category: "moments",
    defaultStyle: "polaroid",
    date: "May 2026",
    caption: "A warm visual signature. Capturing the moments and smiles along the way."
  },
  {
    id: 8,
    src: "/images/puzzle.jpeg",
    title: "The Gate Decryption",
    category: "games",
    defaultStyle: "upsidedown",
    date: "May 2026",
    caption: "Decrypting the encrypted matrix. The barrier between worlds is thinning."
  },
  {
    id: 9,
    src: "/images/seq1.jpeg",
    title: "Shadow in the Void",
    category: "games",
    defaultStyle: "neon",
    date: "Phase 1",
    caption: "The first echo from the sequence. A dark outline emerges in the distance."
  },
  {
    id: 10,
    src: "/images/seq2.jpeg",
    title: "Demogorgon Whispers",
    category: "games",
    defaultStyle: "comic",
    date: "Phase 2",
    caption: "The lights are flickering. Something is hunting in the shadows of Hawkins."
  },
  {
    id: 11,
    src: "/images/seq3.jpeg",
    title: "The Transmitter Signal",
    category: "games",
    defaultStyle: "polaroid",
    date: "Phase 3",
    caption: "Can you hear me? Static noise and Morse code echoing through the airwaves."
  },
  {
    id: 12,
    src: "/images/seq4.jpeg",
    title: "Radio Tower Static",
    category: "games",
    defaultStyle: "vhs",
    date: "Phase 4",
    caption: "Searching for signals on top of the hill. A distant voice is calling out."
  },
  {
    id: 13,
    src: "/images/seq5.jpeg",
    title: "The Tear in the Veil",
    category: "games",
    defaultStyle: "upsidedown",
    date: "Phase 5",
    caption: "A glowing red rift appears. Be careful—don't let the vines touch you!"
  },
  {
    id: 14,
    src: "/images/seq6.jpeg",
    title: "The Pumpkin Patch",
    category: "games",
    defaultStyle: "neon",
    date: "Phase 6",
    caption: "Decaying pumpkins in the mist. There is rot spreading beneath the soil."
  },
  {
    id: 15,
    src: "/images/seq7.jpeg",
    title: "Scoops Ahoy Breakout",
    category: "games",
    defaultStyle: "comic",
    date: "Phase 7",
    caption: "Operation Child-Size is a go! Crawling through the vents of Starcourt Mall."
  },
  {
    id: 16,
    src: "/images/seq8.jpeg",
    title: "Bypassing the Sentries",
    category: "games",
    defaultStyle: "polaroid",
    date: "Phase 8",
    caption: "Sneaking past Russian guards. Stay in the shadows, keep the flashlights off!"
  },
  {
    id: 17,
    src: "/images/seq9.jpeg",
    title: "Upside Down Extraction",
    category: "games",
    defaultStyle: "vhs",
    date: "Phase 9",
    caption: "Running for the portal. The vines are reaching out, hurry before the gate closes!"
  },
  {
    id: 18,
    src: "/images/seq10.jpeg",
    title: "Hawkins Triumphant",
    category: "games",
    defaultStyle: "neon",
    date: "Phase 10",
    caption: "The gate is sealed. Nispriha and the gang celebrate another victory in Hawkins."
  },
  {
    id: 19,
    src: "/images/new_image.jpg",
    title: "A New Hawkins Memory",
    category: "moments",
    defaultStyle: "polaroid",
    date: "May 2026",
    caption: "A newly discovered memory from the Hawkins archives."
  }
];

const LETTER_PARAGRAPHS = [
  "Happy Birthday! ❤️",
  "I don't know where to start because there are so many memories I could write about, but when I think about our friendship, I mostly think about all those random moments that somehow became some of my favorite memories.",
  "College gave us a lot of good memories. All those times we went out, roamed around, sat in cafés, talked about random things, and just enjoyed being together — those moments were simple, but they were special.",
  "And then there was our Sanchi trip. Me, you, Anika ,Siddharth and Mahendra going in the car together... honestly, that is one of those trips I'll always remember. 😂 The whole trip, the random conversations, the fun we had — everything about it was memorable.",
  "I can never forget that night when we went to Bansal, ended up playing in the kids' area like actual kids, took so many photos, and then went to VIP Road. 😂 It was such a random night, but those are exactly the kind of memories that stay with you.",
  "And one thing I genuinely don't think I'll ever forget is you coming to the hostel to celebrate my birthday. You didn't have to, but you came and made that day more special for me. That's something I'll always remember and appreciate.",
  "Then there were all those shooting and paintball days — basically, whenever we got an opportunity to do something fun, we somehow ended up doing it. 😂",
  "But beyond all these memories, there is something I value even more about you.",
  "You have always been there.",
  "Whether it was replying to my messages, picking up my calls, listening to me, — you were always there. And especially after I came to Hyderabad, when I was going through a low phase, you were there for me. You might not even realize how much that meant to me, but I genuinely appreciate it.",
  "Looking back, I realize that friendship isn't always about doing something extraordinary. Sometimes it's just about having someone who stays, someone who responds, someone who listens, and someone with whom even the most random day becomes a good memory.",
  "I'm really grateful that college gave me a friend like you.",
  "I hope this birthday brings you everything you've been hoping for — lots of happiness, beautiful experiences, good people around you, and plenty of reasons to smile.",
  "And I hope we continue making stupid, random, unforgettable memories for many more years. ❤️",
  "Happy Birthday once again!",
  "Stay the same amazing person you are."
];

const LETTER_TEXT = LETTER_PARAGRAPHS.join('\n\n');
const SIGNATURE_TEXT = '— With love, Harish';

function WritingPen({ className }) {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 24 24"
      className={className}
    >
      <path d="M4 20l3.2-.8L19.5 6.9l-2.4-2.4L4.8 16.8 4 20z" fill="#b91c1c" stroke="#450a0a" strokeWidth="1" />
      <path d="M17.1 4.5l1.2-1.2a1.7 1.7 0 0 1 2.4 2.4l-1.2 1.2-2.4-2.4z" fill="#ef4444" stroke="#450a0a" strokeWidth="1" />
      <path d="M4 20l.8-3.2L7.2 19.2 4 20z" fill="#fca5a5" stroke="#450a0a" strokeWidth="1" />
      <path d="M7.2 16.8l7.9-7.9" stroke="#fca5a5" strokeWidth="1.2" strokeLinecap="round" opacity="0.8" />
    </svg>
  );
}

export default function Hawkins() {
  const [particles, setParticles] = useState([]);
  const navigate = useNavigate();

  const [activeCategory, setActiveCategory] = useState('all');
  const [globalStyle, setGlobalStyle] = useState('mixed');
  const [selectedImage, setSelectedImage] = useState(null);
  const [lightboxStyle, setLightboxStyle] = useState('normal');
  const [envelopeOpen, setEnvelopeOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [letterProgress, setLetterProgress] = useState(0);
  const [signatureProgress, setSignatureProgress] = useState(0);
  const letterScrollRef = useRef(null);
  const shouldAutoScrollLetter = useRef(true);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 640);
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    shouldAutoScrollLetter.current = true;
    setLetterProgress(0);
    setSignatureProgress(0);
    if (!envelopeOpen) return undefined;

    let writingTimer;
    const startWriting = window.setTimeout(() => {
      writingTimer = window.setInterval(() => {
        setLetterProgress((currentProgress) => {
          if (currentProgress >= LETTER_TEXT.length) {
            window.clearInterval(writingTimer);
            return LETTER_TEXT.length;
          }
          return currentProgress + 1;
        });
      }, 90);
    }, 850);

    return () => {
      window.clearTimeout(startWriting);
      if (writingTimer) window.clearInterval(writingTimer);
    };
  }, [envelopeOpen]);

  useEffect(() => {
    if (!envelopeOpen || letterProgress < LETTER_TEXT.length) return undefined;

    let signatureTimer;
    const startWriting = window.setTimeout(() => {
      signatureTimer = window.setInterval(() => {
        setSignatureProgress((currentProgress) => {
          if (currentProgress >= SIGNATURE_TEXT.length) {
            window.clearInterval(signatureTimer);
            return SIGNATURE_TEXT.length;
          }
          return currentProgress + 1;
        });
      }, 115);
    }, 900);

    return () => {
      window.clearTimeout(startWriting);
      if (signatureTimer) window.clearInterval(signatureTimer);
    };
  }, [envelopeOpen, letterProgress]);

  useEffect(() => {
    if (!letterScrollRef.current || !envelopeOpen || !shouldAutoScrollLetter.current) return;
    letterScrollRef.current.scrollTop = letterScrollRef.current.scrollHeight;
  }, [envelopeOpen, letterProgress]);

  const handleLetterScroll = () => {
    if (!letterScrollRef.current) return;
    const { scrollHeight, scrollTop, clientHeight } = letterScrollRef.current;
    shouldAutoScrollLetter.current = scrollHeight - scrollTop - clientHeight <= 8;
  };
  const [customFilters, setCustomFilters] = useState({
    brightness: 100,
    contrast: 100,
    saturation: 100,
    sepia: 0,
    grayscale: 0,
    blur: 0,
    invert: 0,
    hueRotate: 0
  });

  const handleOpenLightbox = (img) => {
    setSelectedImage(img);
    const defaultCardStyle = globalStyle === 'mixed' ? img.defaultStyle : globalStyle;
    setLightboxStyle(defaultCardStyle);

    // Set customized defaults based on style to make the image fit the preset beautifully!
    if (defaultCardStyle === 'vhs') {
      setCustomFilters({ brightness: 110, contrast: 120, saturation: 115, sepia: 0, grayscale: 0, blur: 0, invert: 0, hueRotate: 350 });
    } else if (defaultCardStyle === 'polaroid') {
      setCustomFilters({ brightness: 100, contrast: 105, saturation: 90, sepia: 25, grayscale: 0, blur: 0, invert: 0, hueRotate: 0 });
    } else if (defaultCardStyle === 'upsidedown') {
      setCustomFilters({ brightness: 75, contrast: 140, saturation: 35, sepia: 0, grayscale: 75, blur: 0, invert: 0, hueRotate: 0 });
    } else if (defaultCardStyle === 'neon') {
      setCustomFilters({ brightness: 100, contrast: 115, saturation: 150, sepia: 0, grayscale: 0, blur: 0, invert: 0, hueRotate: 45 });
    } else if (defaultCardStyle === 'comic') {
      setCustomFilters({ brightness: 105, contrast: 125, saturation: 155, sepia: 0, grayscale: 0, blur: 0, invert: 0, hueRotate: 0 });
    } else {
      setCustomFilters({ brightness: 100, contrast: 100, saturation: 100, sepia: 0, grayscale: 0, blur: 0, invert: 0, hueRotate: 0 });
    }
  };

  const handlePrevImage = () => {
    const filteredList = GALLERY_IMAGES.filter(img => activeCategory === 'all' || img.category === activeCategory);
    if (filteredList.length === 0) return;
    const currentIndex = filteredList.findIndex(img => img.id === selectedImage.id);
    const prevIndex = (currentIndex - 1 + filteredList.length) % filteredList.length;
    handleOpenLightbox(filteredList[prevIndex]);
  };

  const handleNextImage = () => {
    const filteredList = GALLERY_IMAGES.filter(img => activeCategory === 'all' || img.category === activeCategory);
    if (filteredList.length === 0) return;
    const currentIndex = filteredList.findIndex(img => img.id === selectedImage.id);
    const nextIndex = (currentIndex + 1) % filteredList.length;
    handleOpenLightbox(filteredList[nextIndex]);
  };

  const applyPreset = (presetName) => {
    switch (presetName) {
      case 'normal':
        setCustomFilters({ brightness: 100, contrast: 100, saturation: 100, sepia: 0, grayscale: 0, blur: 0, invert: 0, hueRotate: 0 });
        break;
      case 'vintage':
        setCustomFilters({ brightness: 95, contrast: 105, saturation: 80, sepia: 40, grayscale: 0, blur: 0, invert: 0, hueRotate: 10 });
        break;
      case 'vcr':
        setCustomFilters({ brightness: 115, contrast: 120, saturation: 110, sepia: 0, grayscale: 5, blur: 1, invert: 0, hueRotate: 340 });
        break;
      case 'rift':
        setCustomFilters({ brightness: 80, contrast: 150, saturation: 50, sepia: 0, grayscale: 10, blur: 0, invert: 100, hueRotate: 180 });
        break;
      case 'noir':
        setCustomFilters({ brightness: 90, contrast: 140, saturation: 0, sepia: 0, grayscale: 100, blur: 0, invert: 0, hueRotate: 0 });
        break;
      case 'cyber':
        setCustomFilters({ brightness: 100, contrast: 110, saturation: 180, sepia: 0, grayscale: 0, blur: 0, invert: 0, hueRotate: 90 });
        break;
      default:
        break;
    }
  };

  const filteredImages = GALLERY_IMAGES.filter(img => activeCategory === 'all' || img.category === activeCategory);

  useEffect(() => {
    // Generate some firework/confetti particles
    const newParticles = Array.from({ length: 150 }).map((_, i) => ({
      id: i,
      x: Math.random() * 100, // vw
      y: Math.random() * 100, // vh
      color: ['#ff0000', '#ff4d4d', '#cc0000', '#ff9999', '#ffffff', '#ffcc00'][Math.floor(Math.random() * 6)],
      delay: Math.random() * 2,
      duration: Math.random() * 3 + 2,
      size: Math.random() * 4 + 2
    }));
    setParticles(newParticles);
  }, []);

  return (
    <div className="relative min-h-screen bg-[#0a0a0a] overflow-x-hidden flex flex-col items-center justify-start font-cinzel pt-20 pb-20">

      {/* Retro 80s Grid Background */}
      <div className="fixed inset-0 pointer-events-none perspective-1000 z-0">
        <div className="absolute bottom-0 w-full h-[50vh] bg-gradient-to-t from-red-900/20 to-transparent transform rotate-x-60 origin-bottom" style={{
          backgroundImage: 'linear-gradient(rgba(255, 0, 0, 0.2) 1px, transparent 1px), linear-gradient(90deg, rgba(255, 0, 0, 0.2) 1px, transparent 1px)',
          backgroundSize: '40px 40px',
          backgroundPosition: 'center bottom',
          transform: 'perspective(500px) rotateX(60deg) translateY(100px) scale(2)',
        }} />
      </div>

      {/* Floating particles/fireworks */}
      <div className="fixed inset-0 pointer-events-none z-0">
        {particles.map((p) => (
          <motion.div
            key={p.id}
            className="absolute rounded-full shadow-[0_0_10px_currentColor]"
            style={{
              backgroundColor: p.color,
              color: p.color,
              left: `${p.x}vw`,
              top: `${p.y}vh`,
              width: `${p.size}px`,
              height: `${p.size}px`
            }}
            initial={{ opacity: 0, scale: 0, y: 50 }}
            animate={{ opacity: [0, 1, 0.8, 0], scale: [0, 1.5, 1, 0], y: -200 }}
            transition={{ duration: p.duration, delay: p.delay, repeat: Infinity, ease: "easeOut" }}
          />
        ))}
      </div>

      {/* Main Content */}
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1.5, ease: "easeOut" }}
        className="relative z-10 text-center flex flex-col items-center px-4 w-full max-w-7xl mx-auto"
      >
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 0.5, duration: 2, ease: "anticipate" }}
          className="mb-12"
        >
          <h2 className="text-xl sm:text-2xl md:text-4xl text-red-500 tracking-[0.4em] uppercase mb-4 drop-shadow-[0_0_15px_rgba(220,38,38,0.8)] font-light">
            Welcome back to
          </h2>
          <h1 className="text-5xl sm:text-7xl md:text-9xl font-black text-transparent bg-clip-text bg-gradient-to-b from-red-500 via-red-600 to-red-900 tracking-widest drop-shadow-[0_0_40px_rgba(220,38,38,1)] uppercase">
            Hawkins
          </h1>
        </motion.div>

        {/* Birthday Wish Card */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.5, duration: 1.5 }}
          className="bg-black/60 p-8 md:p-14 rounded-3xl border border-red-900/50 backdrop-blur-xl shadow-[0_0_50px_rgba(220,38,38,0.15)] max-w-4xl w-full mb-20 relative overflow-hidden group hover:border-red-500/50 transition-colors duration-500"
        >
          <div className="absolute inset-0 bg-gradient-to-br from-red-900/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

          <motion.h3
            animate={{
              textShadow: [
                "0 0 15px rgba(255,0,0,0.6)",
                "0 0 25px rgba(255,0,0,0.8)",
                "0 0 15px rgba(255,0,0,0.6)"
              ]
            }}
            transition={{ duration: 3, repeat: Infinity }}
            className="text-3xl sm:text-5xl md:text-6xl font-bold text-red-500 mb-4 tracking-widest uppercase relative z-10"
          >
            Happy Birthday
          </motion.h3>
          <motion.h1
            initial={{ scale: 0.95 }}
            animate={{ scale: 1 }}
            transition={{
              type: "spring",
              stiffness: 100,
              damping: 10,
              repeat: Infinity,
              repeatType: "reverse"
            }}
            className="text-4xl sm:text-6xl md:text-8xl font-black text-white mb-10 tracking-[0.15em] sm:tracking-[0.2em] drop-shadow-[0_0_20px_rgba(255,255,255,0.8)] uppercase relative z-10"
          >
            NISPRIHA
          </motion.h1>

          <div className="text-xl md:text-2xl text-gray-300 leading-relaxed font-sans font-light tracking-wide max-w-3xl mx-auto relative z-10">
            <p className="mb-8 font-normal text-white">
              You've survived the Upside Down, solved the mysteries, and made it back home!
            </p>
            <div className="space-y-6 text-gray-200 font-sans tracking-wide text-lg md:text-xl">

              <p className="leading-relaxed text-red-300 font-medium italic">
                May your birthday be as beautiful, extraordinary, and bright as the bond we share. Here's to a lifetime of epic adventures, endless laughs, and a friendship that outshines even the darkest nights!
              </p>
            </div>
          </div>
        </motion.div>

        {/* Hawkins Memory Portal Gallery Section */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.8, duration: 1.5 }}
          className="w-full flex flex-col items-center justify-start mt-10 mb-20 relative z-10"
        >
          {/* Header */}
          <div className="text-center mb-10">
            <h2 className="text-2xl sm:text-3xl md:text-5xl font-black text-transparent bg-clip-text bg-gradient-to-r from-red-600 via-orange-500 to-red-700 tracking-widest drop-shadow-[0_0_20px_rgba(239,68,68,0.5)] uppercase px-4">
              Hawkins Memory Portal
            </h2>
            <p className="text-gray-400 font-sans mt-3 text-sm md:text-base max-w-2xl mx-auto px-4 leading-relaxed">
              Step into the multidimensional archives. Switch frequencies and modulate realities below to view Nispriha's birthday images in different dimension styles!
            </p>
          </div>

          {/* Control Console */}
          <div className="w-full bg-[#07080c]/90 border border-red-950/80 rounded-3xl p-6 md:p-8 mb-12 shadow-[0_0_40px_rgba(220,38,38,0.15)] relative max-w-6xl mx-auto">
            {/* Retro grid pattern inside console */}
            <div className="absolute inset-0 bg-[linear-gradient(rgba(255,0,0,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,0,0,0.02)_1px,transparent_1px)] bg-[size:20px_20px] rounded-3xl pointer-events-none" />

            <div className="relative z-10">
              {/* Reality Modulator */}
              <div className="flex flex-col space-y-4 bg-black/40 p-5 md:p-6 rounded-2xl border border-red-950/30">
                <h4 className="text-xs md:text-sm font-bold text-cyan-400 tracking-[0.25em] uppercase flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-cyan-400 animate-pulse shadow-[0_0_10px_rgba(34,211,238,1)]" />
                  Reality Modulator (Style)
                </h4>
                <p className="text-xs text-gray-500 font-sans leading-tight">
                  Alters the dimensional state, frames, and filters of the archives.
                </p>
                <div className="flex flex-wrap gap-2.5 pt-2">
                  {[
                    { id: 'mixed', label: 'Mixed Styles', led: 'bg-yellow-400 shadow-[0_0_8px_rgba(250,204,21,1)]' },
                    { id: 'polaroid', label: 'Nostalgic Polaroid', led: 'bg-white shadow-[0_0_8px_rgba(255,255,255,1)]' },
                    { id: 'vhs', label: 'Analog VHS', led: 'bg-green-500 shadow-[0_0_8px_rgba(34,197,94,1)]' },
                    { id: 'neon', label: 'Cyber Neon', led: 'bg-pink-500 shadow-[0_0_8px_rgba(236,72,153,1)]' },
                    { id: 'upsidedown', label: 'Upside Down Rift', led: 'bg-purple-600 shadow-[0_0_8px_rgba(147,51,234,1)]' },
                    { id: 'comic', label: 'Comic Poster', led: 'bg-orange-500 shadow-[0_0_8px_rgba(249,115,22,1)]' }
                  ].map((style) => (
                    <button
                      key={style.id}
                      onClick={() => setGlobalStyle(style.id)}
                      className={`px-3 py-2 rounded-xl font-sans text-xs tracking-wider uppercase border transition-all duration-300 flex items-center gap-2 cursor-pointer ${globalStyle === style.id
                        ? 'bg-cyan-950/60 border-cyan-400 text-cyan-300 shadow-[0_0_15px_rgba(34,211,238,0.3)] font-bold'
                        : 'bg-black/60 border-gray-900 text-gray-500 hover:border-gray-800 hover:text-gray-300'
                        }`}
                    >
                      <span className={`w-1.5 h-1.5 rounded-full ${globalStyle === style.id ? style.led : 'bg-gray-800'}`} />
                      {style.label}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Gallery Grid */}
          <motion.div
            layout
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8 w-full max-w-6xl px-4 justify-items-center"
          >
            <AnimatePresence mode="popLayout">
              {filteredImages.map((img) => {
                const activeCardStyle = globalStyle === 'mixed' ? img.defaultStyle : globalStyle;

                return (
                  <motion.div
                    layout
                    key={img.id}
                    initial={{ opacity: 0, scale: 0.9, y: 20 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.8, y: 10 }}
                    transition={{ duration: 0.4 }}
                    className="relative flex justify-center items-center h-full cursor-pointer w-full"
                    onClick={() => handleOpenLightbox(img)}
                  >
                    {/* Render Styled Cards */}
                    {activeCardStyle === 'polaroid' && (
                      <div className="w-full bg-[#faf6ee] p-3.5 pb-11 rounded-sm shadow-[0_12px_24px_rgba(0,0,0,0.65)] border border-gray-200/80 transform hover:scale-[1.04] hover:rotate-[1.5deg] transition-all duration-300 flex flex-col relative group">
                        {/* Tape effect */}
                        <div className="absolute -top-3 left-1/2 -translate-x-1/2 w-16 h-6 bg-amber-600/25 backdrop-blur-[2px] border-x border-amber-700/10 rotate-2 z-10 pointer-events-none shadow-[0_1px_2px_rgba(0,0,0,0.1)]" />

                        <div className="w-full aspect-square overflow-hidden bg-stone-900 border border-stone-200/10 relative">
                          <img
                            src={img.src}
                            alt={img.title}
                            className="w-full h-full object-cover filter sepia-[20%] contrast-[105%] saturate-[95%] transition-all duration-500 group-hover:scale-105"
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-black/15 via-transparent to-transparent pointer-events-none" />
                        </div>

                        <div className="mt-4 flex flex-col items-center justify-center font-serif text-slate-700 select-none">
                          <span className="text-xs font-bold tracking-wide italic text-center max-w-full truncate">{img.title}</span>
                          <span className="text-[9px] text-slate-400 mt-1 font-mono tracking-widest uppercase">{img.date}</span>
                        </div>
                      </div>
                    )}

                    {activeCardStyle === 'vhs' && (
                      <div className="w-full bg-[#0a0b0e] border border-green-500/30 p-2.5 rounded-xl shadow-[0_0_18px_rgba(34,197,94,0.12)] hover:border-green-400/80 hover:shadow-[0_0_24px_rgba(34,197,94,0.3)] transform hover:scale-[1.04] transition-all duration-300 flex flex-col relative overflow-hidden group">
                        {/* REC Light */}
                        <div className="absolute top-4 right-4 flex items-center gap-1.5 bg-black/70 px-2 py-0.5 rounded-full z-10 border border-green-500/20">
                          <span className="w-1.5 h-1.5 rounded-full bg-red-500 animate-ping" />
                          <span className="w-1.5 h-1.5 rounded-full bg-red-500 absolute top-2 right-[27px]" />
                          <span className="text-[8px] font-mono text-red-500 font-bold uppercase tracking-wider">REC</span>
                        </div>

                        {/* Scanline Overlay */}
                        <div className="absolute inset-0 bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.35)_50%)] bg-[length:100%_4px] pointer-events-none z-10 opacity-60 group-hover:opacity-30 transition-opacity" />

                        <div className="w-full aspect-square overflow-hidden bg-black rounded-lg relative">
                          <img
                            src={img.src}
                            alt={img.title}
                            className="w-full h-full object-cover filter contrast-[112%] saturate-[105%] group-hover:scale-105 transition-all duration-500"
                          />
                          <div className="absolute inset-0 bg-gradient-to-tr from-green-500/10 via-transparent to-red-500/5 mix-blend-color pointer-events-none" />
                        </div>

                        <div className="mt-3 font-mono text-green-400 text-[10px] space-y-1 select-none">
                          <div className="flex justify-between font-bold">
                            <span className="truncate pr-2 uppercase">{img.title}</span>
                            <span className="text-[8px] bg-green-950/80 px-1 border border-green-500/30 uppercase">{img.date}</span>
                          </div>
                          <div className="text-[8px] text-green-600/80 flex justify-between font-semibold">
                            <span>SP PLAY 0:28:47</span>
                            <span>TUNER CH4</span>
                          </div>
                        </div>
                      </div>
                    )}

                    {activeCardStyle === 'neon' && (
                      (() => {
                        const neonColors = [
                          { border: 'border-pink-500/40 hover:border-pink-400', shadow: 'shadow-[0_0_15px_rgba(236,72,153,0.25)] hover:shadow-[0_0_25px_rgba(236,72,153,0.55)]', text: 'text-pink-400 drop-shadow-[0_0_5px_rgba(236,72,153,0.7)]', dot: 'bg-pink-500 shadow-[0_0_6px_rgba(236,72,153,1)]' },
                          { border: 'border-cyan-500/40 hover:border-cyan-400', shadow: 'shadow-[0_0_15px_rgba(6,182,212,0.25)] hover:shadow-[0_0_25px_rgba(6,182,212,0.55)]', text: 'text-cyan-400 drop-shadow-[0_0_5px_rgba(6,182,212,0.7)]', dot: 'bg-cyan-500 shadow-[0_0_6px_rgba(6,182,212,1)]' },
                          { border: 'border-yellow-500/40 hover:border-yellow-400', shadow: 'shadow-[0_0_15px_rgba(234,179,8,0.25)] hover:shadow-[0_0_25px_rgba(234,179,8,0.55)]', text: 'text-yellow-400 drop-shadow-[0_0_5px_rgba(234,179,8,0.7)]', dot: 'bg-yellow-500 shadow-[0_0_6px_rgba(234,179,8,1)]' }
                        ];
                        const col = neonColors[img.id % neonColors.length];
                        return (
                          <div className={`w-full bg-[#050608] p-3 rounded-2xl border ${col.border} ${col.shadow} transform hover:scale-[1.04] transition-all duration-300 flex flex-col relative group overflow-hidden`}>
                            <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />

                            <div className="w-full aspect-square overflow-hidden bg-black rounded-xl relative">
                              <img
                                src={img.src}
                                alt={img.title}
                                className="w-full h-full object-cover filter brightness-95 group-hover:brightness-105 transition-all duration-500 group-hover:scale-105"
                              />
                              <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-transparent to-transparent pointer-events-none" />
                            </div>

                            <div className="mt-3 flex flex-col select-none">
                              <span className={`text-xs md:text-sm font-sans font-black uppercase tracking-widest ${col.text} truncate`}>
                                {img.title}
                              </span>
                              <div className="flex justify-between items-center mt-1.5 text-[8px] font-mono text-gray-500">
                                <span className="tracking-widest uppercase">{img.date}</span>
                                <span className="flex items-center gap-1 font-semibold">
                                  <span className={`w-1.5 h-1.5 rounded-full ${col.dot} animate-pulse`} />
                                  NEON MOD
                                </span>
                              </div>
                            </div>
                          </div>
                        );
                      })()
                    )}

                    {activeCardStyle === 'upsidedown' && (
                      <div className="w-full bg-[#08090c] border border-red-950/70 p-3 rounded-xl shadow-[0_0_25px_rgba(0,0,0,0.85)] hover:border-red-600/60 hover:shadow-[0_0_25px_rgba(220,38,38,0.25)] transform hover:scale-[1.04] transition-all duration-500 flex flex-col relative group overflow-hidden">
                        {/* Spooky vignette overlay */}
                        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(0,0,0,0)_30%,rgba(0,0,0,0.9)_100%)] pointer-events-none z-10" />

                        {/* Glowing Rift Line */}
                        <div className="absolute bottom-0 left-0 w-full h-[2.5px] bg-red-600/80 shadow-[0_0_10px_rgba(220,38,38,0.8)] animate-pulse" />

                        <div className="w-full aspect-square overflow-hidden bg-black rounded-lg relative">
                          <img
                            src={img.src}
                            alt={img.title}
                            className="w-full h-full object-cover filter grayscale contrast-125 saturate-[45%] brightness-[70%] group-hover:grayscale-0 group-hover:brightness-90 group-hover:saturate-90 group-hover:scale-105 transition-all duration-700"
                          />
                        </div>

                        <div className="mt-3.5 select-none z-20">
                          <div className="flex justify-between items-center">
                            <span className="text-xs md:text-sm font-sans font-black text-red-600 tracking-wider uppercase group-hover:text-red-500 truncate max-w-[70%]">{img.title}</span>
                            <span className="text-[8px] font-mono text-purple-400 bg-purple-950/60 px-1.5 py-0.5 border border-purple-800/30 uppercase tracking-wider font-semibold">{img.date}</span>
                          </div>
                          <p className="text-[9px] text-gray-500 font-sans italic mt-1.5 truncate group-hover:text-gray-400 transition-colors">
                            {img.caption}
                          </p>
                        </div>
                      </div>
                    )}

                    {activeCardStyle === 'comic' && (
                      <div className="w-full bg-[#fcd34d] border-[3px] border-black p-3.5 shadow-[6px_6px_0px_#000] hover:translate-x-0.5 hover:translate-y-0.5 hover:shadow-[3px_3px_0px_#000] transform hover:scale-[1.02] transition-all flex flex-col relative group">
                        {/* Sticker Tag */}
                        <div className="absolute top-2.5 left-2.5 bg-red-600 text-white font-black text-[8px] uppercase tracking-widest px-2 py-0.5 border border-black z-10 shadow-[1.5px_1.5px_0px_#000]">
                          {img.date}
                        </div>

                        <div className="w-full aspect-square overflow-hidden bg-black border-2 border-black relative">
                          <img
                            src={img.src}
                            alt={img.title}
                            className="w-full h-full object-cover filter contrast-[115%] saturate-[125%] group-hover:scale-105 transition-all duration-300"
                          />
                        </div>

                        <div className="mt-3.5 flex flex-col select-none text-black">
                          <span className="font-black uppercase font-sans text-xs md:text-sm tracking-tight truncate border-b border-black pb-1">
                            {img.title}
                          </span>
                          <span className="mt-2 text-[9px] leading-tight font-bold italic text-black/77 font-sans truncate">
                            "{img.caption}"
                          </span>
                        </div>
                      </div>
                    )}
                  </motion.div>
                );
              })}
            </AnimatePresence>
          </motion.div>
        </motion.div>

        {/* Cinematic Lightbox Modal */}
        <AnimatePresence>
          {selectedImage && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-50 bg-black/95 backdrop-blur-md flex items-center justify-center p-4 md:p-6 overflow-y-auto"
            >
              <motion.div
                initial={{ scale: 0.9, y: 20 }}
                animate={{ scale: 1, y: 0 }}
                exit={{ scale: 0.9, y: 20 }}
                transition={{ type: "spring", stiffness: 300, damping: 25 }}
                className="relative bg-[#090a0f] border border-red-950/60 rounded-3xl w-full max-w-5xl shadow-[0_0_65px_rgba(239,68,68,0.25)] overflow-hidden flex flex-col lg:flex-row my-8"
              >
                {/* Close Button - Emergency Eject Style */}
                <button
                  onClick={() => setSelectedImage(null)}
                  className="absolute top-4 right-4 z-40 bg-red-950/80 hover:bg-red-700 border border-red-500/40 text-red-200 hover:text-white px-3 py-1.5 rounded-xl font-mono text-xs uppercase tracking-widest transition-all duration-300 flex items-center gap-1 cursor-pointer"
                >
                  <span className="w-1.5 h-1.5 rounded-full bg-red-500 animate-pulse" />
                  Eject
                </button>

                {/* Left Side: Dynamic Image Viewer */}
                <div className="w-full lg:w-3/5 bg-black/50 p-6 md:p-10 flex flex-col justify-center items-center border-b lg:border-b-0 lg:border-r border-red-950/30 relative min-h-[350px] lg:min-h-[500px]">
                  {/* Grid overlay for aesthetic */}
                  <div className="absolute inset-0 bg-[linear-gradient(rgba(255,0,0,0.015)_1px,transparent_1px),linear-gradient(90deg,rgba(255,0,0,0.015)_1px,transparent_1px)] bg-[size:30px_30px] pointer-events-none" />

                  {/* Left / Right Navigation Handles */}
                  <button
                    onClick={handlePrevImage}
                    className="absolute left-3 top-1/2 -translate-y-1/2 z-30 bg-black/80 hover:bg-red-950/60 border border-red-950/40 hover:border-red-500/50 text-red-500 hover:text-red-400 p-3 rounded-full transition-all duration-300 cursor-pointer"
                  >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7" /></svg>
                  </button>
                  <button
                    onClick={handleNextImage}
                    className="absolute right-3 top-1/2 -translate-y-1/2 z-30 bg-black/80 hover:bg-red-950/60 border border-red-950/40 hover:border-red-500/50 text-red-500 hover:text-red-400 p-3 rounded-full transition-all duration-300 cursor-pointer"
                  >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" /></svg>
                  </button>

                  {/* Dynamic Styled Canvas */}
                  <div className="relative w-full max-w-[380px] aspect-square flex justify-center items-center transition-all duration-500">

                    {/* Polaroid Frame Canvas */}
                    {lightboxStyle === 'polaroid' && (
                      <div className="w-full bg-[#faf6ee] p-4 pb-14 rounded-sm shadow-[0_15px_35px_rgba(0,0,0,0.85)] border border-gray-200/80 flex flex-col relative">
                        <div className="absolute -top-3 left-1/2 -translate-x-1/2 w-20 h-7 bg-amber-600/25 backdrop-blur-[2px] border-x border-amber-700/10 rotate-2 z-10 shadow-sm" />
                        <div className="w-full aspect-square overflow-hidden bg-stone-900 border border-stone-200/10">
                          <img
                            src={selectedImage.src}
                            alt={selectedImage.title}
                            style={{
                              filter: `
                                brightness(${customFilters.brightness}%) 
                                contrast(${customFilters.contrast}%) 
                                saturate(${customFilters.saturation}%) 
                                sepia(${customFilters.sepia}%) 
                                grayscale(${customFilters.grayscale}%) 
                                blur(${customFilters.blur}px) 
                                invert(${customFilters.invert}%) 
                                hue-rotate(${customFilters.hueRotate}deg)
                              `.trim().replace(/\s+/g, ' ')
                            }}
                            className="w-full h-full object-cover transition-all duration-200"
                          />
                        </div>
                        <div className="mt-4 flex flex-col items-center justify-center font-serif text-slate-700">
                          <span className="text-sm font-bold tracking-wide italic">{selectedImage.title}</span>
                          <span className="text-[10px] text-slate-400 mt-1 font-mono tracking-widest uppercase">{selectedImage.date}</span>
                        </div>
                      </div>
                    )}

                    {/* VHS Frame Canvas */}
                    {lightboxStyle === 'vhs' && (
                      <div className="w-full bg-[#0a0b0e] border-2 border-green-500 p-3 rounded-2xl shadow-[0_0_30px_rgba(34,197,94,0.35)] flex flex-col relative overflow-hidden">
                        <div className="absolute top-6 right-6 flex items-center gap-1.5 bg-black/80 px-2.5 py-1 rounded-full z-10 border border-green-500/20">
                          <span className="w-2 h-2 rounded-full bg-red-500 animate-ping" />
                          <span className="w-2 h-2 rounded-full bg-red-500 absolute top-2.5 right-[31px]" />
                          <span className="text-[9px] font-mono text-red-500 font-bold uppercase tracking-wider">REC</span>
                        </div>
                        <div className="absolute inset-0 bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.35)_50%)] bg-[length:100%_4px] pointer-events-none z-10 opacity-70" />
                        <div className="w-full aspect-square overflow-hidden bg-black rounded-lg">
                          <img
                            src={selectedImage.src}
                            alt={selectedImage.title}
                            style={{
                              filter: `
                                brightness(${customFilters.brightness}%) 
                                contrast(${customFilters.contrast}%) 
                                saturate(${customFilters.saturation}%) 
                                sepia(${customFilters.sepia}%) 
                                grayscale(${customFilters.grayscale}%) 
                                blur(${customFilters.blur}px) 
                                invert(${customFilters.invert}%) 
                                hue-rotate(${customFilters.hueRotate}deg)
                              `.trim().replace(/\s+/g, ' ')
                            }}
                            className="w-full h-full object-cover transition-all duration-200"
                          />
                        </div>
                        <div className="mt-4 font-mono text-green-400 text-xs space-y-1.5 select-none">
                          <div className="flex justify-between font-bold">
                            <span className="truncate pr-2 uppercase">{selectedImage.title}</span>
                            <span className="text-[9px] bg-green-950 px-1.5 border border-green-500/30 uppercase">{selectedImage.date}</span>
                          </div>
                          <div className="text-[9px] text-green-600 flex justify-between font-semibold">
                            <span>PLAY MODE</span>
                            <span>TUNER CH4</span>
                          </div>
                        </div>
                      </div>
                    )}

                    {/* Cyber Neon Frame Canvas */}
                    {lightboxStyle === 'neon' && (
                      <div className="w-full bg-[#050608] p-4 rounded-3xl border-2 border-pink-500 shadow-[0_0_35px_rgba(236,72,153,0.5)] flex flex-col relative overflow-hidden">
                        <div className="w-full aspect-square overflow-hidden bg-black rounded-2xl">
                          <img
                            src={selectedImage.src}
                            alt={selectedImage.title}
                            style={{
                              filter: `
                                brightness(${customFilters.brightness}%) 
                                contrast(${customFilters.contrast}%) 
                                saturate(${customFilters.saturation}%) 
                                sepia(${customFilters.sepia}%) 
                                grayscale(${customFilters.grayscale}%) 
                                blur(${customFilters.blur}px) 
                                invert(${customFilters.invert}%) 
                                hue-rotate(${customFilters.hueRotate}deg)
                              `.trim().replace(/\s+/g, ' ')
                            }}
                            className="w-full h-full object-cover transition-all duration-200"
                          />
                        </div>
                        <div className="mt-4 flex flex-col">
                          <span className="text-sm md:text-base font-sans font-black uppercase tracking-widest text-pink-400 drop-shadow-[0_0_5px_rgba(236,72,153,0.7)] truncate">
                            {selectedImage.title}
                          </span>
                          <div className="flex justify-between items-center mt-2 text-[10px] font-mono text-gray-500">
                            <span className="tracking-widest uppercase">{selectedImage.date}</span>
                            <span className="flex items-center gap-1.5 font-bold">
                              <span className="w-2 h-2 rounded-full bg-pink-500 animate-pulse shadow-[0_0_6px_rgba(236,72,153,1)]" />
                              CYBER GRID
                            </span>
                          </div>
                        </div>
                      </div>
                    )}

                    {/* Upside Down Frame Canvas */}
                    {lightboxStyle === 'upsidedown' && (
                      <div className="w-full bg-[#08090c] border-2 border-dashed border-red-600 p-4 rounded-2xl shadow-[0_0_35px_rgba(220,38,38,0.45)] flex flex-col relative overflow-hidden">
                        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(0,0,0,0)_30%,rgba(0,0,0,0.95)_100%)] pointer-events-none z-10" />
                        <div className="absolute bottom-0 left-0 w-full h-[3px] bg-red-600 shadow-[0_0_15px_rgba(220,38,38,1)] animate-pulse z-15" />
                        <div className="w-full aspect-square overflow-hidden bg-black rounded-xl">
                          <img
                            src={selectedImage.src}
                            alt={selectedImage.title}
                            style={{
                              filter: `
                                brightness(${customFilters.brightness}%) 
                                contrast(${customFilters.contrast}%) 
                                saturate(${customFilters.saturation}%) 
                                sepia(${customFilters.sepia}%) 
                                grayscale(${customFilters.grayscale}%) 
                                blur(${customFilters.blur}px) 
                                invert(${customFilters.invert}%) 
                                hue-rotate(${customFilters.hueRotate}deg)
                              `.trim().replace(/\s+/g, ' ')
                            }}
                            className="w-full h-full object-cover transition-all duration-200"
                          />
                        </div>
                        <div className="mt-4 select-none z-20">
                          <div className="flex justify-between items-center">
                            <span className="text-sm font-sans font-black text-red-500 tracking-wider uppercase drop-shadow-[0_0_5px_rgba(220,38,38,0.8)] truncate max-w-[70%]">{selectedImage.title}</span>
                            <span className="text-[9px] font-mono text-purple-400 bg-purple-950/80 px-2 py-0.5 border border-purple-800/40 uppercase tracking-widest font-semibold">{selectedImage.date}</span>
                          </div>
                        </div>
                      </div>
                    )}

                    {/* Comic Poster Canvas */}
                    {lightboxStyle === 'comic' && (
                      <div className="w-full bg-[#fcd34d] border-[4px] border-black p-4 shadow-[8px_8px_0px_#000] flex flex-col relative">
                        <div className="absolute top-2.5 left-2.5 bg-red-600 text-white font-black text-[9px] uppercase tracking-widest px-2.5 py-0.5 border-2 border-black z-10 shadow-[2px_2px_0px_#000]">
                          {selectedImage.date}
                        </div>
                        <div className="w-full aspect-square overflow-hidden bg-black border-[3px] border-black">
                          <img
                            src={selectedImage.src}
                            alt={selectedImage.title}
                            style={{
                              filter: `
                                brightness(${customFilters.brightness}%) 
                                contrast(${customFilters.contrast}%) 
                                saturate(${customFilters.saturation}%) 
                                sepia(${customFilters.sepia}%) 
                                grayscale(${customFilters.grayscale}%) 
                                blur(${customFilters.blur}px) 
                                invert(${customFilters.invert}%) 
                                hue-rotate(${customFilters.hueRotate}deg)
                              `.trim().replace(/\s+/g, ' ')
                            }}
                            className="w-full h-full object-cover transition-all duration-200"
                          />
                        </div>
                        <div className="mt-4 flex flex-col text-black font-sans">
                          <span className="font-black uppercase text-sm md:text-base tracking-tight truncate border-b-2 border-black pb-1">
                            {selectedImage.title}
                          </span>
                        </div>
                      </div>
                    )}

                    {/* Standard/None Frame Canvas */}
                    {lightboxStyle === 'normal' && (
                      <div className="w-full bg-black/60 p-2.5 rounded-2xl border border-gray-800 shadow-2xl flex flex-col">
                        <div className="w-full aspect-square overflow-hidden rounded-xl">
                          <img
                            src={selectedImage.src}
                            alt={selectedImage.title}
                            style={{
                              filter: `
                                brightness(${customFilters.brightness}%) 
                                contrast(${customFilters.contrast}%) 
                                saturate(${customFilters.saturation}%) 
                                sepia(${customFilters.sepia}%) 
                                grayscale(${customFilters.grayscale}%) 
                                blur(${customFilters.blur}px) 
                                invert(${customFilters.invert}%) 
                                hue-rotate(${customFilters.hueRotate}deg)
                              `.trim().replace(/\s+/g, ' ')
                            }}
                            className="w-full h-full object-cover transition-all duration-200"
                          />
                        </div>
                        <div className="mt-4 flex justify-between items-center text-gray-300 font-sans px-1">
                          <span className="font-bold text-sm tracking-wider uppercase">{selectedImage.title}</span>
                          <span className="text-[10px] font-mono text-gray-500 uppercase">{selectedImage.date}</span>
                        </div>
                      </div>
                    )}

                  </div>
                </div>

                {/* Right Side: Reality Modulator Console */}
                <div className="w-full lg:w-2/5 p-6 md:p-8 flex flex-col justify-between space-y-6">
                  {/* Console Header */}
                  <div>
                    <h3 className="text-xl font-black text-red-500 tracking-wider uppercase mb-1 drop-shadow-[0_0_5px_rgba(220,38,38,0.5)]">
                      Reality Modulator
                    </h3>
                    <p className="text-[11px] font-mono text-gray-500 uppercase tracking-widest mb-4">
                      Frequency: Decrypt-CH.44
                    </p>
                    <div className="p-3 bg-black/40 border border-red-950/40 rounded-xl font-sans text-xs text-gray-300 leading-normal mb-6">
                      <span className="text-red-400 font-semibold block mb-1">DATA LOG:</span>
                      {selectedImage.caption}
                    </div>
                  </div>

                  {/* Frame Style Modulators */}
                  <div className="space-y-3">
                    <h4 className="text-[10px] font-mono font-bold text-cyan-400 tracking-[0.2em] uppercase">
                      Dimensional Frame Selector
                    </h4>
                    <div className="grid grid-cols-3 gap-2">
                      {[
                        { id: 'normal', name: 'Raw' },
                        { id: 'polaroid', name: 'Polaroid' },
                        { id: 'vhs', name: 'VCR VHS' },
                        { id: 'neon', name: 'Neon' },
                        { id: 'upsidedown', name: 'Rift' },
                        { id: 'comic', name: 'Comic' }
                      ].map((style) => (
                        <button
                          key={style.id}
                          onClick={() => setLightboxStyle(style.id)}
                          className={`py-1.5 px-2.5 rounded-lg border font-mono text-[10px] uppercase tracking-wider text-center transition-all duration-300 cursor-pointer ${lightboxStyle === style.id
                            ? 'bg-cyan-950/60 border-cyan-400 text-cyan-300 shadow-[0_0_10px_rgba(34,211,238,0.2)]'
                            : 'bg-black/60 border-gray-800 text-gray-500 hover:border-gray-700 hover:text-gray-300'
                            }`}
                        >
                          {style.name}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Quick Filters Presets */}
                  <div className="space-y-3">
                    <h4 className="text-[10px] font-mono font-bold text-red-400 tracking-[0.2em] uppercase">
                      Quick Reality Presets
                    </h4>
                    <div className="grid grid-cols-3 gap-2">
                      {[
                        { id: 'normal', name: 'Standard' },
                        { id: 'vintage', name: 'Antique' },
                        { id: 'vcr', name: 'VCR Static' },
                        { id: 'rift', name: 'Rift (Inv)' },
                        { id: 'noir', name: 'Noir 1980' },
                        { id: 'cyber', name: 'Cyber Neon' }
                      ].map((preset) => (
                        <button
                          key={preset.id}
                          onClick={() => applyPreset(preset.id)}
                          className="py-1.5 px-2 bg-black/60 hover:bg-red-950/20 border border-gray-800 hover:border-red-950 text-gray-400 hover:text-red-400 rounded-lg font-mono text-[10px] uppercase tracking-wide text-center transition-all duration-300 cursor-pointer"
                        >
                          {preset.name}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Fine Tuning Sliders Console */}
                  <div className="space-y-3.5 bg-black/40 border border-red-950/20 p-4 rounded-2xl">
                    <h4 className="text-[10px] font-mono font-bold text-gray-400 tracking-[0.2em] uppercase">
                      Fine-Tuning Console
                    </h4>

                    {/* Brightness */}
                    <div className="flex flex-col space-y-1">
                      <div className="flex justify-between text-[9px] font-mono text-gray-500 font-bold">
                        <span>BRIGHTNESS</span>
                        <span className="text-gray-300">{customFilters.brightness} %</span>
                      </div>
                      <input
                        type="range"
                        min="50"
                        max="150"
                        value={customFilters.brightness}
                        onChange={(e) => setCustomFilters({ ...customFilters, brightness: parseInt(e.target.value) })}
                        className="w-full accent-red-600 h-1 bg-gray-900 rounded-lg cursor-pointer"
                      />
                    </div>

                    {/* Contrast */}
                    <div className="flex flex-col space-y-1">
                      <div className="flex justify-between text-[9px] font-mono text-gray-500 font-bold">
                        <span>CONTRAST</span>
                        <span className="text-gray-300">{customFilters.contrast} %</span>
                      </div>
                      <input
                        type="range"
                        min="50"
                        max="200"
                        value={customFilters.contrast}
                        onChange={(e) => setCustomFilters({ ...customFilters, contrast: parseInt(e.target.value) })}
                        className="w-full accent-red-600 h-1 bg-gray-900 rounded-lg cursor-pointer"
                      />
                    </div>

                    {/* Saturation */}
                    <div className="flex flex-col space-y-1">
                      <div className="flex justify-between text-[9px] font-mono text-gray-500 font-bold">
                        <span>SATURATION</span>
                        <span className="text-gray-300">{customFilters.saturation} %</span>
                      </div>
                      <input
                        type="range"
                        min="0"
                        max="200"
                        value={customFilters.saturation}
                        onChange={(e) => setCustomFilters({ ...customFilters, saturation: parseInt(e.target.value) })}
                        className="w-full accent-red-600 h-1 bg-gray-900 rounded-lg cursor-pointer"
                      />
                    </div>

                    {/* Sepia */}
                    <div className="flex flex-col space-y-1">
                      <div className="flex justify-between text-[9px] font-mono text-gray-500 font-bold">
                        <span>SEPIA / AGE</span>
                        <span className="text-gray-300">{customFilters.sepia} %</span>
                      </div>
                      <input
                        type="range"
                        min="0"
                        max="100"
                        value={customFilters.sepia}
                        onChange={(e) => setCustomFilters({ ...customFilters, sepia: parseInt(e.target.value) })}
                        className="w-full accent-red-600 h-1 bg-gray-900 rounded-lg cursor-pointer"
                      />
                    </div>

                    {/* Hue Rotate */}
                    <div className="flex flex-col space-y-1">
                      <div className="flex justify-between text-[9px] font-mono text-gray-500 font-bold">
                        <span>HUE ROTATE</span>
                        <span className="text-gray-300">{customFilters.hueRotate} °</span>
                      </div>
                      <input
                        type="range"
                        min="0"
                        max="360"
                        value={customFilters.hueRotate}
                        onChange={(e) => setCustomFilters({ ...customFilters, hueRotate: parseInt(e.target.value) })}
                        className="w-full accent-red-600 h-1 bg-gray-900 rounded-lg cursor-pointer"
                      />
                    </div>
                  </div>

                  {/* Reset Filters & Close */}
                  <div className="flex gap-3 pt-2">
                    <button
                      onClick={() => setCustomFilters({ brightness: 100, contrast: 100, saturation: 100, sepia: 0, grayscale: 0, blur: 0, invert: 0, hueRotate: 0 })}
                      className="w-1/3 py-2 border border-gray-800 hover:border-gray-700 bg-black/40 hover:bg-black/60 text-gray-400 hover:text-white rounded-xl font-mono text-xs uppercase tracking-wider transition-all duration-300 cursor-pointer"
                    >
                      Reset
                    </button>
                    <button
                      onClick={() => setSelectedImage(null)}
                      className="w-2/3 py-2 bg-gradient-to-r from-red-800 to-red-600 hover:from-red-700 hover:to-red-500 text-white rounded-xl font-mono text-xs uppercase tracking-wider shadow-[0_0_15px_rgba(239,68,68,0.25)] hover:shadow-[0_0_20px_rgba(239,68,68,0.45)] transition-all duration-300 cursor-pointer"
                    >
                      Close Interface
                    </button>
                  </div>
                </div>

              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Yours Truly Section */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 2, duration: 1 }}
          className="flex flex-col items-center justify-center mt-10 mb-10 w-full"
        >
          <div className="relative group">
            {/* Pulsing neon border glow */}
            <div className="absolute -inset-1 bg-gradient-to-r from-pink-500 via-red-500 to-yellow-500 rounded-2xl blur opacity-75 group-hover:opacity-100 transition duration-1000 group-hover:duration-200 animate-pulse"></div>

            {/* Image container */}
            <div className="relative bg-black p-3 rounded-2xl border border-red-900/30">
              <img
                src="/images/harish.jpeg"
                alt="Yours Truly Harish"
                className="w-48 h-48 md:w-56 md:h-56 object-cover rounded-xl transition-all duration-500 ease-out transform group-hover:scale-[1.02]"
              />
            </div>
          </div>

          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 2.5, duration: 0.8 }}
            className="mt-6 text-xl md:text-2xl font-mono text-transparent bg-clip-text bg-gradient-to-r from-pink-500 via-red-500 to-yellow-500 tracking-widest uppercase font-bold italic drop-shadow-[0_0_10px_rgba(239,68,68,0.5)]"
          >
            — Yours truly, Harish
          </motion.p>
        </motion.div>

        {/* Interactive Sealed Birthday Envelope & Letter */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 2.8, duration: 1.5 }}
          className="w-full flex flex-col items-center justify-center mt-24 mb-24 relative z-10 px-4"
        >
          {/* Header */}
          <div className="text-center mb-10">
            <h3 className="text-2xl md:text-3xl font-black text-transparent bg-clip-text bg-gradient-to-r from-yellow-500 via-red-500 to-yellow-600 tracking-widest drop-shadow-[0_0_10px_rgba(239,68,68,0.3)] uppercase">
              A Sealed Message
            </h3>
            <p className="text-gray-400 font-sans mt-2.5 text-xs md:text-sm max-w-md mx-auto">
              Click on the vintage wax seal to unlock Harish's secret birthday letter. Click again to close and reseal it!
            </p>
          </div>

          {/* Envelope 3D Container */}
          {/* Envelope 3D Container */}
          <div
            onClick={() => setEnvelopeOpen(!envelopeOpen)}
            className="relative w-[300px] h-[190px] sm:w-[350px] sm:h-[220px] md:w-[380px] md:h-[240px] cursor-pointer perspective-1000 mt-14 mb-16 flex items-center justify-center transition-all duration-300"
          >
            {/* Envelope Back Sheet */}
            <div className="absolute inset-0 bg-[#bdab9a] rounded-xl shadow-[0_15px_35px_rgba(0,0,0,0.65)] border border-amber-900/10 z-0 overflow-hidden">
              {/* Patterned liner */}
              <div className="absolute inset-2 border border-dashed border-amber-900/20 bg-[#efe7dd] rounded-lg" />
            </div>

            {/* The Letter (Emerging on Open) */}
            <motion.div
              onClick={(e) => e.stopPropagation()}
              animate={{
                y: envelopeOpen ? (isMobile ? -155 : -195) : 15,
                scale: envelopeOpen ? 1.08 : 0.01,
                opacity: envelopeOpen ? 1 : 0,
                zIndex: envelopeOpen ? 25 : 5,
                boxShadow: envelopeOpen
                  ? "0 25px 50px -12px rgba(0,0,0,0.7)"
                  : "0 4px 6px -1px rgba(0,0,0,0.1)"
              }}
              transition={{
                duration: 0.65,
                ease: "easeInOut",
                delay: envelopeOpen ? 0.35 : 0
              }}
              className={`absolute w-[92%] h-[210px] sm:h-[240px] md:h-[270px] bg-[#faf8f5] rounded-lg p-4 md:p-5 border border-stone-300 flex flex-col justify-between font-serif text-slate-800 origin-bottom ${
                envelopeOpen ? 'pointer-events-auto' : 'pointer-events-none'
              }`}
            >
              <div className="flex flex-col space-y-2 select-none overflow-hidden h-[80%]">
                <h4 className="text-base md:text-lg font-bold text-red-700 font-handwritten border-b border-red-200 pb-1 flex justify-between items-center">
                  <span>Dear Nispriha,</span>
                  <span className="text-sm text-gray-400 font-mono">2026.09.30</span>
                </h4>

                {/* Scrollable elegant content box */}
                <div ref={letterScrollRef} onScroll={handleLetterScroll} className="overflow-y-auto pr-1 text-sm md:text-base leading-relaxed text-slate-700 font-handwritten tracking-normal scrollbar-thin max-h-[125px] sm:max-h-[155px] md:max-h-[185px]">
                  <p className="whitespace-pre-line">
                    {LETTER_TEXT.slice(0, letterProgress)}
                    {envelopeOpen && letterProgress < LETTER_TEXT.length && (
                      <WritingPen className="inline-block ml-1 h-5 w-5 -rotate-[28deg] align-middle drop-shadow-[1px_1px_2px_rgba(127,29,29,0.55)] animate-pulse" />
                    )}
                  </p>
                </div>
              </div>

              <div className="flex justify-between items-end border-t border-stone-200 pt-2 select-none font-mono text-[9px] md:text-[10px]">
                <span className="text-[8px] text-stone-400 uppercase tracking-widest">Dimension: Hawkins-3</span>
                {letterProgress >= LETTER_TEXT.length && (
                  <span className="relative inline-flex items-center text-base md:text-lg font-bold text-red-600 font-handwritten italic min-w-[145px]">
                    {SIGNATURE_TEXT.slice(0, signatureProgress)}
                    {envelopeOpen && signatureProgress < SIGNATURE_TEXT.length && (
                      <WritingPen className="ml-1 h-6 w-6 -rotate-[28deg] drop-shadow-[1px_1px_2px_rgba(127,29,29,0.55)] animate-pulse" />
                    )}
                  </span>
                )}
              </div>
            </motion.div>

            {/* Front Left Flap */}
            <div
              className="absolute left-0 bottom-0 top-0 w-1/2 bg-[#d1bea8] z-10 rounded-l-xl border-l border-amber-900/5 shadow-inner"
              style={{ clipPath: 'polygon(0 0, 100% 50%, 0 100%)' }}
            />

            {/* Front Right Flap */}
            <div
              className="absolute right-0 bottom-0 top-0 w-1/2 bg-[#d1bea8] z-10 rounded-r-xl border-r border-amber-900/5 shadow-inner"
              style={{ clipPath: 'polygon(100% 0, 0 50%, 100% 100%)' }}
            />

            {/* Front Bottom Flap */}
            <div
              className="absolute bottom-0 left-0 right-0 h-[110px] sm:h-[130px] md:h-[140px] bg-[#cbb59f] z-15 rounded-b-xl border-b border-amber-900/5 shadow-inner"
              style={{ clipPath: 'polygon(0 100%, 100% 100%, 50% 0)' }}
            />

            {/* Folding Top Lid Flap */}
            <motion.div
              animate={{
                rotateX: envelopeOpen ? 180 : 0,
                zIndex: envelopeOpen ? 4 : 20
              }}
              transition={{
                duration: 0.5,
                ease: "easeInOut",
                delay: envelopeOpen ? 0 : 0.35
              }}
              className="absolute top-0 left-0 right-0 h-[90px] sm:h-[110px] md:h-[120px] bg-[#c3b09a] rounded-t-xl origin-top border-t border-amber-900/10 shadow-[0_4px_6px_rgba(0,0,0,0.15)]"
              style={{
                clipPath: 'polygon(0 0, 100% 0, 50% 100%)',
                transformStyle: 'preserve-3d'
              }}
            />

            {/* Wax Seal / Interactive Button */}
            <motion.div
              animate={{
                scale: envelopeOpen ? 0.9 : 1,
                y: envelopeOpen ? -20 : 0,
                opacity: envelopeOpen ? 0.85 : 1
              }}
              transition={{ duration: 0.4 }}
              className="absolute left-1/2 top-[80px] sm:top-[90px] md:top-[100px] -translate-x-1/2 -translate-y-1/2 z-30 w-11 h-11 sm:w-13 sm:h-13 md:w-14 md:h-14 bg-gradient-to-br from-red-800 via-red-600 to-red-950 rounded-full flex items-center justify-center shadow-[0_6px_15px_rgba(0,0,0,0.45)] border-2 border-yellow-600/40 hover:scale-105 transition-transform duration-300"
            >
              <div className="w-9 h-9 sm:w-11 sm:h-11 md:w-12 md:h-12 rounded-full border border-dashed border-yellow-500/30 flex items-center justify-center">
                {envelopeOpen ? (
                  <span className="text-yellow-400 font-sans text-xs md:text-sm font-black select-none tracking-tighter">CLOSE</span>
                ) : (
                  <span className="text-yellow-400 font-sans text-xs md:text-sm font-black select-none tracking-widest">OPEN</span>
                )}
              </div>
            </motion.div>

          </div>
        </motion.div>


      </motion.div>
    </div>
  );
}
