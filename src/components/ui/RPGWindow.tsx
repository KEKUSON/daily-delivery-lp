interface RPGWindowProps {
  children: React.ReactNode;
  title?: string;
  className?: string;
}

export const RPGWindow: React.FC<RPGWindowProps> = ({ children, title, className = '' }) => {
  return (
    <div className={`relative bg-bg-card border-4 border-white p-4 font-retro text-text ${className}`}>
      {/* Pixelated corners for RPG feel */}
      <div className="absolute -top-1 -left-1 w-2 h-2 bg-bg-primary"></div>
      <div className="absolute -top-1 -right-1 w-2 h-2 bg-bg-primary"></div>
      <div className="absolute -bottom-1 -left-1 w-2 h-2 bg-bg-primary"></div>
      <div className="absolute -bottom-1 -right-1 w-2 h-2 bg-bg-primary"></div>
      
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
