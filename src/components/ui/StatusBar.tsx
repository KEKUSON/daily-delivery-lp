import React from 'react';

interface StatusBarProps {
  label: string;
  level: number;
  maxLevel?: number;
  value: number;
  maxValue?: number;
  color?: string;
}

export const StatusBar: React.FC<StatusBarProps> = ({ 
  label, 
  level, 
  value, 
  maxValue = 10,
  color = 'bg-accent'
}) => {
  // Generate blocks for the bar
  const blocks = [];
  for (let i = 0; i < maxValue; i++) {
    blocks.push(
      <div 
        key={i} 
        className={`h-4 w-4 border border-bg-primary ${i < value ? color : 'bg-gray-700'}`}
      ></div>
    );
  }

  return (
    <div className="flex flex-col sm:flex-row sm:items-center gap-2 font-retro text-sm sm:text-base">
      <div className="w-24 text-right">{label}:</div>
      <div className="flex gap-0.5 border-2 border-white p-0.5 bg-black">
        {blocks}
      </div>
      <div className="w-16 text-left ml-2 text-accent-gold">Lv.{level}</div>
    </div>
  );
};
