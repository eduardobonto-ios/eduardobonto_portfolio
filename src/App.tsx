import React, { useRef, useState, useEffect } from 'react';
import { ArrowRight, ShieldCheck, Linkedin } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import PortfolioModal from './components/PortfolioModal';
import { BIO } from './data';
import backgroundVideo from '../assets/final_face_video.mp4';

export default function App() {
  const [isPortfolioOpen, setIsPortfolioOpen] = useState(false);
  const [alertMessage, setAlertMessage] = useState<string | null>(null);

  const videoRef = useRef<HTMLVideoElement>(null);
  const fadeAnimFrameRef = useRef<number | null>(null);
  const fadingOutRef = useRef(false);

  // Helper function to handle fade transitions via requestAnimationFrame, supporting current-opacity resumption
  const fadeTo = (targetOpacity: number, duration: number, callback?: () => void) => {
    // 1. Cancel any active running animation frame to prevent competing animations
    if (fadeAnimFrameRef.current !== null) {
      cancelAnimationFrame(fadeAnimFrameRef.current);
      fadeAnimFrameRef.current = null;
    }

    const video = videoRef.current;
    if (!video) return;

    // 2. Fades resume from the current opacity rather than snapping
    const startOpacity = parseFloat(video.style.opacity || '0');
    const startTime = performance.now();

    const animate = (currentTime: number) => {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const currentOpacity = startOpacity + (targetOpacity - startOpacity) * progress;

      if (video) {
        video.style.opacity = currentOpacity.toFixed(3);
      }

      if (progress < 1) {
        fadeAnimFrameRef.current = requestAnimationFrame(animate);
      } else {
        fadeAnimFrameRef.current = null;
        if (callback) callback();
      }
    };

    fadeAnimFrameRef.current = requestAnimationFrame(animate);
  };

  // Initialize background video loop properties and startup transitions
  useEffect(() => {
    const video = videoRef.current;
    if (video) {
      video.style.opacity = '0';
      // Muted autoplay handles browser permission limits standardly
      video.play()
        .then(() => {
          fadeTo(1, 500); // 500ms requestAnimationFrame-based fade-in on load
        })
        .catch((err) => {
          console.log("Autoplay was prevented by browser security. Ready for manual play input:", err);
          // Auto-fallback: start with visible canvas to prevent empty layouts
          video.style.opacity = '1';

          // On mobile, autoplay is sometimes blocked until first user interaction
          const handleFirstTouch = () => {
            video.play()
              .then(() => fadeTo(1, 500))
              .catch(() => {});
          };
          document.addEventListener('touchstart', handleFirstTouch, { once: true });
        });
    }

    return () => {
      if (fadeAnimFrameRef.current !== null) {
        cancelAnimationFrame(fadeAnimFrameRef.current);
      }
    };
  }, []);

  // Monitor time update events for precise end-range fadeouts
  const handleTimeUpdate = () => {
    const video = videoRef.current;
    if (!video || !video.duration) return;

    const remaining = video.duration - video.currentTime;
    
    // 3. Initiate 500ms fade-out when 0.55 seconds remain before video ends
    // Use fadingOutRef check to prevent hot-looping duplicate calls
    if (remaining <= 0.55 && !fadingOutRef.current) {
      fadingOutRef.current = true;
      fadeTo(0, 500);
    }
  };

  // Seamless looping on video end
  const handleEnded = () => {
    const video = videoRef.current;
    if (!video) return;

    // On ended, opacity is set to 0, then after 100ms video resets to currentTime = 0, plays, and fades back in.
    video.style.opacity = '0';

    setTimeout(() => {
      if (video) {
        video.currentTime = 0;
        video.play()
          .then(() => {
            fadingOutRef.current = false;
            fadeTo(1, 500); // fade transition loop restart
          })
          .catch((err) => {
            console.log("Could not replay background loop automatically:", err);
            fadingOutRef.current = false;
            // Immediate forced display on fallback
            video.style.opacity = '1';
          });
      }
    }, 100);
  };



  return (
    <div className="min-h-screen bg-black overflow-hidden relative font-sans flex flex-col justify-between select-none">
      {/* 
        Full-Screen Background Looping Video
        Controlled manually via Javascript requestAnimationFrame to provide buttery-smooth loops without snaps
      */}
      <video
        ref={videoRef}
        onTimeUpdate={handleTimeUpdate}
        onEnded={handleEnded}
        muted
        playsInline
        autoPlay
        className="absolute inset-0 w-full h-full object-cover select-none pointer-events-none translate-y-[17%] transition-none z-0"
        src={backgroundVideo}
        style={{ opacity: 0 }}
      />

      {/* Extreme ambient vignetting to construct the cinematic atmospheric tone */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-black/35 to-black z-0 pointer-events-none" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(0,0,0,0)_15%,rgba(0,0,0,0.8)_85%)] z-0 pointer-events-none" />

      {/* Navigation bar (relative z-20) */}
      <nav className="relative z-20 px-6 py-6" id="navbar">
        <div 
          className="rounded-full px-6 py-3 flex items-center justify-between max-w-5xl mx-auto border-0"
          style={{ background: 'rgba(255, 255, 255, 0.015)' }}
        >
          {/* Custom Liquid Glass overlay */}
          <div className="absolute inset-0 rounded-full liquid-glass pointer-events-none" />

          {/* Left brand area */}
          <div className="flex items-center gap-3 select-none">
            <div className="w-2 h-2 rounded-full bg-white/85 animate-pulse" />
            <span className="text-white font-semibold text-xs md:text-sm tracking-widest font-mono uppercase">Eduardo Bonto Portfolio</span>
          </div>

          {/* Right side Portfolio entry */}
          <div className="flex items-center z-10">
            <button 
              onClick={() => setIsPortfolioOpen(true)}
              className="relative text-white font-semibold text-xs uppercase tracking-wide font-mono cursor-pointer rounded-full px-5 py-2 hover:bg-white/5 transition-all duration-300"
              style={{ background: 'rgba(255, 255, 255, 0.02)' }}
              id="nav-portfolio-btn"
            >
              <div className="absolute inset-0 rounded-full liquid-glass pointer-events-none" />
              Open Portfolio
            </button>
          </div>
        </div>
      </nav>

      {/* Toast Alert Indicators */}
      <AnimatePresence>
        {alertMessage && (
          <div className="fixed top-24 left-1/2 -translate-x-1/2 z-40 px-4 w-full max-w-sm">
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="p-4 rounded-xl text-xs font-mono tracking-wide text-white/90 bg-black/90 border border-white/15 backdrop-blur-lg shadow-2xl flex items-center gap-3"
            >
              <span className="w-2 h-2 rounded-full bg-white/40 animate-pulse shrink-0" />
              <p>{alertMessage}</p>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Hero content area (relative z-10 flex-1 flex flex-col items-center justify-center) */}
      <main className="relative z-10 flex-1 flex flex-col items-center justify-center px-6 py-12 text-center -translate-y-[8%] md:-translate-y-[12%]">
        <div className="max-w-2xl w-full flex flex-col items-center space-y-8">
          
          {/* Manifesto Trigger button placed in the main heading location */}
          <div className="pt-4 flex justify-center">
            <button 
              onClick={() => setIsPortfolioOpen(true)}
              className="relative rounded-full px-10 py-5 text-white text-xs sm:text-sm font-semibold uppercase tracking-widest font-mono hover:bg-white/10 active:scale-95 transition-all duration-300 cursor-pointer shadow-[0_0_50px_rgba(255,255,255,0.05)]"
              style={{ background: 'rgba(255, 255, 255, 0.03)' }}
              id="manifesto-trigger-btn"
            >
              <div className="absolute inset-0 rounded-full liquid-glass pointer-events-none" />
              Explore Portfolio Manifesto
            </button>
          </div>

          {/* Subtitle description statement */}
          <p className="text-white/70 text-xs md:text-sm leading-relaxed px-6 font-sans select-none antialiased max-w-lg">
            {BIO.tagline}
          </p>
        </div>
      </main>

      {/* Social icons footer (relative z-10 flex justify-center pb-12) */}
      <footer className="relative z-10 flex justify-center pb-12" id="footer">
        <a 
          href="https://www.linkedin.com/in/eduardo-bonto-6259b9b6" 
          target="_blank" 
          rel="noopener noreferrer"
          className="relative rounded-full px-6 py-3.5 text-white/80 hover:text-white hover:bg-white/5 transition-all duration-300 cursor-pointer flex items-center gap-2.5 text-xs font-mono tracking-wider uppercase border-0"
          style={{ background: 'rgba(255, 255, 255, 0.015)' }}
          aria-label="LinkedIn Profile"
          id="footer-social-linkedin"
        >
          <div className="absolute inset-0 rounded-full liquid-glass pointer-events-none" />
          <Linkedin className="w-4 h-4 text-white/95 animate-pulse" />
          <span>Connect on LinkedIn</span>
        </a>
      </footer>

      {/* Deep Credentials Side Over / Modal panel */}
      <PortfolioModal 
        isOpen={isPortfolioOpen} 
        onClose={() => setIsPortfolioOpen(false)} 
      />
    </div>
  );
}
