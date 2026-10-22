// src/components/ui/avatar.tsx

import React from 'react';

interface AvatarProps {
  className?: string;
  children?: React.ReactNode;
}

const Avatar: React.FC<AvatarProps> = ({ className, children }) => {
  return (
    <div className={`inline-flex items-center justify-center rounded-full bg-gray-200 ${className}`}>
      {children}
    </div>
  );
};

interface AvatarImageProps {
  src: string;
  alt?: string;
}

const AvatarImage: React.FC<AvatarImageProps> = ({ src, alt }) => {
  return (
    <img
      src={src}
      alt={alt}
      className="h-full w-full rounded-full object-cover"
      onError={(e) => {
        e.currentTarget.src = 'https://via.placeholder.com/300'; // Fallback image
      }}
    />
  );
};

const AvatarFallback: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <span className="text-gray-500 text-lg font-semibold">
      {children}
    </span>
  );
};

export { Avatar, AvatarImage, AvatarFallback };