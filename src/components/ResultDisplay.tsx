
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import SocialShare from './SocialShare';

interface ResultDisplayProps {
  result: string;
  flamesMap: {
    [key: string]: {
      word: string;
      color: string;
      emoji: string;
    };
  };
  name1: string;
  name2: string;
}

const ResultDisplay: React.FC<ResultDisplayProps> = ({
  result,
  flamesMap,
  name1,
  name2
}) => {
  const resultData = flamesMap[result];

  return (
    <Card className="bg-white/70 backdrop-blur-sm shadow-xl border-0">
      <CardContent className="p-8">
        <div className="text-center space-y-8">
          <div className="animate-bounce">
            <h2 className="text-3xl font-bold text-gray-800 mb-4">
              🎉 Your Result! 🎉
            </h2>
          </div>

          <div className="bg-gradient-to-r from-pink-50 to-purple-50 rounded-2xl p-8 border border-pink-200">
            <div className="space-y-4">
              <div className="text-6xl animate-pulse">
                {resultData.emoji}
              </div>
              
              <div className="space-y-2">
                <p className="text-2xl font-bold text-gray-700">
                  {name1} & {name2}
                </p>
                <p className="text-lg text-gray-600">are destined to be</p>
              </div>

              <div className={`text-5xl font-bold ${resultData.color} animate-pulse`}>
                {resultData.word}
              </div>

              <div className="bg-white/60 rounded-xl p-4 mt-6">
                <p className="text-sm text-gray-600 leading-relaxed">
                  {result === 'F' && "You two make amazing friends! Your bond is built on trust, laughter, and shared memories. Friendship like yours is truly special! 👫"}
                  {result === 'L' && "Love is in the air! You two have a romantic connection that's written in the stars. Your hearts beat as one! 💕"}
                  {result === 'A' && "There's a deep affection between you two. This warm, caring relationship brings joy and comfort to both your lives! 💜"}
                  {result === 'M' && "Wedding bells might be ringing! You two are meant for a lifetime together. What a perfect match! 💍"}
                  {result === 'E' && "Opposites attract, but maybe you're TOO opposite! Sometimes conflicts create the strongest bonds... eventually! ⚔️"}
                  {result === 'S' && "You share a sibling-like bond! Whether by blood or by choice, you're family. That's a connection that lasts forever! 👶"}
                </p>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-6 gap-2">
            {['F', 'L', 'A', 'M', 'E', 'S'].map((letter) => (
              <div
                key={letter}
                className={`
                  w-12 h-12 rounded-lg border-2 flex items-center justify-center text-lg font-bold
                  transition-all duration-300
                  ${letter === result 
                    ? 'bg-yellow-200 border-yellow-400 text-yellow-800 scale-125 animate-pulse' 
                    : 'bg-gray-100 border-gray-300 text-gray-500 opacity-50'
                  }
                `}
              >
                {letter}
              </div>
            ))}
          </div>

          <SocialShare
            result={result}
            flamesMap={flamesMap}
            name1={name1}
            name2={name2}
          />
        </div>
      </CardContent>
    </Card>
  );
};

export default ResultDisplay;
