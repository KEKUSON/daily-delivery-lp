import type { FC, ReactNode } from 'react';

interface RPGWindowProps {
  children: ReactNode;
  title?: string;
  className?: string;
}

export const RPGWindow: FC<RPGWindowProps> = ({ children, title, className = '' }) => {
  return (
    <div className={`relative bg-bg-card border-4 border-white p-4 font-retro text-text [clip-path:polygon(4px_0,calc(100%-4px)_0,100%_4px,100%_calc(100%-4px),calc(100%-4px)_100%,4px_100%,0_calc(100%-4px),0_4px)] ${className}`}>

      
      {title && (
        <div className="absolute -top-4 left-4 bg-bg-primary px-2 border-2 border-white">
          {title}
        </div>
      )}
      <div className="mt-2">
        {children}
      </div>
    </div>
  );
};
