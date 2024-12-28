import React from 'react';
import { ActivitySquare } from 'lucide-react';
import type { StressLevel } from '../types';

interface Props {
  stressLevel: StressLevel | null;
}

export function StressGauge({ stressLevel }: Props) {
  const getColor = () => {
    if (!stressLevel) return 'bg-gray-200';
    switch (stressLevel.level) {
      case 'low': return 'bg-green-500';
      case 'medium': return 'bg-yellow-500';
      case 'high': return 'bg-red-500';
      default: return 'bg-gray-200';
    }
  };

  return (
    <div className="p-6 bg-white rounded-lg shadow-md">
      <div className="flex items-center gap-2 mb-4">
        <ActivitySquare className="w-5 h-5" />
        <h2 className="text-xl font-semibold">Current Stress Level</h2>
      </div>
      
      <div className="relative h-4 bg-gray-200 rounded-full overflow-hidden">
        <div
          className={`absolute left-0 top-0 h-full transition-all duration-500 ${getColor()}`}
          style={{ width: `${stressLevel?.score ?? 0}%` }}
        />
      </div>
      
      <div className="mt-2 text-center font-medium">
        {stressLevel ? (
          <span className="capitalize">{stressLevel.level} Stress</span>
        ) : (
          <span className="text-gray-500">Analyzing...</span>
        )}
      </div>
    </div>
  );
}
