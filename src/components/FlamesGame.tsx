
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
    
    <div className="container mx-auto px-4 py-8 max-w-5xl">
      {/* Header */}
      <div className="text-center mb-12">
          <h1 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-pink-600 via-purple-600 to-indigo-600 bg-clip-text text-transparent mb-6">
              Discover Your Future: The Ultimate Online FLAMES Calculator!
          </h1>
          <p className="text-lg text-gray-700 max-w-4xl mx-auto leading-relaxed mb-4">
              Remember whispering a crush's name, scribbling on the back of a notebook, and anxiously counting letters to predict your destiny? That classic pen-and-paper game, FLAMES, was a rite of passage for all of us.
          </p>
          <p className="text-lg text-gray-700 max-w-4xl mx-auto leading-relaxed mb-4">
              Well, the nostalgia is back, but the pen and paper are retired! Right here at dxrspace.com, we've brought the legendary fortune-telling game into the digital age. Forget the manual counting; our FLAMES calculator does the work for you in an instant.
          </p>
          <p className="text-xl font-semibold text-purple-600 mt-6">
              Ready to find out if you're destined to be Friends, Lovers, or sworn Enemies?
          </p>
      </div>

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

      {/* How It Works Section */}
        <div className="mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-center text-gray-800 mb-12">
                How Does It Work? The Magic Behind the Game
            </h2>
            <p className="text-lg text-gray-700 text-center max-w-4xl mx-auto mb-12">
                Our calculator isn't just random—it follows the exact, time-honored rules of the classic FLAMES game. Here's a peek at the logic working behind the scenes when you enter two names.
            </p>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                <div className="bg-white/60 backdrop-blur-sm rounded-2xl p-6 text-center shadow-lg">
                    <div className="w-12 h-12 bg-blue-500 text-white rounded-full flex items-center justify-center text-xl font-bold mx-auto mb-4">1</div>
                    <h3 className="text-xl font-bold text-gray-800 mb-3">The Names Are Entered</h3>
                    <p className="text-gray-600">It all starts with two names. The calculator takes both full names to begin the process.</p>
                </div>

                <div className="bg-white/60 backdrop-blur-sm rounded-2xl p-6 text-center shadow-lg">
                    <div className="w-12 h-12 bg-green-500 text-white rounded-full flex items-center justify-center text-xl font-bold mx-auto mb-4">2</div>
                    <h3 className="text-xl font-bold text-gray-800 mb-3">The Digital Cancellation</h3>
                    <p className="text-gray-600">In a split second, our algorithm compares the two names and removes all the common letters.</p>
                </div>

                <div className="bg-white/60 backdrop-blur-sm rounded-2xl p-6 text-center shadow-lg">
                    <div className="w-12 h-12 bg-purple-500 text-white rounded-full flex items-center justify-center text-xl font-bold mx-auto mb-4">3</div>
                    <h3 className="text-xl font-bold text-gray-800 mb-3">Finding the Magic Number</h3>
                    <p className="text-gray-600">The calculator then counts the total number of letters left over. This becomes your "Magic Number."</p>
                </div>

                <div className="bg-white/60 backdrop-blur-sm rounded-2xl p-6 text-center shadow-lg">
                    <div className="w-12 h-12 bg-red-500 text-white rounded-full flex items-center justify-center text-xl font-bold mx-auto mb-4">4</div>
                    <h3 className="text-xl font-bold text-gray-800 mb-3">The FLAMES Countdown</h3>
                    <p className="text-gray-600">Finally, the calculator uses your Magic Number to perform the countdown on F-L-A-M-E-S until one letter remains!</p>
                </div>
            </div>

            <div className="bg-gradient-to-r from-blue-50 to-purple-50 p-6 rounded-2xl">
                <h4 className="text-xl font-bold text-gray-800 mb-3">Example: ALEXANDER and CATHERINE</h4>
                <p className="text-gray-700 mb-2"><strong>Step 2:</strong> Common letters A, E, and R are removed.</p>
                <p className="text-gray-700"><strong>Step 3:</strong> 8 letters remain, so N=8 becomes our Magic Number.</p>
            </div>
        </div>

        {/* Advertisement Section */}
        <div className="max-w-2xl mx-auto mb-12">
            <div className="bg-gray-100 border-2 border-dashed border-gray-300 rounded-lg p-4 text-center text-gray-500">

                <p className="text-sm">Advertisement Space</p>
                <p className="text-xs mt-1">300x250 or responsive ad unit</p>
            </div>
        </div>

        {/* FAQ Section */}
        <div className="mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-center text-gray-800 mb-12">
                Frequently Asked Questions
            </h2>
            <div className="max-w-4xl mx-auto space-y-6">
                <div className="bg-white/70 backdrop-blur-sm rounded-2xl p-6 shadow-lg">
                    <h3 className="text-xl font-bold text-gray-800 mb-3">What is FLAMES?</h3>
                    <p className="text-gray-600">FLAMES is a popular relationship compatibility game that uses a mathematical algorithm to determine the relationship between two people based on their names. It stands for Friends, Lovers, Affection, Marriage, Enemies, and Siblings.</p>
                </div>
                
                <div className="bg-white/70 backdrop-blur-sm rounded-2xl p-6 shadow-lg">
                    <h3 className="text-xl font-bold text-gray-800 mb-3">How accurate is the FLAMES calculator?</h3>
                    <p className="text-gray-600">The FLAMES calculator is designed for entertainment purposes only. It's a fun game based on mathematical calculations using names, but it should not be considered a serious method for determining relationship compatibility.</p>
                </div>
                
                <div className="bg-white/70 backdrop-blur-sm rounded-2xl p-6 shadow-lg">
                    <h3 className="text-xl font-bold text-gray-800 mb-3">Can I use nicknames or full names?</h3>
                    <p className="text-gray-600">You can use either nicknames or full names. However, keep in mind that different name variations may produce different results since the algorithm is based on the specific letters in the names you enter.</p>
                </div>
                
                <div className="bg-white/70 backdrop-blur-sm rounded-2xl p-6 shadow-lg">
                    <h3 className="text-xl font-bold text-gray-800 mb-3">Is my data stored or shared?</h3>
                    <p className="text-gray-600">No, all calculations are performed locally in your browser. The names you enter are not stored, transmitted, or shared with any third parties. Your privacy is completely protected.</p>
                </div>
            </div>
        </div>

        {/* Share Section */}
        <div className="bg-gradient-to-r from-pink-500 to-purple-600 text-white p-8 rounded-3xl text-center mb-12">
            <h3 className="text-2xl md:text-3xl font-bold mb-4">Enjoyed the FLAMES Calculator?</h3>
            <p className="text-lg mb-4">Whether your result was surprising or expected, remember that this is all in good fun! Real relationships are built on communication, trust, and mutual respect.</p>
            <p className="text-xl font-semibold mb-6">Share this calculator with your friends and see what their results reveal!</p>
            <div className="flex flex-wrap justify-center gap-2">
                <span className="bg-white/20 px-4 py-2 rounded-full text-sm">#FLAMESCalculator</span>
                <span className="bg-white/20 px-4 py-2 rounded-full text-sm">#dxrspace</span>
                <span className="bg-white/20 px-4 py-2 rounded-full text-sm">#RelationshipCompatibility</span>
            </div>
        </div>

    </div>
  );
};

export default FlamesGame;
