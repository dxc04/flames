
import React from 'react';
import { Button } from '@/components/ui/button';
import { Share2, Twitter, Facebook, Instagram, Copy } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface SocialShareProps {
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

const SocialShare: React.FC<SocialShareProps> = ({
  result,
  flamesMap,
  name1,
  name2
}) => {
  const { toast } = useToast();
  const resultData = flamesMap[result];
  
  const shareText = `🎉 ${name1} & ${name2} are destined to be ${resultData.word}! ${resultData.emoji} Find out your FLAMES result too! #FLAMES #LoveGame #Destiny`;
  const shareUrl = window.location.href;

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(`${shareText}\n${shareUrl}`);
      toast({
        title: "Copied to clipboard!",
        description: "Your result has been copied. You can now paste it anywhere!",
      });
    } catch (err) {
      toast({
        title: "Copy failed",
        description: "Please try again or copy the text manually.",
        variant: "destructive",
      });
    }
  };

  const shareToTwitter = () => {
    const twitterUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(shareText)}`;
    window.open(twitterUrl, '_blank', 'width=550,height=420');
  };

  const shareToFacebook = () => {
    const facebookUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareUrl)}&hashtag=${encodeURIComponent('#FLAMES')}&quote=${encodeURIComponent(shareText)}`;
    window.open(facebookUrl, '_blank', 'width=550,height=420');
  };

  const shareViaWebShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: 'FLAMES Game Result',
          text: shareText,
          url: shareUrl,
        });
      } catch (err) {
        console.log('Share canceled or failed');
      }
    } else {
      copyToClipboard();
    }
  };

  return (
    <div className="bg-white/60 rounded-xl p-6 space-y-4">
      <div className="text-center">
        <h3 className="text-lg font-semibold text-gray-700 mb-2">
          Share Your Result! 🎉
        </h3>
        <p className="text-sm text-gray-600 mb-4">
          Let everyone know about your destiny!
        </p>
      </div>

      <div className="flex flex-wrap gap-3 justify-center">
        {/* Native Web Share (mobile) */}
        <Button
          onClick={shareViaWebShare}
          className="bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 text-white flex items-center gap-2"
          size="sm"
        >
          <Share2 className="w-4 h-4" />
          Share
        </Button>

        {/* Twitter */}
        <Button
          onClick={shareToTwitter}
          className="bg-gradient-to-r from-blue-400 to-blue-600 hover:from-blue-500 hover:to-blue-700 text-white flex items-center gap-2"
          size="sm"
        >
          <Twitter className="w-4 h-4" />
          Twitter
        </Button>

        {/* Facebook */}
        <Button
          onClick={shareToFacebook}
          className="bg-gradient-to-r from-blue-600 to-blue-800 hover:from-blue-700 hover:to-blue-900 text-white flex items-center gap-2"
          size="sm"
        >
          <Facebook className="w-4 h-4" />
          Facebook
        </Button>

        {/* Copy Link */}
        <Button
          onClick={copyToClipboard}
          variant="outline"
          className="border-2 border-gray-300 hover:border-gray-400 text-gray-700 flex items-center gap-2"
          size="sm"
        >
          <Copy className="w-4 h-4" />
          Copy
        </Button>
      </div>

      <div className="text-xs text-gray-500 text-center bg-gray-50 rounded-lg p-3">
        <p className="font-medium mb-1">Preview:</p>
        <p className="italic">"{shareText}"</p>
      </div>
    </div>
  );
};

export default SocialShare;
