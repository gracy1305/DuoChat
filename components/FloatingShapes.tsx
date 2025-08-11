import { useEffect, useState } from 'react';

export function FloatingShapes() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  const shapes = [
    { type: 'triangle', size: 12, left: '10%', top: '20%', duration: '8s' },
    { type: 'triangle', size: 16, left: '80%', top: '15%', duration: '10s' },
    { type: 'triangle', size: 20, left: '60%', top: '70%', duration: '12s' },
    { type: 'circle', size: 8, left: '15%', top: '60%', duration: '9s' },
    { type: 'circle', size: 14, left: '85%', top: '45%', duration: '11s' },
    { type: 'circle', size: 18, left: '30%', top: '80%', duration: '10s' },
    { type: 'diamond', size: 10, left: '75%', top: '25%', duration: '9s' },
    { type: 'diamond', size: 15, left: '40%', top: '35%', duration: '11s' },
  ];

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {shapes.map((shape, index) => (
        <div
          key={index}
          className="absolute animate-float opacity-15"
          style={{
            left: shape.left,
            top: shape.top,
            width: `${shape.size}px`,
            height: `${shape.size}px`,
            animationDuration: shape.duration,
            animationDelay: `${Math.random() * 2}s`,
          }}
        >
          {shape.type === 'triangle' && (
            <div
              className="w-0 h-0"
              style={{
                borderLeft: `${shape.size / 2}px solid transparent`,
                borderRight: `${shape.size / 2}px solid transparent`,
                borderBottom: `${shape.size}px solid white`,
              }}
            />
          )}
          {shape.type === 'circle' && (
            <div className="w-full h-full rounded-full bg-white" />
          )}
          {shape.type === 'diamond' && (
            <div
              className="w-full h-full bg-white transform rotate-45"
              style={{ borderRadius: '2px' }}
            />
          )}
        </div>
      ))}
      
      <style jsx>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px) translateX(0px); }
          25% { transform: translateY(-10px) translateX(5px); }
          50% { transform: translateY(5px) translateX(-3px); }
          75% { transform: translateY(-5px) translateX(8px); }
        }
        .animate-float {
          animation: float ease-in-out infinite;
        }
      `}</style>
    </div>
  );
}