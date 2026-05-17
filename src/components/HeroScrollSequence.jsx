import { useEffect, useRef } from "react";

const frameCount = 240;
const currentFrame = (index) =>
  `/ezgif-82769e2acba24fd9-jpg/ezgif-frame-${(index + 1)
    .toString()
    .padStart(3, "0")}.jpg`;

const HeroScrollSequence = () => {
  const canvasRef = useRef(null);
  const containerRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const context = canvas.getContext("2d", { alpha: false });
    const container = containerRef.current;

    const images = [];
    let loadedImages = 0;

    for (let i = 0; i < frameCount; i++) {
      const img = new Image();
      img.src = currentFrame(i);

      img.onload = () => {
        loadedImages++;
        // As soon as the first frame loads, set canvas dimensions and draw it
        if (i === 0) {
          canvas.width = img.naturalWidth || 1920;
          canvas.height = img.naturalHeight || 1080;
          context.drawImage(img, 0, 0);
        }
      };
      images.push(img);
    }

    let animationFrameId;

    const handleScroll = () => {
      // Calculate scroll progress within this component's height
      const scrollTop = window.scrollY;

      // Calculate max scroll for the sequence (height of container minus viewport)
      // Wait, if the container is at the top of the page, window.scrollY is exactly the progress
      const maxScroll = container.scrollHeight - window.innerHeight;

      let scrollFraction = scrollTop / maxScroll;
      // Clamp between 0 and 1
      scrollFraction = Math.max(0, Math.min(1, scrollFraction));

      const frameIndex = Math.min(
        frameCount - 1,
        Math.floor(scrollFraction * frameCount)
      );

      // Debounce drawing using requestAnimationFrame
      if (animationFrameId) {
        cancelAnimationFrame(animationFrameId);
      }

      animationFrameId = requestAnimationFrame(() => {
        // Draw if image is loaded
        if (images[frameIndex] && images[frameIndex].complete) {
          context.drawImage(images[frameIndex], 0, 0, canvas.width, canvas.height);
        }
      });
    };

    window.addEventListener("scroll", handleScroll, { passive: true });

    // Initial draw in case user loaded halfway down
    handleScroll();

    return () => {
      window.removeEventListener("scroll", handleScroll);
      if (animationFrameId) cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <div ref={containerRef} className="h-[300vh] w-full relative bg-black">
      <div className="sticky top-0 h-screen w-full flex items-center justify-center overflow-hidden">
        {/* Canvas acts like an image and covers the entire screen while maintaining aspect ratio */}
        <canvas
          ref={canvasRef}
          className="absolute inset-0 w-full h-full md:object-cover object-contain"
        />

        {/* Overlay Content */}
        <div className="absolute bottom-12 left-0 right-0 z-10 flex flex-col items-center justify-center pointer-events-none p-4">
          <p className="text-xl md:text-2xl text-white/90 font-medium tracking-wide drop-shadow-[0_2px_2px_rgba(0,0,0,0.8)] max-w-2xl text-center">
            Scroll down to explore the memories and magic
          </p>

          <div className="mt-6 animate-bounce">
            <svg className="w-8 h-8 text-white drop-shadow-md" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
            </svg>
          </div>
        </div>

        {/* Gradient overlay to make text more readable */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-transparent to-black/60 pointer-events-none" />
      </div>
    </div>
  );
};

export default HeroScrollSequence;
