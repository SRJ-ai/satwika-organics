import React from "react";

export function Logo({ className = "w-24 h-auto" }: { className?: string }) {
  return (
    <svg 
      viewBox="0 0 200 205" 
      fill="none" 
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-label="Satwika Organics Logo"
    >

      {/* Yellow Drop */}
      <path 
        d="M100 25 C 125 60 140 80 130 105 C 120 130 80 130 70 105 C 60 80 75 60 100 25 Z" 
        fill="#f6c400" 
      />
      {/* Drop Highlight */}
      <path 
        d="M90 35 C 105 60 115 80 110 95" 
        stroke="rgba(255,255,255,0.4)" 
        strokeWidth="4" 
        strokeLinecap="round" 
        fill="none" 
      />

      {/* Left Green Leaf */}
      <path 
        d="M60 90 C 40 100 50 130 70 140 C 90 150 100 140 100 140 C 100 140 100 120 90 105 C 80 90 60 90 60 90 Z" 
        fill="#12711c" 
      />
      {/* Left Leaf Veins */}
      <path 
        d="M70 140 Q 80 120 90 110 M 75 130 Q 85 130 85 120" 
        stroke="rgba(255,255,255,0.35)" 
        strokeWidth="1.5" 
        strokeLinecap="round" 
        fill="none" 
      />

      {/* Right Green Leaf */}
      <path 
        d="M140 90 C 160 100 150 130 130 140 C 110 150 100 140 100 140 C 100 140 100 120 110 105 C 120 90 140 90 140 90 Z" 
        fill="#12711c" 
      />
      {/* Right Leaf Veins */}
      <path 
        d="M130 140 Q 120 120 110 110 M 125 130 Q 115 130 115 120" 
        stroke="rgba(255,255,255,0.35)" 
        strokeWidth="1.5" 
        strokeLinecap="round" 
        fill="none" 
      />

      {/* Text "Satwika" */}
      <text 
        x="100" 
        y="170" 
        fontFamily="ui-sans-serif, system-ui, sans-serif" 
        fontSize="48" 
        fontWeight="800" 
        fill="#1f4523" 
        textAnchor="middle"
        letterSpacing="-0.03em"
      >
        Satwika
      </text>

      {/* Text "ORGANICS" */}
      <text 
        x="100" 
        y="195" 
        fontFamily="ui-sans-serif, system-ui, sans-serif" 
        fontSize="18" 
        fontWeight="600" 
        fill="#383838" 
        textAnchor="middle"
        letterSpacing="0.05em"
      >
        ORGANICS
      </text>


    </svg>
  );
}
