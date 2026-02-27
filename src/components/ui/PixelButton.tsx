import React from 'react';

interface PixelButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary';
  pulse?: boolean;
}

export const PixelButton: React.FC<PixelButtonProps> = ({ 
  children, 
  variant = 'primary', 
  pulse = false,
  className = '',
  ...props 
}) => {
  const baseStyles = "relative inline-block px-6 py-3 font-retro text-lg font-bold border-4 border-white cursor-pointer transition-transform hover:-translate-y-1 active:translate-y-0";
  const variants = {
    primary: "bg-accent text-white",
    secondary: "bg-bg-secondary text-white"
  };
  
  const pulseClass = pulse ? "animate-[pulse-glow_2s_infinite]" : "";

  return (
    <button 
      className={`${baseStyles} ${variants[variant]} ${pulseClass} ${className}`}
      {...props}
    >
      {/* Pixelated corners */}
      <div className="absolute -top-1 -left-1 w-2 h-2 bg-bg-primary"></div>
      <div className="absolute -top-1 -right-1 w-2 h-2 bg-bg-primary"></div>
      <div className="absolute -bottom-1 -left-1 w-2 h-2 bg-bg-primary"></div>
      <div className="absolute -bottom-1 -right-1 w-2 h-2 bg-bg-primary"></div>
      
      {children}
    </button>
  );
};
