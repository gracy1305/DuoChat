export function StatusBar() {
  return (
    <div className="flex justify-between items-center px-6 py-2 bg-white text-black text-sm font-medium">
      <span>9:41</span>
      <div className="flex items-center gap-1">
        {/* Signal bars */}
        <div className="flex items-end gap-0.5">
          <div className="w-1 h-2 bg-black rounded-sm"></div>
          <div className="w-1 h-3 bg-black rounded-sm"></div>
          <div className="w-1 h-4 bg-black rounded-sm"></div>
          <div className="w-1 h-4 bg-black rounded-sm"></div>
        </div>
        {/* WiFi icon */}
        <div className="w-4 h-3 relative ml-1">
          <div className="absolute inset-0">
            <svg viewBox="0 0 16 12" className="w-full h-full fill-black">
              <path d="M8 12a1.5 1.5 0 100-3 1.5 1.5 0 000 3zM4.5 6.5a4.5 4.5 0 017 0l1.5-1.5a6.5 6.5 0 00-10 0l1.5 1.5zM1 2a9 9 0 0114 0l-1.5 1.5a7 7 0 00-11 0L1 2z"/>
            </svg>
          </div>
        </div>
        {/* Battery */}
        <div className="flex items-center ml-2">
          <span className="text-xs mr-1">100%</span>
          <div className="w-6 h-3 border border-black rounded-sm relative">
            <div className="w-full h-full bg-black rounded-sm"></div>
            <div className="absolute -right-0.5 top-0.5 w-0.5 h-2 bg-black rounded-r-sm"></div>
          </div>
        </div>
      </div>
    </div>
  );
}