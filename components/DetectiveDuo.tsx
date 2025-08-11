import { useEffect, useState } from 'react';

export function DetectiveDuo() {
  const [showTipHat, setShowTipHat] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Character entrance animation
    setTimeout(() => setIsVisible(true), 300);
    
    // Hat tip animation after entrance
    setTimeout(() => {
      setShowTipHat(true);
      setTimeout(() => setShowTipHat(false), 800);
    }, 1000);
  }, []);

  return (
    <div className={`relative transition-all duration-700 ease-out ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
      <div className="w-45 h-50 relative mx-auto">
        {/* Main body */}
        <div className="w-32 h-36 bg-[#58CC02] rounded-full relative mx-auto">
          {/* Eyes */}
          <div className="absolute top-8 left-6 w-6 h-6 bg-white rounded-full">
            <div className="absolute top-1 left-1 w-4 h-4 bg-black rounded-full"></div>
          </div>
          <div className="absolute top-8 right-6 w-6 h-6 bg-white rounded-full">
            <div className="absolute top-1 right-1 w-4 h-4 bg-black rounded-full"></div>
          </div>
          
          {/* Raised eyebrow (confident expression) */}
          <div className="absolute top-6 right-8 w-4 h-1 bg-[#4A9F02] rounded-full transform rotate-12"></div>
          
          {/* Beak */}
          <div className="absolute bottom-12 left-1/2 transform -translate-x-1/2">
            <div className="w-4 h-3 bg-orange-400 clip-triangle"></div>
          </div>
          
          {/* Smile */}
          <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 w-8 h-4 border-b-2 border-[#4A9F02] rounded-full"></div>
        </div>

        {/* Deerstalker Hat */}
        <div className={`absolute -top-2 left-1/2 transform -translate-x-1/2 transition-transform duration-800 ${showTipHat ? 'rotate-12 -translate-y-1' : ''}`}>
          {/* Main hat */}
          <div className="w-28 h-12 bg-[#8B4513] rounded-t-full relative">
            {/* Checkered pattern */}
            <div className="absolute inset-2 opacity-30">
              <div className="grid grid-cols-6 gap-0.5 h-full">
                {[...Array(24)].map((_, i) => (
                  <div 
                    key={i}
                    className={`${(Math.floor(i/6) + i) % 2 === 0 ? 'bg-[#654321]' : 'bg-[#A0522D]'} rounded-sm`}
                  />
                ))}
              </div>
            </div>
          </div>
          {/* Hat brims */}
          <div className="absolute -left-2 top-2 w-8 h-8 bg-[#8B4513] rounded-full"></div>
          <div className="absolute -right-2 top-2 w-8 h-8 bg-[#8B4513] rounded-full"></div>
          <div className="absolute -top-1 left-1/2 transform -translate-x-1/2 w-6 h-6 bg-[#8B4513] rounded-full"></div>
        </div>

        {/* Cape */}
        <div className="absolute top-20 left-1/2 transform -translate-x-1/2 w-20 h-16 bg-[#8B0000] rounded-b-lg">
          {/* Cape collar */}
          <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-16 h-4 bg-[#A52A2A] rounded-t-lg"></div>
        </div>

        {/* Magnifying Glass */}
        <div className="absolute top-12 -right-4 w-12 h-12 group">
          {/* Handle */}
          <div className="absolute bottom-0 right-2 w-2 h-6 bg-[#8B4513] rounded-full transform rotate-45"></div>
          {/* Lens frame */}
          <div className="absolute top-0 left-0 w-8 h-8 border-4 border-[#FFD700] rounded-full bg-[#87CEEB] bg-opacity-30 relative overflow-hidden">
            {/* Lens highlight */}
            <div className="absolute top-1 left-1 w-3 h-3 bg-white bg-opacity-60 rounded-full"></div>
            {/* Reflection */}
            <div className="absolute top-2 left-3 w-2 h-2 bg-white bg-opacity-40 rounded-full"></div>
          </div>
        </div>
      </div>
      
      <style jsx>{`
        .clip-triangle {
          clip-path: polygon(50% 0%, 0% 100%, 100% 100%);
        }
      `}</style>
    </div>
  );
}