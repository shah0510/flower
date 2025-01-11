import React from 'react';

export default function SnowAnimation() {
  return (
    <div className="fixed inset-0 pointer-events-none z-0">
      <div className="absolute inset-0 animate-snow-1">
        {[...Array(50)].map((_, i) => (
          <div
            key={`snow-1-${i}`}
            className="snow-particle"
            style={{
              left: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 5}s`,
              opacity: Math.random(),
            }}
          />
        ))}
      </div>
      <div className="absolute inset-0 animate-snow-2">
        {[...Array(50)].map((_, i) => (
          <div
            key={`snow-2-${i}`}
            className="snow-particle"
            style={{
              left: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 5}s`,
              opacity: Math.random(),
            }}
          />
        ))}
      </div>
    </div>
  );
}