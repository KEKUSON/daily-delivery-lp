import type { FC, ReactNode } from 'react';

interface PixelContainerProps {
  children: ReactNode;
  className?: string;
}

export const PixelContainer: FC<PixelContainerProps> = ({ children, className = '' }) => {
  return (
    <div className={`relative [clip-path:polygon(4px_0,calc(100%-4px)_0,100%_4px,100%_calc(100%-4px),calc(100%-4px)_100%,4px_100%,0_calc(100%-4px),0_4px)] ${className}`}>

      
      {children}
    </div>
  );
};
