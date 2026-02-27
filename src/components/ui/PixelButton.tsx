import React from 'react';

type PixelButtonProps<E extends React.ElementType> = {
  as?: E;
  variant?: 'primary' | 'secondary';
  pulse?: boolean;
} & React.ComponentPropsWithoutRef<E>;

export const PixelButton = <E extends React.ElementType = 'button'>({
  as,
  children,
  variant = 'primary',
  pulse = false,
  className = '',
  ...props
}: PixelButtonProps<E>) => {
  const Component = as || 'button';
  const baseStyles = "relative inline-block px-6 py-3 font-retro text-lg font-bold border-4 border-white cursor-pointer transition-transform hover:-translate-y-1 active:translate-y-0 text-center";
  const variants = {
    primary: "bg-accent text-white",
    secondary: "bg-bg-secondary text-white"
  };
  
  const pulseClass = pulse ? "animate-[pulse-glow_2s_infinite]" : "";

  return (
    <Component 
      className={`${baseStyles} ${variants[variant]} ${pulseClass} ${className}`}
      {...props}
    >
      {/* Pixelated corners */}
      <div className="absolute -top-1 -left-1 w-2 h-2 bg-bg-primary pointer-events-none"></div>
      <div className="absolute -top-1 -right-1 w-2 h-2 bg-bg-primary pointer-events-none"></div>
      <div className="absolute -bottom-1 -left-1 w-2 h-2 bg-bg-primary pointer-events-none"></div>
      <div className="absolute -bottom-1 -right-1 w-2 h-2 bg-bg-primary pointer-events-none"></div>
      
      {children}
    </Component>
  );
};
