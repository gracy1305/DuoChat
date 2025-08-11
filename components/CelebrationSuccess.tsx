import { useState, useEffect } from 'react';

interface CelebrationSuccessProps {
  onContinue: () => void;
  onTryAnother: () => void;
  onClose: () => void;
}

interface ConfettiParticle {
  id: number;
  x: number;
  y: number;
  vx: number;
  vy: number;
  rotation: number;
  rotationSpeed: number;
  color: string;
  shape: 'circle' | 'square' | 'triangle';
  size: number;
}

export function CelebrationSuccess({ onContinue, onTryAnother, onClose }: CelebrationSuccessProps) {
  const [confetti, setConfetti] = useState<ConfettiParticle[]>([]);
  const [duoAnimation, setDuoAnimation] = useState('');
  const [xpCount, setXpCount] = useState(0);
  const [showRewards, setShowRewards] = useState(false);
  const [showInsight, setShowInsight] = useState(false);

  useEffect(() => {
    // Create confetti particles
    const particles: ConfettiParticle[] = [];
    const colors = ['#FFD700', '#FF6B6B', '#4ECDC4', '#45B7D1', '#96CEB4'];
    const shapes: Array<'circle' | 'square' | 'triangle'> = ['circle', 'square', 'triangle'];

    for (let i = 0; i < 35; i++) {
      particles.push({
        id: i,
        x: Math.random() * 375,
        y: -20,
        vx: (Math.random() - 0.5) * 4,
        vy: Math.random() * 3 + 2,
        rotation: Math.random() * 360,
        rotationSpeed: (Math.random() - 0.5) * 10,
        color: colors[Math.floor(Math.random() * colors.length)],
        shape: shapes[Math.floor(Math.random() * shapes.length)],
        size: Math.random() * 3 + 3,
      });
    }
    setConfetti(particles);

    // Character animation sequence
    setTimeout(() => setDuoAnimation('hat-tip'), 500);
    setTimeout(() => setDuoAnimation('thumbs-up'), 1000);
    setTimeout(() => setDuoAnimation(''), 2200);

    // XP counter animation
    setTimeout(() => {
      let count = 0;
      const xpInterval = setInterval(() => {
        count += 2;
        setXpCount(count);
        if (count >= 50) {
          clearInterval(xpInterval);
        }
      }, 30);
    }, 1000);

    // Staggered reward reveals
    setTimeout(() => setShowRewards(true), 1200);
    setTimeout(() => setShowInsight(true), 2000);

    // Animate confetti
    const animateConfetti = () => {
      setConfetti(prev => prev.map(particle => ({
        ...particle,
        x: particle.x + particle.vx,
        y: particle.y + particle.vy,
        rotation: particle.rotation + particle.rotationSpeed,
        vy: particle.vy + 0.1, // gravity
      })).filter(particle => particle.y < 900));
    };

    const confettiInterval = setInterval(animateConfetti, 16);
    
    return () => {
      clearInterval(confettiInterval);
    };
  }, []);

  const renderShape = (particle: ConfettiParticle) => {
    const style = {
      position: 'absolute' as const,
      left: particle.x,
      top: particle.y,
      width: particle.size,
      height: particle.size,
      backgroundColor: particle.color,
      transform: `rotate(${particle.rotation}deg)`,
    };

    switch (particle.shape) {
      case 'circle':
        return <div key={particle.id} style={{ ...style, borderRadius: '50%' }} />;
      case 'square':
        return <div key={particle.id} style={style} />;
      case 'triangle':
        return (
          <div
            key={particle.id}
            style={{
              position: 'absolute',
              left: particle.x,
              top: particle.y,
              width: 0,
              height: 0,
              borderLeft: `${particle.size / 2}px solid transparent`,
              borderRight: `${particle.size / 2}px solid transparent`,
              borderBottom: `${particle.size}px solid ${particle.color}`,
              transform: `rotate(${particle.rotation}deg)`,
            }}
          />
        );
      default:
        return null;
    }
  };

  return (
    <div 
      className="min-h-screen relative overflow-hidden"
      style={{
        background: 'radial-gradient(circle at center, #7ED321 0%, #58CC02 100%)',
      }}
    >
      {/* Confetti */}
      <div className="absolute inset-0 pointer-events-none">
        {confetti.map(renderShape)}
      </div>

      {/* Close Button */}
      <div className="absolute top-12 right-5 z-10">
        <button 
          onClick={onClose}
          className="w-6 h-6 text-white"
        >
          <svg viewBox="0 0 24 24" className="w-full h-full fill-current">
            <path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"/>
          </svg>
        </button>
      </div>

      {/* Case Closed Banner */}
      <div className="absolute top-32 left-1/2 transform -translate-x-1/2 -rotate-3 z-10">
        <div 
          className="bg-[#FFD700] border-2 border-[#FFA500] px-8 py-2 shadow-lg"
          style={{ 
            fontFamily: 'serif',
            boxShadow: '0 2px 4px rgba(0,0,0,0.2)'
          }}
        >
          <span className="text-[#8B4513] font-bold text-xl tracking-wide">CASE CLOSED!</span>
        </div>
      </div>

      {/* Main Character */}
      <div className="flex justify-center mt-28">
        <div className="relative">
          <div className={`w-50 h-55 relative transition-all duration-800 ${duoAnimation === 'hat-tip' ? '-rotate-12 -translate-y-1' : duoAnimation === 'thumbs-up' ? 'scale-105' : ''}`}>
            {/* Main body */}
            <div className="w-40 h-44 bg-gradient-to-b from-[#58CC02] to-[#4A9F02] rounded-full relative mx-auto">
              {/* Eyes (closed with joy) */}
              <div className="absolute top-10 left-8 w-8 h-6">
                <div className="w-full h-1 bg-[#4A9F02] rounded-full transform rotate-12"></div>
              </div>
              <div className="absolute top-10 right-8 w-8 h-6">
                <div className="w-full h-1 bg-[#4A9F02] rounded-full transform -rotate-12"></div>
              </div>
              
              {/* Wide smile */}
              <div className="absolute bottom-16 left-1/2 transform -translate-x-1/2 w-16 h-8 border-b-4 border-[#4A9F02] rounded-full"></div>
              
              {/* Beak */}
              <div className="absolute bottom-20 left-1/2 transform -translate-x-1/2">
                <div className="w-6 h-4 bg-orange-400" style={{ clipPath: 'polygon(50% 0%, 0% 100%, 100% 100%)' }}></div>
              </div>
            </div>

            {/* Deerstalker Hat */}
            <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
              <div className="w-32 h-16 bg-[#8B4513] rounded-t-full relative">
                {/* Checkered pattern */}
                <div className="absolute inset-2 opacity-30">
                  <div className="grid grid-cols-8 gap-0.5 h-full">
                    {[...Array(32)].map((_, i) => (
                      <div 
                        key={i}
                        className={`${(Math.floor(i/8) + i) % 2 === 0 ? 'bg-[#654321]' : 'bg-[#A0522D]'} rounded-sm`}
                      />
                    ))}
                  </div>
                </div>
              </div>
              {/* Hat brims */}
              <div className="absolute -left-3 top-3 w-10 h-10 bg-[#8B4513] rounded-full"></div>
              <div className="absolute -right-3 top-3 w-10 h-10 bg-[#8B4513] rounded-full"></div>
            </div>

            {/* Cape */}
            <div className="absolute top-24 left-1/2 transform -translate-x-1/2 w-24 h-20 bg-[#8B0000] rounded-b-lg">
              <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-20 h-6 bg-[#A52A2A] rounded-t-lg"></div>
            </div>

            {/* Thumbs up (appears during animation) */}
            {duoAnimation === 'thumbs-up' && (
              <div className="absolute top-16 -right-8 w-8 h-12 bg-[#58CC02] rounded-full transform rotate-12 animate-bounce">
                <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-4 h-4 bg-[#58CC02] rounded-full"></div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Results Summary Card */}
      <div className="mx-5 mt-8">
        <div className="bg-white rounded-2xl p-6 shadow-lg">
          <h2 className="text-[#2C3E50] text-3xl font-bold mb-4">Perfect Score!</h2>
          
          <div className="flex justify-between">
            <div className="flex items-center gap-2">
              <div className="w-5 h-5 text-[#FFD700]">
                <svg viewBox="0 0 24 24" className="w-full h-full fill-current">
                  <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
                </svg>
              </div>
              <span className="text-[#495057] font-medium text-sm">4/4 errors</span>
            </div>
            
            <div className="flex items-center gap-2">
              <div className="w-5 h-5 text-[#17A2B8]">
                <svg viewBox="0 0 24 24" className="w-full h-full fill-current">
                  <circle cx="12" cy="12" r="10" fill="none" stroke="currentColor" strokeWidth="2"/>
                  <path d="M12 6v6l4 2" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                </svg>
              </div>
              <span className="text-[#495057] font-medium text-sm">2:47</span>
            </div>
            
            <div className="flex items-center gap-2">
              <div className="w-5 h-5 text-[#FFC107]">
                <svg viewBox="0 0 24 24" className="w-full h-full fill-current">
                  <path d="M7 4V2C7 1.45 7.45 1 8 1s1 .45 1 1v2h6V2c0-.55.45-1 1-1s1 .45 1 1v2h1c1.1 0 2 .9 2 2v14c0 1.1-.9 2-2 2H6c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2h1zm0 4h10v10H7V8z"/>
                </svg>
              </div>
              <span className="text-[#28A745] font-medium text-sm">Personal best!</span>
            </div>
          </div>
        </div>
      </div>

      {/* Rewards Section */}
      <div className="mt-8 text-center">
        <h3 className="text-white font-bold text-xl mb-6">Rewards Earned</h3>
        
        <div className={`flex justify-center gap-10 transition-all duration-500 ${showRewards ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-5'}`}>
          {/* XP Counter */}
          <div className="flex flex-col items-center">
            <div className="w-20 h-20 rounded-full bg-white bg-opacity-20 flex items-center justify-center relative">
              <span className="text-white font-bold text-lg">+{xpCount} XP</span>
              {/* Sparkles */}
              <div className="absolute -top-1 -right-1 w-2 h-2 bg-white rounded-full animate-ping"></div>
              <div className="absolute -bottom-1 -left-1 w-1.5 h-1.5 bg-white rounded-full animate-ping" style={{ animationDelay: '0.5s' }}></div>
            </div>
          </div>

          {/* Streak Freeze */}
          <div className="flex flex-col items-center">
            <div className="w-20 h-20 rounded-full bg-white bg-opacity-20 flex items-center justify-center">
              <div className="w-10 h-10 text-[#87CEEB]">
                <svg viewBox="0 0 24 24" className="w-full h-full fill-current">
                  <path d="M12 2l-2 3h4l-2-3zM12 22l2-3H10l2 3zM9 12l-3-2v4l3-2zM15 12l3-2v4l-3-2zM12 8l-1 2h2l-1-2zM12 16l1-2h-2l1 2z"/>
                </svg>
              </div>
            </div>
            <span className="text-white text-xs mt-2 opacity-80">Streak Freeze</span>
          </div>

          {/* Challenge Coin */}
          <div className="flex flex-col items-center">
            <div className="w-20 h-20 rounded-full bg-white bg-opacity-20 flex items-center justify-center">
              <div className="w-10 h-10 bg-[#FFD700] rounded-full flex items-center justify-center animate-spin-slow">
                <span className="text-[#6C5CE7] font-bold text-xs">C</span>
              </div>
            </div>
            <span className="text-white text-xs mt-2 opacity-80">Challenge Coin</span>
          </div>
        </div>
      </div>

      {/* Insight Card */}
      <div className={`mx-5 mt-8 transition-all duration-500 ${showInsight ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-5'}`}>
        <div 
          className="rounded-xl p-4 border border-blue-400 border-opacity-30"
          style={{
            background: 'linear-gradient(45deg, #E3F2FD 0%, #BBDEFB 100%)'
          }}
        >
          <div className="flex items-start gap-3">
            <div className="w-6 h-6 text-[#2196F3] flex-shrink-0">
              <svg viewBox="0 0 24 24" className="w-full h-full fill-current">
                <path d="M16 6l2.29 2.29-4.88 4.88-4-4L2 16.59 3.41 18l6-6 4 4 6.3-6.29L22 12V6z"/>
              </svg>
            </div>
            <div className="flex-1">
              <p className="text-[#1565C0] font-medium text-sm">
                Your 'ser vs estar' accuracy improved 23% this week!
              </p>
              {/* Mini chart */}
              <div className="mt-2 flex items-end gap-1 h-5">
                {[2, 3, 2, 4, 5, 4, 6].map((height, i) => (
                  <div 
                    key={i}
                    className="bg-[#2196F3] rounded-sm flex-1"
                    style={{ height: `${height * 3}px` }}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="mx-5 mt-8 space-y-3">
        <button 
          onClick={onContinue}
          className="w-full bg-white text-[#58CC02] py-4 rounded-2xl font-bold text-lg shadow-lg hover:scale-105 transition-transform"
        >
          Continue Learning
        </button>
        
        <button 
          onClick={onTryAnother}
          className="w-full border-2 border-white text-white py-3 rounded-2xl font-bold hover:bg-white hover:text-[#58CC02] transition-colors"
        >
          Try Another Challenge
        </button>
        
        <p className="text-center text-white text-sm opacity-70 mt-4">
          Next challenge available in 22 hours
        </p>
      </div>

      <style jsx>{`
        @keyframes spin-slow {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        .animate-spin-slow {
          animation: spin-slow 3s linear infinite;
        }
      `}</style>
    </div>
  );
}