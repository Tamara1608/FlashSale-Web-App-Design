import React from 'react';
import { Button } from './ui/button';

interface LandingBannerProps {
  onShopNowClick: () => void;
  headline?: string;
  subheadline?: string;
  badgeText?: string;
  stats?: { label: string; value: string }[];
}

// // Chili pepper icon component
// function ChiliPepper({ className = "", style }: { className?: string; style?: React.CSSProperties }) {
//   return (
//     <img 
//       src="/chilli.png"
//       alt="Chili pepper" 
//       className={`${className} block`}
//       width="48" 
//       height="48"
//       style={style}
//     />
//   );
// }

export function LandingBanner({ 
  onShopNowClick, 
  headline = 'Flash Sale', 
  subheadline = 'Unbeatable deals on premium electronics. Up to 70% off while supplies last!', 
  badgeText = '🔥 Limited Time Only', 
  stats = [
    { value: '70%', label: 'Max Discount' },
    { value: '24h', label: 'Sale Duration' },
    { value: '100+', label: 'Products' },
  ] 
}: LandingBannerProps) {
  return (
    <div className="relative min-h-screen flex items-center justify-center overflow-hidden" style={{ height: '100vh' }}>
      {/* Ombre background gradient */}
      <div 
        className="absolute inset-0" 
        style={{
          background: 'linear-gradient(135deg, #ffb3ba 0%, #ff9a9e 25%, #fecfef 50%, #fecfef 75%, #ff6b6b 100%)',
          minHeight: '100vh'
        }}
      ></div>
      

      {/* Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 py-16 md:px-6 text-center">
        <div className="space-y-8">
          <div className="space-y-4">
            <div className="inline-block bg-red-600 text-white rounded-full px-4 py-2 text-sm font-medium shadow-lg animate-pulse">
              {badgeText}
            </div>
            
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold leading-tight text-gray-900 animate-fade-in-up">
              {headline}
              <br />
              <span className="text-red-600 animate-pulse">Starts Now!</span>
            </h1>
            
            <p className="text-xl md:text-2xl text-gray-700 max-w-2xl mx-auto leading-relaxed animate-fade-in-up" style={{ animationDelay: '0.3s' }}>
              {subheadline}
            </p>
          </div>
          
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 animate-fade-in-up" style={{ animationDelay: '0.6s' }}>
            <Button
              onClick={onShopNowClick}
              className="bg-red-600 text-white hover:bg-red-700 px-8 py-4 text-lg font-semibold rounded-full transition-all hover:scale-105 shadow-xl animate-bounce"
              style={{ animationDelay: '1s', animationDuration: '2s' }}
            >
              Shop Now
            </Button>
            
            <div className="flex items-center space-x-2 text-gray-700">
              <span className="text-sm animate-spin" style={{ animationDuration: '2s' }}>⚡</span>
              <span className="text-sm font-medium">Free shipping on all orders</span>
            </div>
          </div>
          
          <div className="grid grid-cols-3 gap-8 max-w-md mx-auto pt-8 border-t border-red-200 animate-fade-in-up" style={{ animationDelay: '0.9s' }}>
            {stats.map((s, i) => (
              <div key={i} className="text-center">
                <div className="text-2xl font-bold text-red-600 animate-pulse" style={{ animationDelay: `${1.2 + i * 0.2}s` }}>
                  {s.value}
                </div>
                <div className="text-sm text-gray-700">{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}