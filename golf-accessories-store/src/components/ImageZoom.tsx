'use client';

import { useState, useRef } from 'react';
import { X, ZoomIn, ZoomOut } from 'lucide-react';

interface ImageZoomProps {
  src: string;
  alt: string;
  className?: string;
}

export default function ImageZoom({ src, alt, className = '' }: ImageZoomProps) {
  const [isZoomed, setIsZoomed] = useState(false);
  const [zoomLevel, setZoomLevel] = useState(1);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const containerRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLImageElement>(null);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!isZoomed || !containerRef.current || !imageRef.current) return;

    const rect = containerRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const xPercent = (x / rect.width) * 100;
    const yPercent = (y / rect.height) * 100;

    setPosition({ x: xPercent, y: yPercent });
  };

  const handleWheel = (e: React.WheelEvent) => {
    e.preventDefault();
    const delta = e.deltaY > 0 ? -0.1 : 0.1;
    const newZoom = Math.max(1, Math.min(3, zoomLevel + delta));
    setZoomLevel(newZoom);
  };

  const resetZoom = () => {
    setZoomLevel(1);
    setPosition({ x: 50, y: 50 });
  };

  const toggleZoom = () => {
    setIsZoomed(!isZoomed);
    if (!isZoomed) {
      setZoomLevel(2);
      setPosition({ x: 50, y: 50 });
    } else {
      resetZoom();
    }
  };

  return (
    <>
      <div
        ref={containerRef}
        className={`relative overflow-hidden cursor-zoom-in ${className}`}
        onMouseMove={handleMouseMove}
        onMouseLeave={() => {
          if (isZoomed) {
            resetZoom();
            setIsZoomed(false);
          }
        }}
        onWheel={handleWheel}
        onClick={toggleZoom}
      >
        <div className="relative w-full h-full">
          {/* Placeholder for product image */}
          <div className="w-full h-full bg-gray-200 flex items-center justify-center">
            <div className="text-center">
              <div className="w-32 h-32 bg-gradient-to-br from-electric-green/20 to-sunset-orange/20 rounded-xl flex items-center justify-center mb-4">
                <span className="text-4xl">🏌️</span>
              </div>
              <p className="text-gray-600 font-medium">{alt}</p>
              <p className="text-sm text-gray-500">Click to zoom</p>
            </div>
          </div>
          
          {/* Zoom overlay */}
          {isZoomed && (
            <div
              className="absolute inset-0 pointer-events-none"
              style={{
                transform: `scale(${zoomLevel})`,
                transformOrigin: `${position.x}% ${position.y}%`,
                transition: 'transform 0.1s ease-out'
              }}
            >
              <div className="w-full h-full bg-gray-200 flex items-center justify-center">
                <div className="text-center">
                  <div className="w-64 h-64 bg-gradient-to-br from-electric-green/20 to-sunset-orange/20 rounded-xl flex items-center justify-center mb-4">
                    <span className="text-6xl">🏌️</span>
                  </div>
                  <p className="text-gray-600 font-medium text-lg">{alt}</p>
                  <p className="text-sm text-gray-500">Detailed view</p>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Zoom controls */}
        {isZoomed && (
          <div className="absolute top-4 right-4 flex gap-2 pointer-events-none">
            <div className="bg-white/90 backdrop-blur-sm rounded-lg p-2 shadow-lg">
              <span className="text-xs font-semibold text-deep-navy">
                {Math.round(zoomLevel * 100)}%
              </span>
            </div>
          </div>
        )}

        {/* Zoom hint */}
        {!isZoomed && (
          <div className="absolute bottom-4 right-4 pointer-events-none">
            <div className="bg-white/90 backdrop-blur-sm rounded-lg p-2 shadow-lg flex items-center gap-2">
              <ZoomIn size={16} className="text-deep-navy" />
              <span className="text-xs font-semibold text-deep-navy">Click to zoom</span>
            </div>
          </div>
        )}
      </div>

      {/* Fullscreen zoom modal */}
      {isZoomed && (
        <div className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center">
          <div className="relative max-w-6xl max-h-full p-8">
            <button
              onClick={(e) => {
                e.stopPropagation();
                setIsZoomed(false);
                resetZoom();
              }}
              className="absolute top-4 right-4 p-2 bg-white/10 backdrop-blur-sm rounded-lg text-white hover:bg-white/20 transition-colors"
            >
              <X size={24} />
            </button>

            <div className="relative">
              <div className="w-full h-full flex items-center justify-center">
                <div className="text-center">
                  <div className="w-96 h-96 bg-gradient-to-br from-electric-green/20 to-sunset-orange/20 rounded-xl flex items-center justify-center mb-4">
                    <span className="text-8xl">🏌️</span>
                  </div>
                  <p className="text-white font-medium text-xl">{alt}</p>
                  <p className="text-white/70">Ultra detailed view - Scroll to zoom</p>
                </div>
              </div>
            </div>

            <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex gap-4">
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  setZoomLevel(Math.max(1, zoomLevel - 0.5));
                }}
                className="p-3 bg-white/10 backdrop-blur-sm rounded-lg text-white hover:bg-white/20 transition-colors"
              >
                <ZoomOut size={20} />
              </button>
              <div className="p-3 bg-white/10 backdrop-blur-sm rounded-lg text-white">
                <span className="font-semibold">{Math.round(zoomLevel * 100)}%</span>
              </div>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  setZoomLevel(Math.min(3, zoomLevel + 0.5));
                }}
                className="p-3 bg-white/10 backdrop-blur-sm rounded-lg text-white hover:bg-white/20 transition-colors"
              >
                <ZoomIn size={20} />
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
