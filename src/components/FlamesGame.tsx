
import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent } from '@/components/ui/card';
import { Heart, Sparkles } from 'lucide-react';
import NameDisplay from './NameDisplay';
import FlamesWheel from './FlamesWheel';
import ResultDisplay from './ResultDisplay';
import { useSearchParams, useNavigate } from "react-router-dom";
import { set } from 'date-fns';

const FlamesGame = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [name1, setName1] = useState(searchParams.get('name1') || '');
  const [name2, setName2] = useState(searchParams.get('name2') || '');
  const [gameState, setGameState] = useState('input'); // 'input', 'calculating', 'result'
  const [processedNames, setProcessedNames] = useState({ name1: [], name2: [] });
  const [commonLetters, setCommonLetters] = useState([]);
  const [remainingCount, setRemainingCount] = useState(0);
  const [result, setResult] = useState('');

  const flamesMap = {
    F: { word: 'Friends', color: 'text-pink-500', emoji: '👫' },
    L: { word: 'Lovers', color: 'text-red-500', emoji: '💕' },
    A: { word: 'Affection', color: 'text-purple-500', emoji: '💜' },
    M: { word: 'Marriage', color: 'text-blue-500', emoji: '💍' },
    E: { word: 'Enemies', color: 'text-gray-500', emoji: '⚔️' },
    S: { word: 'Siblings', color: 'text-green-500', emoji: '👶' }
  };

  const calculateBtnRef = React.useRef(null);

  const calculateFlames = () => {
    if (!name1.trim() || !name2.trim()) return;

    setGameState('calculating');

    // Process names and find common letters
    const processedName1 = name1.toLowerCase().replace(/[^a-z]/g, '').split('');
    const processedName2 = name2.toLowerCase().replace(/[^a-z]/g, '').split('');
    
    const name1Letters = [...processedName1];
    const name2Letters = [...processedName2];
    const common = [];

    // Find and mark common letters
    for (let i = 0; i < name1Letters.length; i++) {
      for (let j = 0; j < name2Letters.length; j++) {
        if (name1Letters[i] === name2Letters[j] && name1Letters[i] !== null && name2Letters[j] !== null) {
          common.push(name1Letters[i]);
          name1Letters[i] = null;
          name2Letters[j] = null;
          break;
        }
      }
    }

    // Count remaining letters
    const remaining = name1Letters.filter(l => l !== null).length + name2Letters.filter(l => l !== null).length;

    setProcessedNames({
      name1: processedName1.map((letter, index) => ({
        letter,
        isCommon: name1Letters[index] === null
      })),
      name2: processedName2.map((letter, index) => ({
        letter,
        isCommon: name2Letters[index] === null
      }))
    });
    setCommonLetters(common);
    setRemainingCount(remaining);

    // Calculate FLAMES result
    const flames = ['F', 'L', 'A', 'M', 'E', 'S'];
    let currentFlames = [...flames];
    let currentIndex = 0;

    while (currentFlames.length > 1) {
      const removeIndex = (currentIndex + remaining - 1) % currentFlames.length;
      currentFlames.splice(removeIndex, 1);
      currentIndex = removeIndex % currentFlames.length;
    }

    setTimeout(() => {
      setResult(currentFlames[0]);
      setGameState('result');
      setSearchParams({ name1, name2 }); // Update URL with names
    }, 3000);
  };

  const resetGame = () => {
    setName1('');
    setName2('');
    setGameState('input');
    setProcessedNames({ name1: [], name2: [] });
    setCommonLetters([]);
    setRemainingCount(0);
    setResult('');
  };

  let navigate = useNavigate(); 
  const redirectReset = () =>{ 
    window.location.href = '/'
  }

  useEffect(() => {  
    if (name1 != '' && name2 != '' && calculateBtnRef.current) {
      calculateBtnRef.current.click();
    }
  }, []);

  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      {/* Header */}
      <div className="text-center mb-8">
        <div className="flex items-center justify-center gap-2 mb-4">
          <Heart className="text-pink-500 w-8 h-8" />
          <h1 className="text-5xl font-bold bg-gradient-to-r from-pink-500 via-purple-500 to-blue-500 bg-clip-text text-transparent">
            FLAMES
          </h1>
          <Sparkles className="text-purple-500 w-8 h-8" />
        </div>
        <p className="text-lg text-gray-600 font-medium">
          Discover your relationship destiny!
        </p>
        <p className="text-sm text-gray-500 mt-2">
          Friends • Lovers • Affection • Marriage • Enemies • Siblings
        </p>
      </div>

      {gameState === 'input' && (
        <Card className="bg-white/70 backdrop-blur-sm shadow-xl border-0 mb-8">
          <CardContent className="p-8">
            <div className="space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-sm font-semibold text-gray-700">First Name</label>
                  <Input
                    value={name1}
                    onChange={(e) => setName1(e.target.value)}
                    placeholder="Enter first name..."
                    className="bg-white/80 border-pink-200 focus:border-pink-400 text-lg py-3 rounded-2xl"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-semibold text-gray-700">Second Name</label>
                  <Input
                    value={name2}
                    onChange={(e) => setName2(e.target.value)}
                    placeholder="Enter second name..."
                    className="bg-white/80 border-purple-200 focus:border-purple-400 text-lg py-3 rounded-2xl"
                  />
                </div>
              </div>
              <Button
                ref={calculateBtnRef}
                onClick={calculateFlames}
                disabled={!name1.trim() || !name2.trim()}
                className="w-full bg-gradient-to-r from-pink-500 to-purple-500 hover:from-pink-600 hover:to-purple-600 text-white py-4 text-lg font-semibold rounded-2xl transition-all duration-300 transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
              >
                ✨ Calculate FLAMES ✨
              </Button>
            </div>
          </CardContent>
        </Card>
      )}

      {gameState === 'calculating' && (
        <div className="space-y-8">
          <NameDisplay
            name1={name1}
            name2={name2}
            processedNames={processedNames}
            commonLetters={commonLetters}
            remainingCount={remainingCount}
          />
          <FlamesWheel remainingCount={remainingCount} />
        </div>
      )}

      {gameState === 'result' && (
        <div className="space-y-8">
          <ResultDisplay
            result={result}
            flamesMap={flamesMap}
            name1={name1}
            name2={name2}
          />
          <div className="text-center">
            <Button
              onClick={redirectReset}
              className="bg-gradient-to-r from-blue-500 to-green-500 hover:from-blue-600 hover:to-green-600 text-white px-8 py-3 text-lg font-semibold rounded-2xl transition-all duration-300 transform hover:scale-105"
            >
              🎮 Play Again
            </Button>
          </div>
        </div>
      )}
    </div>
  );
};

export default FlamesGame;
