import { useState, useEffect } from 'react';

interface ActiveChallengeProps {
  onComplete: () => void;
  onBack: () => void;
}

export function ActiveChallenge({ onComplete, onBack }: ActiveChallengeProps) {
  const [progress, setProgress] = useState(60);
  const [timeRemaining, setTimeRemaining] = useState(151); // 2:31 in seconds
  const [showCorrection, setShowCorrection] = useState(false);
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const [isCorrect, setIsCorrect] = useState(false);
  const [showFeedback, setShowFeedback] = useState(false);
  const [errorPulse, setErrorPulse] = useState(true);
  const [sceneRevealed, setSceneRevealed] = useState(60);

  useEffect(() => {
    // Timer countdown
    const timer = setInterval(() => {
      setTimeRemaining(prev => Math.max(0, prev - 1));
    }, 1000);

    // Error pulse animation
    const pulseInterval = setInterval(() => {
      setErrorPulse(prev => !prev);
    }, 1500);

    return () => {
      clearInterval(timer);
      clearInterval(pulseInterval);
    };
  }, []);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const handleErrorClick = () => {
    setShowCorrection(true);
  };

  const handleAnswerSelect = (answer: string) => {
    setSelectedAnswer(answer);
    const correct = answer === "era";
    setIsCorrect(correct);
    setShowFeedback(true);
    
    if (correct) {
      setTimeout(() => {
        setProgress(100);
        setSceneRevealed(100);
        setTimeout(() => {
          onComplete();
        }, 1500);
      }, 1500);
    } else {
      setTimeout(() => {
        setShowFeedback(false);
        setSelectedAnswer(null);
      }, 2000);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#F8F9FA] to-[#E9ECEF]">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 px-5 py-4">
        {/* Progress Bar */}
        <div className="mb-4">
          <div className="w-full h-1.5 bg-gray-200 rounded-full overflow-hidden">
            <div 
              className="h-full bg-[#58CC02] rounded-full transition-all duration-500 ease-out"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>
        
        {/* Timer and Hint */}
        <div className="flex justify-between items-center">
          <button className="w-6 h-6 text-gray-500">
            <svg viewBox="0 0 24 24" className="w-full h-full fill-current">
              <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
              <path d="M9 21c0 .55.45 1 1 1h4c.55 0 1-.45 1-1v-1H9v1zm3-19C8.14 2 5 5.14 5 9c0 2.38 1.19 4.47 3 5.74V17c0 .55.45 1 1 1h6c.55 0 1-.45 1-1v-2.26c1.81-1.27 3-3.36 3-5.74 0-3.86-3.14-7-7-7z"/>
            </svg>
          </button>
          
          <span className="text-gray-600 font-medium">
            {formatTime(timeRemaining)}
          </span>
        </div>
      </div>

      {/* Story Illustration */}
      <div className="h-53 relative overflow-hidden">
        {/* Background scene */}
        <div 
          className="absolute inset-0 transition-all duration-800 ease-out"
          style={{
            background: `linear-gradient(180deg, #87CEEB 0%, #F4A460 70%, #696969 100%)`,
            clipPath: `polygon(0 0, ${sceneRevealed}% 0, ${sceneRevealed}% 100%, 0 100%)`
          }}
        >
          {/* Market stalls */}
          <div className="absolute bottom-20 left-8 w-16 h-12 bg-[#DC143C] transform -skew-y-12" style={{ clipPath: 'polygon(0 100%, 100% 100%, 90% 0, 10% 0)' }} />
          <div className="absolute bottom-20 left-20 w-16 h-12 bg-[#228B22] transform -skew-y-12" style={{ clipPath: 'polygon(0 100%, 100% 100%, 90% 0, 10% 0)' }} />
          <div className="absolute bottom-20 left-32 w-16 h-12 bg-[#FF6347] transform -skew-y-12" style={{ clipPath: 'polygon(0 100%, 100% 100%, 90% 0, 10% 0)' }} />
          
          {/* Buildings */}
          <div className="absolute bottom-32 right-8 w-20 h-16 bg-[#CD853F]" />
          <div className="absolute bottom-32 right-20 w-16 h-20 bg-[#F4A460]" />
          
          {/* Fruit displays */}
          <div className="absolute bottom-12 left-10 w-3 h-3 bg-red-500 rounded-full" />
          <div className="absolute bottom-12 left-14 w-3 h-3 bg-orange-400 rounded-full" />
          <div className="absolute bottom-12 left-18 w-3 h-3 bg-yellow-400 rounded-full" />
          
          <div className="absolute bottom-12 left-22 w-3 h-3 bg-green-500 rounded-full" />
          <div className="absolute bottom-12 left-26 w-3 h-3 bg-green-600 rounded-full" />
          
          {/* Cobblestones */}
          <div className="absolute bottom-0 left-0 w-full h-8 opacity-30">
            {[...Array(20)].map((_, i) => (
              <div 
                key={i}
                className="absolute w-4 h-4 bg-gray-600 rounded-full"
                style={{
                  left: `${(i % 10) * 10}%`,
                  top: `${Math.floor(i / 10) * 50}%`,
                  transform: `translate(${Math.random() * 20 - 10}px, ${Math.random() * 10 - 5}px)`
                }}
              />
            ))}
          </div>
        </div>
        
        {/* Unrevealed overlay */}
        <div 
          className="absolute inset-0 bg-gray-300 bg-opacity-60"
          style={{
            clipPath: `polygon(${sceneRevealed}% 0, 100% 0, 100% 100%, ${sceneRevealed}% 100%)`
          }}
        >
          {/* Puzzle piece edges */}
          <div className="absolute inset-0 opacity-30">
            <svg width="100%" height="100%" className="absolute inset-0">
              <defs>
                <pattern id="puzzlePattern" x="0" y="0" width="40" height="40" patternUnits="userSpaceOnUse">
                  <path d="M20,0 Q25,5 20,10 Q15,5 20,0" fill="none" stroke="white" strokeWidth="1"/>
                  <path d="M40,20 Q35,25 30,20 Q35,15 40,20" fill="none" stroke="white" strokeWidth="1"/>
                </pattern>
              </defs>
              <rect width="100%" height="100%" fill="url(#puzzlePattern)"/>
            </svg>
          </div>
        </div>
      </div>

      {/* Story Text Container */}
      <div className="mx-5 mt-5">
        <div className="bg-white rounded-2xl p-6 shadow-sm">
          <p className="text-[#2C3E50] text-xl leading-relaxed" style={{ letterSpacing: '0.2px' }}>
            María{' '}
            <span 
              onClick={handleErrorClick}
              className={`relative cursor-pointer transition-all duration-300 ${errorPulse ? 'opacity-100 scale-100' : 'opacity-70 scale-102'}`}
              style={{ 
                textDecorationLine: 'underline',
                textDecorationColor: '#FF4757',
                textDecorationThickness: '3px',
                textUnderlineOffset: '3px'
              }}
            >
              fue
            </span>
            {' '}al mercado temprano. Ella compró frutas y verduras frescas porque quiere hacer una ensalada.
          </p>
        </div>
      </div>

      {/* Correction Interface */}
      {showCorrection && (
        <div className="mx-5 mt-4">
          <div className="flex justify-center gap-3">
            {['era', 'fue', 'había sido'].map((option, index) => (
              <button
                key={option}
                onClick={() => handleAnswerSelect(option)}
                className={`px-4 py-3 rounded-full border-2 font-medium text-base transition-all duration-300 ${
                  selectedAnswer === option
                    ? isCorrect && selectedAnswer === option
                      ? 'bg-[#D4EDDA] border-[#28A745] text-[#155724] scale-110'
                      : !isCorrect && selectedAnswer === option
                        ? 'bg-[#F8D7DA] border-[#DC3545] text-[#721C24] animate-shake'
                        : 'bg-[#F8F9FA] border-[#DEE2E6] text-[#495057]'
                    : 'bg-[#F8F9FA] border-[#DEE2E6] text-[#495057] hover:border-[#6C5CE7]'
                }`}
                style={{
                  animationDelay: `${index * 100}ms`,
                  animationFillMode: 'both'
                }}
              >
                {selectedAnswer === option && isCorrect && (
                  <span className="mr-2">✓</span>
                )}
                {option}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Feedback */}
      {showFeedback && (
        <div className="mx-5 mt-4 text-center">
          <p className={`font-bold text-lg transition-all duration-300 ${isCorrect ? 'text-[#28A745]' : 'text-[#DC3545]'} animate-fadeInScale`}>
            {isCorrect ? '¡Excelente!' : '¡Inténtalo de nuevo!'}
          </p>
        </div>
      )}

      {/* Bottom Progress Section */}
      <div className="fixed bottom-0 left-0 right-0 bg-white rounded-t-xl p-5 shadow-lg">
        <div className="max-w-sm mx-auto">
          <div className="flex justify-between items-center mb-3">
            <div>
              <p className="text-gray-600 text-sm">Story scene: {sceneRevealed}% revealed</p>
              <p className="text-[#28A745] font-medium">You're doing great! 2 more to go.</p>
            </div>
            
            <button 
              className="bg-[#6C5CE7] text-white px-5 py-2 rounded-full font-bold text-sm"
              disabled={!isCorrect}
            >
              Next
            </button>
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes fadeInScale {
          0% { opacity: 0; transform: scale(0.8); }
          100% { opacity: 1; transform: scale(1); }
        }
        @keyframes shake {
          0%, 100% { transform: translateX(0); }
          25% { transform: translateX(-3px); }
          75% { transform: translateX(3px); }
        }
        .animate-fadeInScale {
          animation: fadeInScale 0.3s ease-out;
        }
        .animate-shake {
          animation: shake 0.2s ease-in-out 3;
        }
      `}</style>
    </div>
  );
}