export function Header() {
  return (
    <div className="bg-white border-b border-gray-200 px-5 py-4 flex items-center justify-between">
      {/* Duolingo Logo */}
      <div className="w-8 h-8 flex items-center justify-center">
        <svg viewBox="0 0 32 32" className="w-full h-full">
          <circle cx="16" cy="16" r="16" fill="#58CC02"/>
          <path d="M8 12c0-2 1.5-3.5 3.5-3.5S15 10 15 12v8c0 2-1.5 3.5-3.5 3.5S8 22 8 20v-8z" fill="white"/>
          <path d="M17 12c0-2 1.5-3.5 3.5-3.5S24 10 24 12v8c0 2-1.5 3.5-3.5 3.5S17 22 17 20v-8z" fill="white"/>
          <circle cx="11.5" cy="14" r="1.5" fill="#58CC02"/>
          <circle cx="20.5" cy="14" r="1.5" fill="#58CC02"/>
        </svg>
      </div>

      {/* Streak Counter */}
      <div className="flex items-center gap-2">
        <div className="w-6 h-6 relative">
          <svg viewBox="0 0 24 24" className="w-full h-full">
            <defs>
              <linearGradient id="flameGradient" x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stopColor="#FF6B35"/>
                <stop offset="100%" stopColor="#FF8E3C"/>
              </linearGradient>
            </defs>
            <path d="M12 2c-1.5 0-3 .5-4 1.5C7 4.5 6.5 6 6.5 7.5c0 1 .5 2 1.5 2.5-.5.5-1 1.5-1 2.5 0 2 1.5 3.5 3.5 3.5.5 0 1-.1 1.5-.3.5.2 1 .3 1.5.3 2 0 3.5-1.5 3.5-3.5 0-1-.5-2-1-2.5 1-.5 1.5-1.5 1.5-2.5 0-1.5-.5-3-1.5-4C15 2.5 13.5 2 12 2z" fill="url(#flameGradient)"/>
          </svg>
        </div>
        <span className="text-gray-800 font-bold text-lg">47</span>
      </div>

      {/* Profile Photo */}
      <div className="w-8 h-8 rounded-full border-2 border-gray-200 bg-gray-100 flex items-center justify-center overflow-hidden">
        <div className="w-6 h-6 rounded-full bg-gradient-to-br from-blue-400 to-purple-500"></div>
      </div>
    </div>
  );
}