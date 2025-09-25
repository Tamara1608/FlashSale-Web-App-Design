import { useState, useEffect } from 'react';

interface HeaderProps {
  onLogoClick: () => void;
  saleEndsAt?: Date; // optional override for countdown
  transparent?: boolean; // for landing page
}

export function Header({ onLogoClick, saleEndsAt, transparent = false }: HeaderProps) {
  const [timeLeft, setTimeLeft] = useState({ hours: 23, minutes: 59, seconds: 30 });

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(prev => {
        if (prev.seconds > 0) {
          return { ...prev, seconds: prev.seconds - 1 };
        } else if (prev.minutes > 0) {
          return { ...prev, minutes: prev.minutes - 1, seconds: 59 };
        } else if (prev.hours > 0) {
          return { hours: prev.hours - 1, minutes: 59, seconds: 59 };
        }
        // Reset to 23:59:59 when it reaches 00:00:00
        return { hours: 23, minutes: 59, seconds: 59 };
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const formatTime = (time: number) => time.toString().padStart(2, '0');

  return (
    <header className={`${transparent ? 'bg-transparent' : 'bg-white/70 backdrop-blur-sm border-b-2 border-red-100'} px-4 py-4 md:px-6`}>
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        <button 
          onClick={onLogoClick}
          className="flex items-center space-x-2 hover:opacity-80 transition-opacity"
        >
          <div className="w-8 h-8 bg-red-600 rounded-lg flex items-center justify-center">
            <span className="text-white font-bold">F</span>
          </div>
          <span className="text-xl font-semibold text-gray-900">FlashSale</span>
        </button>
        
        <div className="flex items-center space-x-2 bg-red-600 text-white px-4 py-2 rounded-full">
          <span className="text-sm font-medium">Sale ends in:</span>
          <div className="flex items-center space-x-1 font-mono">
            <span className="bg-white text-red-600 px-2 py-1 rounded text-sm">
              {formatTime(timeLeft.hours)}
            </span>
            <span>:</span>
            <span className="bg-white text-red-600 px-2 py-1 rounded text-sm">
              {formatTime(timeLeft.minutes)}
            </span>
            <span>:</span>
            <span className="bg-white text-red-600 px-2 py-1 rounded text-sm">
              {formatTime(timeLeft.seconds)}
            </span>
          </div>
        </div>
      </div>
    </header>
  );
}