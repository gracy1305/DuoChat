import { useState, useEffect } from 'react';
import { FloatingShapes } from './FloatingShapes';
import { DetectiveDuo } from './DetectiveDuo';
import { ChallengePreviewCard } from './ChallengePreviewCard';

interface ChallengeIntroductionProps {
  onBack: () => void;
  onStart: () => void;
}

export function ChallengeIntroduction({ onBack, onStart }: ChallengeIntroductionProps) {
  const [buttonPulse, setButtonPulse] = useState(false);

  useEffect(() => {
    // Button pulse animation every 3 seconds
    const pulseInterval = setInterval(() => {
      setButtonPulse(true);
      setTimeout(() => setButtonPulse(false), 600);
    }, 3000);

    return () => clearInterval(pulseInterval);
  }, []);

  return (
    <div 
      className="min-h-screen relative overflow-hidden"
      style={{
        background: 'linear-gradient(180deg, #6C5CE7 0%, #5A4FCF 100%)',
      }}
    >
      {/* Noise texture overlay */}
      <div 
        className="absolute inset-0 opacity-5"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='1' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
        }}
      />

      {/* Floating shapes */}
      <FloatingShapes />

      {/* Header */}
      <div className="relative z-10 pt-12 px-5 flex items-center justify-between">
        {/* Back button */}
        <button 
          onClick={onBack}
          className="w-6 h-6 flex items-center justify-center"
        >
          <svg viewBox="0 0 24 24" className="w-full h-full fill-white">
            <path d="M20 11H7.83l5.59-5.59L12 4l-8 8 8 8 1.41-1.41L7.83 13H20v-2z"/>
          </svg>
        </button>

        {/* Progress indicator */}
        <p className="text-white text-sm opacity-80">Challenge 1 of 1</p>

        {/* Spacer */}
        <div className="w-6"></div>
      </div>

      {/* Main content */}
      <div className="relative z-10 flex flex-col items-center px-5">
        {/* Hero illustration */}
        <div className="mt-8 mb-8">
          <DetectiveDuo />
        </div>

        {/* Title section */}
        <div className="text-center mb-8">
          <h1 
            className="text-white text-3xl font-bold mb-2"
            style={{ letterSpacing: '-0.5px' }}
          >
            Grammar Detective
          </h1>
          <p className="text-white text-lg opacity-80">
            Help Duo solve the mystery!
          </p>
        </div>

        {/* Challenge preview card */}
        <ChallengePreviewCard />

        {/* Bottom section */}
        <div className="mt-8 flex flex-col items-center gap-6">
          {/* Time estimate */}
          <div className="flex items-center gap-2">
            <div className="w-5 h-5 opacity-80">
              <svg viewBox="0 0 24 24" className="w-full h-full fill-white">
                <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
                <circle cx="12" cy="12" r="10" fill="none" stroke="white" strokeWidth="1.5"/>
                <path d="M12 6v6l4 2" stroke="white" strokeWidth="1.5" strokeLinecap="round"/>
              </svg>
            </div>
            <span className="text-white text-base opacity-80">3-4 minutes</span>
          </div>

          {/* Reward preview */}
          <div className="flex items-center gap-3">
            {/* Streak freeze icon */}
            <div className="w-6 h-6">
              <svg viewBox="0 0 24 24" className="w-full h-full fill-[#87CEEB]">
                <path d="M12 2l-2 3h4l-2-3zM12 22l2-3H10l2 3zM9 12l-3-2v4l3-2zM15 12l3-2v4l-3-2zM12 8l-1 2h2l-1-2zM12 16l1-2h-2l1 2z"/>
              </svg>
            </div>

            {/* Plus symbol */}
            <div className="w-4 h-4 opacity-60">
              <svg viewBox="0 0 24 24" className="w-full h-full fill-white">
                <path d="M19 13h-6v6h-2v-6H5v-2h6V5h2v6h6v2z"/>
              </svg>
            </div>

            {/* XP badge */}
            <div className="bg-[#FFD700] px-3 py-1 rounded-lg">
              <span className="text-[#6C5CE7] font-bold text-sm">50 XP</span>
            </div>
          </div>

          {/* CTA button */}
          <button 
            onClick={onStart}
            className={`w-full mx-5 bg-white text-[#6C5CE7] py-4 rounded-2xl font-bold text-lg transition-all duration-300 ${buttonPulse ? 'scale-102' : 'scale-100'} hover:scale-105`}
            style={{ 
              boxShadow: '0 4px 12px rgba(255,255,255,0.25)',
              maxWidth: '335px'
            }}
          >
            Start Investigation
          </button>
        </div>
      </div>
    </div>
  );
}