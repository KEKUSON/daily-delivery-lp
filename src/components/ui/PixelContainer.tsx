interface PixelContainerProps {
  children: React.ReactNode;
  className?: string;
}

export const PixelContainer: React.FC<PixelContainerProps> = ({ children, className = '' }) => {
  return (
    <div className={`relative ${className}`}>
      {/* Pixelated corners */}
      <div className="absolute -top-1 -left-1 w-2 h-2 bg-bg-primary"></div>
      <div className="absolute -top-1 -right-1 w-2 h-2 bg-bg-primary"></div>
      <div className="absolute -bottom-1 -left-1 w-2 h-2 bg-bg-primary"></div>
      <div className="absolute -bottom-1 -right-1 w-2 h-2 bg-bg-primary"></div>
      
      {children}
    </div>
  );
};
