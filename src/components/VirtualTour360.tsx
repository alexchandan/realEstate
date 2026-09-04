'use client';

import React, { useState, useRef, useEffect } from 'react';
import { RotateCw, ZoomIn, ZoomOut, Maximize2, Minimize2, Compass } from 'lucide-react';

interface VirtualTour360Props {
  imageUrl?: string;
  propertyTitle: string;
}

export function VirtualTour360({
  imageUrl = 'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&w=2000&q=80',
  propertyTitle,
}: VirtualTour360Props) {
  const [posX, setPosX] = useState(0);
  const [zoom, setZoom] = useState(1);
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const handleMouseDown = (e: React.MouseEvent) => {
    setIsDragging(true);
    setStartX(e.clientX - posX);
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging) return;
    setPosX(e.clientX - startX);
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  const handleTouchStart = (e: React.TouchEvent) => {
    setIsDragging(true);
    setStartX(e.touches[0].clientX - posX);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (!isDragging) return;
    setPosX(e.touches[0].clientX - startX);
  };

  const handleTouchEnd = () => {
    setIsDragging(false);
  };

  const toggleFullscreen = () => {
    if (!containerRef.current) return;
    if (!document.fullscreenElement) {
      containerRef.current.requestFullscreen().catch((err) => console.error(err));
      setIsFullscreen(true);
    } else {
      document.exitFullscreen().catch((err) => console.error(err));
      setIsFullscreen(false);
    }
  };

  return (
    <div
      ref={containerRef}
      className={`relative w-full overflow-hidden rounded-2xl bg-black select-none ${
        isFullscreen ? 'h-screen' : 'h-[360px] sm:h-[480px]'
      }`}
      onMouseDown={handleMouseDown}
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
      onMouseLeave={handleMouseUp}
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
      style={{ cursor: isDragging ? 'grabbing' : 'grab' }}
    >
      {/* 360 Panorama Canvas Wrapper */}
      <div
        className="w-full h-full transition-transform duration-75 ease-out"
        style={{
          backgroundImage: `url(${imageUrl})`,
          backgroundPosition: `${posX}px center`,
          backgroundRepeat: 'repeat-x',
          backgroundSize: `${zoom * 180}% 100%`,
        }}
      />

      {/* 360 Overlay Badge */}
      <div className="absolute top-4 left-4 z-20 flex items-center gap-2 px-3 py-1.5 rounded-full bg-black/60 backdrop-blur-md text-white border border-white/20 shadow-lg">
        <RotateCw className="w-4 h-4 text-emerald-400 animate-spin" style={{ animationDuration: '8s' }} />
        <span className="text-xs font-bold tracking-wide">360° Interactive Virtual Tour</span>
      </div>

      {/* Floating Instructions */}
      <div className="absolute top-4 right-4 z-20 hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-black/60 backdrop-blur-md text-white/80 text-xs border border-white/10">
        <Compass className="w-3.5 h-3.5 text-emerald-400" />
        <span>Drag to look around</span>
      </div>

      {/* Control Toolbar */}
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 z-20 flex items-center gap-2 p-1.5 rounded-2xl bg-black/70 backdrop-blur-xl border border-white/20 text-white shadow-2xl">
        <button
          type="button"
          onClick={() => setZoom((prev) => Math.min(prev + 0.25, 2.5))}
          className="p-2 rounded-xl hover:bg-white/20 transition-colors"
          title="Zoom In"
        >
          <ZoomIn className="w-4 h-4" />
        </button>

        <button
          type="button"
          onClick={() => setZoom((prev) => Math.max(prev - 0.25, 0.8))}
          className="p-2 rounded-xl hover:bg-white/20 transition-colors"
          title="Zoom Out"
        >
          <ZoomOut className="w-4 h-4" />
        </button>

        <button
          type="button"
          onClick={() => {
            setPosX(0);
            setZoom(1);
          }}
          className="px-3 py-1.5 rounded-xl hover:bg-white/20 text-xs font-semibold transition-colors"
          title="Reset View"
        >
          Reset
        </button>

        <button
          type="button"
          onClick={toggleFullscreen}
          className="p-2 rounded-xl hover:bg-white/20 transition-colors"
          title="Toggle Fullscreen"
        >
          {isFullscreen ? <Minimize2 className="w-4 h-4" /> : <Maximize2 className="w-4 h-4" />}
        </button>
      </div>
    </div>
  );
}
