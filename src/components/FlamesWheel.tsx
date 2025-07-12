
import React, { useEffect, useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';

interface FlamesWheelProps {
  remainingCount: number;
}

const FlamesWheel: React.FC<FlamesWheelProps> = ({ remainingCount }) => {
  const [currentFlames, setCurrentFlames] = useState(['F', 'L', 'A', 'M', 'E', 'S']);
  const [highlightIndex, setHighlightIndex] = useState(0);
  const [eliminatedLetters, setEliminatedLetters] = useState<string[]>([]);
  const [isCalculating, setIsCalculating] = useState(false);

  const flamesColors = {
    F: 'bg-pink-100 border-pink-300 text-pink-700',
    L: 'bg-red-100 border-red-300 text-red-700',
    A: 'bg-purple-100 border-purple-300 text-purple-700',
    M: 'bg-blue-100 border-blue-300 text-blue-700',
    E: 'bg-gray-100 border-gray-300 text-gray-700',
    S: 'bg-green-100 border-green-300 text-green-700'
  };

  useEffect(() => {
    if (remainingCount > 0) {
      const timer = setTimeout(() => {
        setIsCalculating(true);
        simulateFlamesCalculation();
      }, 1500);
      return () => clearTimeout(timer);
    }
  }, [remainingCount]);

  const simulateFlamesCalculation = () => {
    let flames = ['F', 'L', 'A', 'M', 'E', 'S'];
    let currentIndex = 0;
    let step = 0;
    const maxSteps = 10; // Limit animation steps for better UX

    const animate = () => {
      if (flames.length <= 1 || step >= maxSteps) {
        setCurrentFlames(flames);
        return;
      }

      // Highlight counting
      let countIndex = currentIndex;
      for (let i = 0; i < remainingCount; i++) {
        setHighlightIndex(countIndex);
        countIndex = (countIndex + 1) % flames.length;
      }

      setTimeout(() => {
        const removeIndex = (currentIndex + remainingCount - 1) % flames.length;
        const removedLetter = flames[removeIndex];
        
        setEliminatedLetters(prev => [...prev, removedLetter]);
        flames = flames.filter((_, index) => index !== removeIndex);
        setCurrentFlames([...flames]);
        
        currentIndex = removeIndex % flames.length;
        step++;
        
        if (flames.length > 1 && step < maxSteps) {
          setTimeout(animate, 800);
        }
      }, 600);
    };

    animate();
  };

  return (
    <Card className="bg-white/70 backdrop-blur-sm shadow-xl border-0">
      <CardContent className="p-8">
        <div className="text-center space-y-6">
          <h2 className="text-2xl font-bold text-gray-800">
            FLAMES Calculation
          </h2>
          
          <div className="bg-blue-50 border border-blue-200 rounded-xl p-4">
            <p className="text-sm text-gray-600">Counting by: <span className="font-bold text-blue-600">{remainingCount}</span></p>
          </div>

          <div className="flex justify-center items-center">
            <div className="grid grid-cols-6 gap-4">
              {currentFlames.map((letter, index) => (
                <div
                  key={`${letter}-${index}`}
                  className={`
                    w-16 h-16 rounded-xl border-2 flex items-center justify-center text-2xl font-bold
                    transition-all duration-500 transform
                    ${flamesColors[letter]}
                    ${highlightIndex === index && isCalculating ? 'scale-125 ring-4 ring-yellow-300' : ''}
                    ${eliminatedLetters.includes(letter) ? 'opacity-30 scale-75' : ''}
                  `}
                >
                  {letter}
                </div>
              ))}
            </div>
          </div>

          {isCalculating && (
            <div className="animate-pulse">
              <p className="text-lg text-gray-600">Calculating your destiny...</p>
            </div>
          )}

          {eliminatedLetters.length > 0 && (
            <div className="bg-red-50 border border-red-200 rounded-xl p-4">
              <p className="text-sm text-gray-600">Eliminated:</p>
              <p className="text-lg font-bold text-red-600">
                {eliminatedLetters.join(', ')}
              </p>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default FlamesWheel;
