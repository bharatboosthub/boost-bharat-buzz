import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Clock, ExternalLink, Eye, Timer } from "lucide-react";
import { toast } from "@/hooks/use-toast";
import { ScreenshotVerification } from "./ScreenshotVerification";

interface VideoPlayerProps {
  videoId: string;
  title: string;
  isOpen: boolean;
  onClose: () => void;
  onVideoComplete: (coins: number) => void;
}

export const VideoPlayer = ({ videoId, title, isOpen, onClose, onVideoComplete }: VideoPlayerProps) => {
  const [watchStartTime, setWatchStartTime] = useState<number | null>(null);
  const [timeAway, setTimeAway] = useState(0);
  const [isEligibleForCoins, setIsEligibleForCoins] = useState(false);
  const [showVerification, setShowVerification] = useState(false);
  const [hasClaimedViewCoins, setHasClaimedViewCoins] = useState(false);

  useEffect(() => {
    if (!isOpen) return;

    setWatchStartTime(Date.now());
    setTimeAway(0);
    setIsEligibleForCoins(false);
    setShowVerification(false);
    setHasClaimedViewCoins(false);

    // Open YouTube video in new tab with autoplay
    const youtubeUrl = `https://www.youtube.com/watch?v=${videoId}&autoplay=1`;
    window.open(youtubeUrl, '_blank');

    const handleWindowBlur = () => {
      if (watchStartTime) {
        const awayTime = Date.now() - watchStartTime;
        setTimeAway(awayTime);
      }
    };

    const handleWindowFocus = () => {
      if (timeAway >= 180000) { // 3 minutes = 180,000ms
        setIsEligibleForCoins(true);
        toast({
          title: "Great! You watched for 3+ minutes",
          description: "You can now claim your viewing coins and upload a screenshot for bonus coins!",
        });
      } else {
        const remainingTime = Math.ceil((180000 - timeAway) / 1000);
        toast({
          title: "Keep watching!",
          description: `You need ${remainingTime} more seconds to earn coins.`,
          variant: "destructive",
        });
      }
    };

    window.addEventListener('blur', handleWindowBlur);
    window.addEventListener('focus', handleWindowFocus);

    return () => {
      window.removeEventListener('blur', handleWindowBlur);
      window.removeEventListener('focus', handleWindowFocus);
    };
  }, [isOpen, watchStartTime, timeAway, videoId]);

  const handleClaimViewCoins = () => {
    if (!isEligibleForCoins || hasClaimedViewCoins) return;
    
    setHasClaimedViewCoins(true);
    onVideoComplete(5); // 5 coins for watching
    
    toast({
      title: "+5 coins earned!",
      description: "Upload a screenshot showing like/subscribe for bonus coins!",
    });
  };

  const handleVerificationComplete = (result: { liked: boolean; subscribed: boolean; coins: number }) => {
    setShowVerification(false);
    
    if (result.coins > 0) {
      onVideoComplete(result.coins);
      
      const actions = [];
      if (result.liked) actions.push("liked");
      if (result.subscribed) actions.push("subscribed");
      
      toast({
        title: `+${result.coins} bonus coins earned!`,
        description: `Screenshot verified: ${actions.join(" and ")} detected!`,
      });
    } else {
      toast({
        title: "No actions detected",
        description: "We couldn't detect like/subscribe actions in your screenshot. Try again with a clearer image.",
        variant: "destructive",
      });
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
      <div className="bg-background rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        {showVerification ? (
          <div className="p-6">
            <ScreenshotVerification
              videoId={videoId}
              onVerificationComplete={handleVerificationComplete}
              onCancel={() => setShowVerification(false)}
            />
          </div>
        ) : (
          <Card className="border-0 shadow-none">
            <CardHeader>
              <CardTitle className="flex items-center justify-between">
                <span className="truncate">{title}</span>
                <Button variant="ghost" size="sm" onClick={onClose}>
                  ×
                </Button>
              </CardTitle>
              <CardDescription>
                Watch the video on YouTube for at least 3 minutes to earn coins
              </CardDescription>
            </CardHeader>
            
            <CardContent className="space-y-6">
              {/* Instructions */}
              <div className="bg-blue-50 dark:bg-blue-950/20 p-4 rounded-lg border border-blue-200 dark:border-blue-800">
                <div className="flex items-center gap-2 mb-2">
                  <Eye className="w-4 h-4 text-blue-600" />
                  <span className="font-medium text-blue-900 dark:text-blue-100">
                    Video opened in new tab
                  </span>
                </div>
                <p className="text-sm text-blue-800 dark:text-blue-200">
                  The video has been opened in YouTube. Watch for at least 3 minutes, then return here to claim your coins!
                </p>
              </div>

              {/* Timer Status */}
              <div className="space-y-4">
                <div className="flex items-center justify-between p-4 bg-accent rounded-lg">
                  <div className="flex items-center gap-2">
                    <Timer className="w-5 h-5" />
                    <span className="font-medium">Watch Progress</span>
                  </div>
                  <div className="text-right">
                    <div className="font-bold text-lg">
                      {Math.floor(timeAway / 1000)}s / 180s
                    </div>
                    <div className="text-sm text-muted-foreground">
                      {isEligibleForCoins ? "Ready to claim!" : "Keep watching..."}
                    </div>
                  </div>
                </div>

                {/* Coin Rewards */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div className="text-center p-4 bg-accent rounded-lg">
                    <Clock className="w-6 h-6 mx-auto mb-2 text-primary" />
                    <div className="font-bold text-success text-lg">+5 Coins</div>
                    <div className="text-sm">3+ Minutes Watch</div>
                  </div>
                  <div className="text-center p-4 bg-accent rounded-lg">
                    <div className="text-2xl mb-2">👍</div>
                    <div className="font-bold text-success text-lg">+10 Coins</div>
                    <div className="text-sm">Like Video</div>
                  </div>
                  <div className="text-center p-4 bg-accent rounded-lg">
                    <div className="text-2xl mb-2">🔔</div>
                    <div className="font-bold text-success text-lg">+15 Coins</div>
                    <div className="text-sm">Like + Subscribe</div>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="space-y-3">
                <Button
                  onClick={handleClaimViewCoins}
                  disabled={!isEligibleForCoins || hasClaimedViewCoins}
                  className="w-full"
                  size="lg"
                >
                  {hasClaimedViewCoins 
                    ? "✓ View Coins Claimed (+5)" 
                    : isEligibleForCoins 
                      ? "Claim View Coins (+5)" 
                      : "Watch 3+ Minutes to Claim"
                  }
                </Button>

                <Button
                  onClick={() => setShowVerification(true)}
                  disabled={!hasClaimedViewCoins}
                  variant="outline"
                  className="w-full"
                  size="lg"
                >
                  Upload Screenshot for Bonus Coins
                </Button>

                <Button
                  onClick={() => window.open(`https://www.youtube.com/watch?v=${videoId}`, '_blank')}
                  variant="ghost"
                  className="w-full"
                  size="sm"
                >
                  <ExternalLink className="w-4 h-4 mr-2" />
                  Open Video Again
                </Button>
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
};