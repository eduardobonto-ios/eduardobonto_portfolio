import React, { useState, useRef, useEffect } from 'react';
import { Camera, RefreshCw } from 'lucide-react';

interface AvatarUploadProps {
  onImageChange?: (imageUri: string | null) => void;
}

export default function AvatarUpload({ onImageChange }: AvatarUploadProps) {
  const [image, setImage] = useState<string | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Initialize and load any stored avatars from local storage for durable state
  useEffect(() => {
    const saved = localStorage.getItem('eduardobonto_avatar');
    if (saved) {
      setImage(saved);
      if (onImageChange) onImageChange(saved);
    }
  }, [onImageChange]);

  const handleFile = (file: File) => {
    if (!file.type.startsWith('image/')) {
      alert('Please drop or select a valid image file.');
      return;
    }
    const reader = new FileReader();
    reader.onload = () => {
      const result = reader.result as string;
      setImage(result);
      localStorage.setItem('eduardobonto_avatar', result);
      if (onImageChange) onImageChange(result);
    };
    reader.readAsDataURL(file);
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFile(e.dataTransfer.files[0]);
    }
  };

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const handleFileInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      handleFile(e.target.files[0]);
    }
  };

  const triggerInputClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  const handleReset = (e: React.MouseEvent) => {
    e.stopPropagation();
    setImage(null);
    localStorage.removeItem('eduardobonto_avatar');
    if (onImageChange) onImageChange(null);
  };

  return (
    <div className="flex flex-col items-center gap-3">
      <div
        id="avatar-drop-zone"
        onDrop={handleDrop}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onClick={triggerInputClick}
        className={`w-28 h-28 md:w-32 md:h-32 rounded-full cursor-pointer select-none relative transition-all duration-500 ease-out flex items-center justify-center overflow-hidden group border-0 ${
          isDragging ? 'scale-110 shadow-2xl shadow-white/10 ring-2 ring-white/40' : 'hover:scale-105'
        }`}
        style={{ background: 'rgba(255, 255, 255, 0.02)' }}
      >
        {/* Core Liquid Glass visual backing */}
        <div className="absolute inset-0 rounded-full liquid-glass pointer-events-none" />

        {/* Ambient background glow inside the frame */}
        <div className="absolute -inset-2 bg-gradient-to-tr from-white/5 via-transparent to-white/10 opacity-60 rounded-full blur-md" />

        {image ? (
          <img
            src={image}
            alt="Eduardo Bonto"
            referrerPolicy="no-referrer"
            className="w-full h-full object-cover rounded-full z-10 relative transition-transform duration-700 group-hover:scale-110"
          />
        ) : (
          /* High-Fidelity Custom Vector SVG representing Eduardo Bonto's portrait */
          <svg
            viewBox="0 0 120 120"
            fill="none"
            className="w-20 h-20 text-white/50 z-10 relative transition-transform duration-500 group-hover:scale-105"
            xmlns="http://www.w3.org/2000/svg"
          >
            <defs>
              {/* Back skin gradient */}
              <linearGradient id="faceGrad" x1="60" y1="35" x2="60" y2="90" gradientUnits="userSpaceOnUse">
                <stop offset="0%" stopColor="#404040" />
                <stop offset="100%" stopColor="#1C1C1C" />
              </linearGradient>
              {/* Crew Cut Hair gradient */}
              <linearGradient id="hairGrad" x1="60" y1="20" x2="60" y2="45" gradientUnits="userSpaceOnUse">
                <stop offset="0%" stopColor="#0B0B0B" />
                <stop offset="100%" stopColor="#252525" />
              </linearGradient>
              {/* Silver Chain gradient */}
              <linearGradient id="silverChain" x1="45" y1="92" x2="75" y2="92" gradientUnits="userSpaceOnUse">
                <stop offset="0%" stopColor="#ABABAB" />
                <stop offset="50%" stopColor="#FFFFFF" />
                <stop offset="100%" stopColor="#7F7F7F" />
              </linearGradient>
            </defs>

            {/* Circular background shadow mapping */}
            <circle cx="60" cy="62" r="48" fill="#080808" opacity="0.3" />

            {/* Shoulders & Dark Crew-neck T-shirt */}
            <path d="M22 108C22 96 32 90 44 88C52 92 68 92 76 88C88 90 98 96 98 108H22Z" fill="#131313" stroke="#2A2A2A" strokeWidth="1" />
            <path d="M48 88C48 93 72 93 72 88" fill="none" stroke="#252525" strokeWidth="2" />

            {/* Face and neck structure */}
            <path d="M46 70C46 82 54 86 60 86C66 86 74 82 74 70V58H46V70Z" fill="url(#faceGrad)" /> {/* Neck */}
            <path d="M40 50C40 72 44 84 60 84C76 84 80 72 80 50C80 34 74 32 60 32C46 32 40 34 40 50Z" fill="url(#faceGrad)" /> {/* Face */}

            {/* Ear */}
            <path d="M79 52C81 52 83 55 83 58C83 61 80 62 79 62" fill="#2E2E2E" stroke="#1C1C1C" strokeWidth="0.5" />

            {/* Buzz Cut Hair Block */}
            <path d="M40 45C40 33 46 25 60 25C74 25 80 33 80 43C78 40 76 34 60 32C44 34 42 40 40 45Z" fill="url(#hairGrad)" />

            {/* Hair temple shave detail lines (His signature side lines!) */}
            <path d="M72 38L77 36" stroke="#161616" strokeWidth="1.6" strokeLinecap="round" />
            <path d="M72 42L77 40" stroke="#161616" strokeWidth="1.6" strokeLinecap="round" />

            {/* Soft, dark facial structures resembling eyes and nose details */}
            <path d="M48 49C48 47 54 47 54 49" stroke="#161616" strokeWidth="1.5" strokeLinecap="round" /> {/* Left Eye */}
            <path d="M66 49C66 47 72 47 72 49" stroke="#161616" strokeWidth="1.5" strokeLinecap="round" /> {/* Right Eye */}
            <path d="M59 49V59H61V49" fill="#121212" opacity="0.4" /> {/* Nose path */}
            <path d="M54 66C56 68 64 68 66 66" stroke="#131313" strokeWidth="1.5" strokeLinecap="round" /> {/* Mouth */}

            {/* Eduardo's Thin Silver Necklace Chain */}
            <path d="M45 88C45 96 75 96 75 88" fill="none" stroke="url(#silverChain)" strokeWidth="1.4" strokeDasharray="3 1" />
          </svg>
        )}

        {/* Liquid Glass Overlay Hover State */}
        <div id="avatar-hover-overlay" className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-20 flex flex-col items-center justify-center gap-1">
          <Camera className="w-5 h-5 text-white/90 animate-pulse" />
          <span className="text-[10px] text-white/90 font-medium tracking-wide uppercase px-2 text-center leading-tight">
            {image ? 'Change Face' : 'Swap Face'}
          </span>
          <span className="text-[8px] text-white/50 text-center uppercase tracking-normal">
            Drag & Drop
          </span>
        </div>
      </div>

      <input
        type="file"
        ref={fileInputRef}
        onChange={handleFileInputChange}
        accept="image/*"
        className="hidden"
      />

      {image && (
        <button
          onClick={handleReset}
          className="text-[10px] font-mono tracking-wider text-white/40 hover:text-white/80 uppercase flex items-center gap-1 transition-colors z-20"
          title="Reset to default vector avatar"
        >
          <RefreshCw className="w-3.5 h-3.5" />
          Reset Face
        </button>
      )}
    </div>
  );
}
