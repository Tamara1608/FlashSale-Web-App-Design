import React from 'react';

interface IconAvatarProps {
  iconSrc: string; // local path or URL
  alt?: string;
  name?: string;
}

export function IconAvatar({ iconSrc, alt = "icon", name }: IconAvatarProps) {
  return (
    <div className="flex items-center gap-6">
      {/* Circle with icon inside */}
      <div className="w-20 h-20 rounded-full bg-gray-100 flex items-center justify-center shadow-md overflow-hidden">
        <img 
          src={iconSrc} 
          alt={alt} 
          className="w-6 h-6 object-contain"
          onError={(e) => {
            const target = e.target as HTMLImageElement;
            target.style.display = "none"; // hide if missing
          }}
        />
      </div>
      {name && (
        <span className="font-bold text-pink-600 text-4xl">{name}</span>
      )}
    </div>
  );
}
