import { useState } from 'react';
import { StatusBar } from './components/StatusBar';
import { Header } from './components/Header';
import { ChallengeBanner } from './components/ChallengeBanner';
import { ChallengeIntroduction } from './components/ChallengeIntroduction';
import { ActiveChallenge } from './components/ActiveChallenge';
import { CelebrationSuccess } from './components/CelebrationSuccess';

type Screen = 'home' | 'challenge-intro' | 'active-challenge' | 'celebration';

export default function App() {
  const [currentScreen, setCurrentScreen] = useState<Screen>('home');

  const handleStartChallenge = () => {
    setCurrentScreen('challenge-intro');
  };

  const handleBackToHome = () => {
    setCurrentScreen('home');
  };

  const handleStartInvestigation = () => {
    setCurrentScreen('active-challenge');
  };

  const handleBackToIntro = () => {
    setCurrentScreen('challenge-intro');
  };

  const handleChallengeComplete = () => {
    setCurrentScreen('celebration');
  };

  const handleContinueLearning = () => {
    setCurrentScreen('home');
  };

  const handleTryAnotherChallenge = () => {
    setCurrentScreen('challenge-intro');
  };

  const handleCloseCelebration = () => {
    setCurrentScreen('home');
  };

  // Celebration Success Screen
  if (currentScreen === 'celebration') {
    return (
      <div className="w-full min-h-screen">
        <div className="max-w-sm mx-auto min-h-screen relative">
          <StatusBar />
          <CelebrationSuccess 
            onContinue={handleContinueLearning}
            onTryAnother={handleTryAnotherChallenge}
            onClose={handleCloseCelebration}
          />
        </div>
      </div>
    );
  }

  // Active Challenge Screen
  if (currentScreen === 'active-challenge') {
    return (
      <div className="w-full min-h-screen">
        <div className="max-w-sm mx-auto min-h-screen relative">
          <StatusBar />
          <ActiveChallenge 
            onComplete={handleChallengeComplete}
            onBack={handleBackToIntro}
          />
        </div>
      </div>
    );
  }

  // Challenge Introduction Screen
  if (currentScreen === 'challenge-intro') {
    return (
      <div className="w-full min-h-screen">
        <div className="max-w-sm mx-auto min-h-screen relative">
          <StatusBar />
          <ChallengeIntroduction 
            onBack={handleBackToHome}
            onStart={handleStartInvestigation}
          />
        </div>
      </div>
    );
  }

  // Home Screen (Default)
  return (
    <div className="w-full min-h-screen" style={{ backgroundColor: '#F7F7F7' }}>
      {/* Mobile container with iPhone X/11/12 dimensions */}
      <div className="max-w-sm mx-auto bg-[#F7F7F7] min-h-screen relative">
        {/* Status Bar */}
        <StatusBar />
        
        {/* Header */}
        <Header />
        
        {/* Challenge Banner */}
        <div onClick={handleStartChallenge} className="cursor-pointer">
          <ChallengeBanner />
        </div>
        
        {/* Additional content area for future expansion */}
        <div className="p-5">
          <div className="space-y-4">
            {/* Placeholder lesson cards */}
            <div className="bg-white rounded-2xl p-4 border border-gray-200">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-[#58CC02] rounded-full flex items-center justify-center">
                  <span className="text-white font-bold">1</span>
                </div>
                <div>
                  <h3 className="font-medium text-gray-800">Basic Phrases</h3>
                  <p className="text-sm text-gray-600">Lesson 1 of 5</p>
                </div>
              </div>
            </div>
            
            <div className="bg-white rounded-2xl p-4 border border-gray-200 opacity-60">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-gray-300 rounded-full flex items-center justify-center">
                  <span className="text-gray-600 font-bold">2</span>
                </div>
                <div>
                  <h3 className="font-medium text-gray-600">Family & Friends</h3>
                  <p className="text-sm text-gray-500">Complete previous lesson</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}