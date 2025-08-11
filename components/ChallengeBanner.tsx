import { useState, useEffect } from 'react';

export function ChallengeBanner() {
  const [duoBounce, setDuoBounce] = useState(false);
  const [buttonPulse, setButtonPulse] = useState(false);
  const [showGlint, setShowGlint] = useState(false);

  useEffect(() => {
    // Duo bounce animation every 3 seconds
    const duoInterval = setInterval(() => {
      setDuoBounce(true);
      setTimeout(() => setDuoBounce(false), 400);
    }, 3000);

    // Button pulse animation every 2 seconds
    const buttonInterval = setInterval(() => {
      setButtonPulse(true);
      setTimeout(() => setButtonPulse(false), 600);
    }, 2000);

    // Magnifying glass glint every 5 seconds
    const glintInterval = setInterval(() => {
      setShowGlint(true);
      setTimeout(() => setShowGlint(false), 500);
    }, 5000);

    return () => {
      clearInterval(duoInterval);
      clearInterval(buttonInterval);
      clearInterval(glintInterval);
    };
  }, []);

  return (
    <div 
      className="mx-5 mt-5 rounded-2xl p-3 relative overflow-hidden shadow-lg"
      style={{
        background: 'linear-gradient(135deg, #1CB0F6 0%, #4FC3F7 100%)',
        boxShadow: '0 4px 16px rgba(28, 176, 246, 0.25)'
      }}
    >
      {/* Timer indicator */}
      <div className="absolute top-2 right-3 text-white text-xs opacity-70">
        22h remaining
      </div>

      <div className="flex items-center justify-between">
        {/* Left section - Duo character */}
        <div className="relative">
          <div 
            className={`w-12 h-12 relative transition-transform duration-400 ease-in-out ${duoBounce ? '-translate-y-0.5' : ''}`}
          >
            {/* Duo body */}
            <div className="w-10 h-10 rounded-full bg-[#58CC02] relative">
              {/* Eyes */}
              <div className="absolute top-2 left-1.5 w-2 h-2 bg-white rounded-full"></div>
              <div className="absolute top-2 right-1.5 w-2 h-2 bg-white rounded-full"></div>
              <div className="absolute top-2.5 left-2 w-1 h-1 bg-black rounded-full"></div>
              <div className="absolute top-2.5 right-2 w-1 h-1 bg-black rounded-full"></div>
              
              {/* Beak */}
              <div className="absolute bottom-3 left-1/2 transform -translate-x-1/2 w-1.5 h-1 bg-orange-400 rounded-sm"></div>
            </div>
            
            {/* Detective hat */}
            <div className="absolute -top-1 left-0 w-10 h-4 bg-[#8B4513] rounded-t-full"></div>
            <div className="absolute -top-0.5 -left-1 w-3 h-3 bg-[#8B4513] rounded-full"></div>
            <div className="absolute -top-0.5 -right-1 w-3 h-3 bg-[#8B4513] rounded-full"></div>
            
            {/* Magnifying glass */}
            <div className="absolute top-1 -right-1 w-4 h-4">
              <div className="w-3 h-3 border-2 border-[#FFD700] rounded-full bg-[#87CEEB] bg-opacity-30 relative">
                {showGlint && (
                  <div className="absolute top-0.5 left-0.5 w-1 h-1 bg-white rounded-full animate-ping"></div>
                )}
              </div>
              <div className="absolute bottom-0 right-0 w-1 h-2 bg-[#FFD700] rounded-full transform rotate-45"></div>
            </div>
          </div>
        </div>

        {/* Center section - Text content */}
        <div className="flex-1 mx-4">
          <h3 className="text-white font-bold text-base mb-1">
            Today's Challenge: Grammar Detective
          </h3>
          <p className="text-white text-sm opacity-80">
            3-4 minutes • Earn Streak Freeze
          </p>
        </div>

        {/* Right section - CTA button */}
        <div className="flex flex-col items-end gap-2">
          <button 
            className={`bg-white text-[#1CB0F6] px-4 py-2 rounded-2xl font-bold text-sm shadow-sm transition-transform duration-300 ${buttonPulse ? 'scale-102' : 'scale-100'} hover:scale-105`}
          >
            Start
          </button>
        </div>
      </div>

      {/* Progress dots */}
      <div className="absolute bottom-2 left-3 flex gap-1">
        {[0, 1, 2, 3, 4].map((index) => (
          <div
            key={index}
            className={`w-1.5 h-1.5 rounded-full ${
              index < 2 ? 'bg-white' : 'bg-white bg-opacity-40'
            }`}
          ></div>
        ))}
      </div>
    </div>
  );
}