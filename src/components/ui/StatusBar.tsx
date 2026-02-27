import type { FC } from 'react';

interface StatusBarProps {
  label: string;
  level: number;
  maxLevel?: number;
  value: number;
  maxValue?: number;
  variant?: 'primary' | 'blue' | 'green' | 'purple';
}

const colorMap: Record<string, string> = {
  primary: 'bg-accent',
  blue: 'bg-blue-500',
  green: 'bg-green-500',
  purple: 'bg-purple-500',
};

export const StatusBar: FC<StatusBarProps> = ({ 
  label, 
  level, 
  value, 
  maxValue = 10,
  variant = 'primary'
}) => {
    const activeColor = colorMap[variant] || colorMap.primary;
  
    // Generate blocks for the bar
    const blocks = Array.from({ length: maxValue }, (_, i) => (
      <div 
        key={i}
        className={`h-4 w-4 border border-bg-primary ${i < value ? activeColor : 'bg-gray-700'}`}
      ></div>
    ));
  
    return (    <div className="flex flex-col sm:flex-row sm:items-center gap-2 font-retro text-sm sm:text-base">
      <div className="w-24 text-right">{label}:</div>
      <div className="flex gap-0.5 border-2 border-white p-0.5 bg-black">
        {blocks}
      </div>
      <div className="w-16 text-left ml-2 text-accent-gold">Lv.{level}</div>
    </div>
  );
};
