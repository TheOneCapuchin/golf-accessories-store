'use client'

import { useState, useEffect } from 'react'
import Image from 'next/image'

interface Slide {
  id: number
  title: string
  image: string
  description: string
}

const slides: Slide[] = [
  {
    id: 1,
    title: "Premium Golf Bags",
    image: "/api/placeholder/1200/600",
    description: "Carry your gear in style"
  },
  {
    id: 2,
    title: "Performance Polos",
    image: "/api/placeholder/1200/600",
    description: "Look sharp on the course"
  },
  {
    id: 3,
    title: "Luxury Towels",
    image: "/api/placeholder/1200/600",
    description: "Stay fresh, play better"
  }
]

export default function JungleStageCarousel() {
  const [currentSlide, setCurrentSlide] = useState(0)
  const [isLoaded, setIsLoaded] = useState(false)
  const [progress, setProgress] = useState(0)
  const [isResetting, setIsResetting] = useState(false)

  useEffect(() => {
    setIsLoaded(true)
    
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length)
      // Reset progress instantly
      setIsResetting(true)
      setProgress(0)
      setTimeout(() => setIsResetting(false), 50)
    }, 5000)

    return () => clearInterval(interval)
  }, [])

  useEffect(() => {
    if (!isResetting) {
      const progressInterval = setInterval(() => {
        setProgress((prev) => {
          if (prev >= 100) return 100
          return prev + 2
        })
      }, 100)

      return () => clearInterval(progressInterval)
    }
  }, [isResetting])

  const goToSlide = (index: number) => {
    setCurrentSlide(index)
    setProgress(0)
  }

  return (
    <div className="jungle-stage-carousel w-full mt-0 mb-0 -mt-[64px] relative" style={{ marginTop: '0px !important' }}>
      {/* Frame Container - Full Width Bleed */}
      <div className="relative w-full">
        {/* Frame with Electric Green Glow */}
        <div className="jungle-frame rounded-none">
          {/* Carousel Container */}
          <div className="relative overflow-hidden rounded-none w-full aspect-[21/9]">
            {/* Arrow Wrapper */}
            <div className="absolute inset-0 pointer-events-none flex items-center justify-between">
              {/* Navigation Arrows */}
              <button
                onClick={() => goToSlide((currentSlide - 1 + slides.length) % slides.length)}
                className="pointer-events-auto z-20 ml-4 w-10 h-10 flex items-center justify-center bg-black/50 rounded-full nav-link-utility transition-all duration-300 hover:bg-black/70"
                aria-label="Previous slide"
              >
                <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="square" strokeLinejoin="miter" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
              </button>
              <button
                onClick={() => goToSlide((currentSlide + 1) % slides.length)}
                className="pointer-events-auto z-20 mr-4 w-10 h-10 flex items-center justify-center bg-black/50 rounded-full nav-link-utility transition-all duration-300 hover:bg-black/70"
                aria-label="Next slide"
              >
                <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="square" strokeLinejoin="miter" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </button>
            </div>

            {/* Progress Bar - Top Fiber Optic Thread */}
            <div className="absolute top-0 left-0 right-0 h-[1px] bg-black/30">
              <div 
                className={`h-full transition-all ${isResetting ? 'transition-none' : 'duration-[5000ms] ease-linear'} bg-[#39FF14]/60 shadow-[0_0_5px_rgba(57,255,20,0.4)] ${progress > 0 ? 'opacity-100' : 'opacity-60'}`}
                style={{ width: `${progress}%` }}
              />
            </div>

            {/* Slides */}
            <div className="relative w-full h-full">
              {slides.map((slide, index) => (
                <div
                  key={slide.id}
                  className={`absolute inset-0 transition-all duration-1000 ease-in-out ${
                    index === currentSlide
                      ? 'opacity-100 scale-100'
                      : 'opacity-0 scale-95'
                  }`}
                >
                  <div className="relative w-full h-full">
                    {/* Background Image */}
                    <div className="absolute inset-0">
                      <div className="w-full h-full bg-gradient-to-br from-[#1B3022] to-[#0D1A11]" />
                      <div className="absolute inset-0 flex items-center justify-center">
                        <span className="text-8xl opacity-20">🐒</span>
                      </div>
                    </div>
                    
                    {/* Content Overlay */}
                    <div className="relative z-10 w-full h-full flex items-center justify-center">
                      <div className="text-center px-8">
                        <h2 className="text-4xl md:text-6xl font-bold text-white mb-4">
                          {slide.title}
                        </h2>
                        <p className="text-xl text-white/80">
                          {slide.description}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Square Pagination Dots */}
            <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex space-x-2 z-20">
              {slides.map((_, index) => (
                <button
                  key={index}
                  onClick={() => goToSlide(index)}
                  className={`transition-all duration-300 ${
                    index === currentSlide
                      ? 'w-8 h-3 bg-[#39FF14] shadow-lg shadow-[#39FF14]/50'
                      : 'w-3 h-3 bg-white/50 hover:bg-white/70'
                  }`}
                  aria-label={`Go to slide ${index + 1}`}
                />
              ))}
            </div>

            {/* Progress Bar - Bottom Fiber Optic Thread */}
            <div className="absolute bottom-0 left-0 right-0 h-[1.5px] bg-black/30">
              <div 
                className={`h-full transition-all ${isResetting ? 'transition-none' : 'duration-[5000ms] ease-linear'} bg-[#39FF14]/80 shadow-[0_0_5px_rgba(57,255,20,0.4)] ${progress > 0 ? 'opacity-100' : 'opacity-60'}`}
                style={{ width: `${progress}%` }}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
