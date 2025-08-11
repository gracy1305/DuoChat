import { useEffect, useState } from 'react';

export function ChallengePreviewCard() {
  const [isVisible, setIsVisible] = useState(false);
  const [errorPulse, setErrorPulse] = useState(true);

  useEffect(() => {
    // Card slide up animation with delay
    setTimeout(() => setIsVisible(true), 600);
    
    // Error pulse animation
    const pulseInterval = setInterval(() => {
      setErrorPulse(prev => !prev);
    }, 1500);

    return () => clearInterval(pulseInterval);
  }, []);

  return (
    <div className={`mx-5 transition-all duration-500 ease-out ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-5'}`}>
      <div 
        className="bg-white rounded-2xl p-5 relative"
        style={{ boxShadow: '0 8px 24px rgba(0,0,0,0.15)' }}
      >
        {/* Sample text with error */}
        <p className="text-gray-800 text-lg leading-relaxed">
          Estoy muy cansado porque{' '}
          <span 
            className={`relative transition-opacity duration-300 ${errorPulse ? 'opacity-100' : 'opacity-70'}`}
            style={{ 
              textDecorationLine: 'underline',
              textDecorationColor: '#FF4757',
              textDecorationThickness: '2px',
              textUnderlineOffset: '2px'
            }}
          >
            trabajé
          </span>
          {' '}todo el día.
        </p>

        {/* Instruction callout */}
        <div className="flex items-center gap-2 mt-4">
          <span className="text-base">👆</span>
          <p className="text-[#6C5CE7] font-medium text-sm">
            Tap errors like this one!
          </p>
        </div>
      </div>
    </div>
  );
}