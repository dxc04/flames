
import React, { useEffect, useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';

interface NameDisplayProps {
  name1: string;
  name2: string;
  processedNames: {
    name1: Array<{ letter: string; isCommon: boolean }>;
    name2: Array<{ letter: string; isCommon: boolean }>;
  };
  commonLetters: string[];
  remainingCount: number;
}

const NameDisplay: React.FC<NameDisplayProps> = ({
  name1,
  name2,
  processedNames,
  commonLetters,
  remainingCount
}) => {
  const [showAnimation, setShowAnimation] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowAnimation(true);
    }, 500);
    return () => clearTimeout(timer);
  }, []);

  return (
    <Card className="bg-white/70 backdrop-blur-sm shadow-xl border-0">
      <CardContent className="p-8">
        <div className="text-center space-y-6">
          <h2 className="text-2xl font-bold text-gray-800 mb-6">
            Finding Common Letters...
          </h2>
          
          <div className="space-y-8">
            {/* Name 1 */}
            <div className="space-y-2">
              <p className="text-lg font-semibold text-pink-600">{name1}</p>
              <div className="flex justify-center gap-2 flex-wrap">
                {processedNames.name1.map((letterObj, index) => (
                  <div
                    key={index}
                    className={`relative w-12 h-12 rounded-lg border-2 flex items-center justify-center text-lg font-bold transition-all duration-1000 ${
                      letterObj.isCommon
                        ? 'bg-red-100 border-red-300 text-red-500'
                        : 'bg-pink-100 border-pink-300 text-pink-700'
                    }`}
                  >
                    {letterObj.letter.toUpperCase()}
                    {letterObj.isCommon && showAnimation && (
                      <div className="absolute inset-0 flex items-center justify-center">
                        <div className="w-8 h-0.5 bg-red-500 animate-pulse transform rotate-45"></div>
                        <div className="w-8 h-0.5 bg-red-500 animate-pulse transform -rotate-45 absolute"></div>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>

            {/* Name 2 */}
            <div className="space-y-2">
              <p className="text-lg font-semibold text-purple-600">{name2}</p>
              <div className="flex justify-center gap-2 flex-wrap">
                {processedNames.name2.map((letterObj, index) => (
                  <div
                    key={index}
                    className={`relative w-12 h-12 rounded-lg border-2 flex items-center justify-center text-lg font-bold transition-all duration-1000 ${
                      letterObj.isCommon
                        ? 'bg-red-100 border-red-300 text-red-500'
                        : 'bg-purple-100 border-purple-300 text-purple-700'
                    }`}
                  >
                    {letterObj.letter.toUpperCase()}
                    {letterObj.isCommon && showAnimation && (
                      <div className="absolute inset-0 flex items-center justify-center">
                        <div className="w-8 h-0.5 bg-red-500 animate-pulse transform rotate-45"></div>
                        <div className="w-8 h-0.5 bg-red-500 animate-pulse transform -rotate-45 absolute"></div>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>

          {showAnimation && (
            <div className="space-y-4 animate-fade-in">
              <div className="bg-blue-50 border border-blue-200 rounded-xl p-4">
                <p className="text-sm text-gray-600">Common letters removed:</p>
                <p className="text-lg font-bold text-blue-600">
                  {commonLetters.length > 0 ? commonLetters.join(', ').toUpperCase() : 'None'}
                </p>
              </div>
              <div className="bg-green-50 border border-green-200 rounded-xl p-4">
                <p className="text-sm text-gray-600">Remaining letters count:</p>
                <p className="text-2xl font-bold text-green-600">{remainingCount}</p>
              </div>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default NameDisplay;
