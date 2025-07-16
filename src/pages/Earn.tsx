import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { AdminChannel } from "@/components/AdminChannel";
import { CoinDisplay } from "@/components/CoinDisplay";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowLeft, Play, Heart, UserPlus, ExternalLink, Clock } from "lucide-react";
import { toast } from "@/hooks/use-toast";

interface VideoItem {
  id: string;
  title: string;
  thumbnail: string;
  channel: string;
  views: string;
  duration: string;
  url: string;
}

const EarnPage = () => {
  const [coins, setCoins] = useState(0);
  const [watchedVideos, setWatchedVideos] = useState<Set<string>>(new Set());
  const navigate = useNavigate();

  // Sample videos (in real app, this would come from API)
  const videos: VideoItem[] = [
    {
      id: "1",
      title: "Amazing Landscape Photography Tips for Beginners",
      thumbnail: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=320&h=180&fit=crop",
      channel: "PhotoMaster",
      views: "15K views",
      duration: "8:45",
      url: "https://youtube.com/watch?v=sample1"
    },
    {
      id: "2", 
      title: "How to Start Your YouTube Channel in 2024",
      thumbnail: "https://images.unsplash.com/photo-1611162617474-5b21e879e113?w=320&h=180&fit=crop",
      channel: "CreatorHub",
      views: "32K views", 
      duration: "12:30",
      url: "https://youtube.com/watch?v=sample2"
    },
    {
      id: "3",
      title: "Cooking the Perfect Pasta - Italian Secrets",
      thumbnail: "https://images.unsplash.com/photo-1551183053-bf91a1d81141?w=320&h=180&fit=crop",
      channel: "ChefMario",
      views: "8.2K views",
      duration: "6:15", 
      url: "https://youtube.com/watch?v=sample3"
    }
  ];

  const handleWatched = (videoId: string, coinsEarned: number) => {
    if (watchedVideos.has(videoId)) {
      toast({
        title: "Already earned!",
        description: "You've already earned coins from this video",
        variant: "destructive",
      });
      return;
    }

    setWatchedVideos(prev => new Set([...prev, videoId]));
    setCoins(prev => prev + coinsEarned);
    
    toast({
      title: `+${coinsEarned} coins earned!`,
      description: "Great job! Keep watching to earn more coins.",
    });
  };

  const isVideoWatched = (videoId: string) => watchedVideos.has(videoId);

  return (
    <div className="min-h-screen bg-background">
      <AdminChannel />
      
      <div className="container mx-auto px-4 py-8">
        <div className="flex items-center justify-between mb-6">
          <Button
            onClick={() => navigate("/dashboard")}
            variant="outline"
            className="flex items-center gap-2"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Dashboard
          </Button>
          
          <div className="bg-card p-3 rounded-lg border">
            <CoinDisplay coins={coins} size="lg" />
          </div>
        </div>

        {/* Instructions */}
        <Card className="mb-6 youtube-glow">
          <CardHeader>
            <CardTitle>💰 How to Earn Coins</CardTitle>
            <CardDescription>
              Watch videos and engage with content to earn coins for promoting your own videos
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid sm:grid-cols-3 gap-4">
              <div className="text-center p-4 bg-accent rounded-lg">
                <Play className="w-8 h-8 text-primary mx-auto mb-2" />
                <div className="font-bold text-success text-lg">+5 Coins</div>
                <div className="text-sm">Watch Complete Video</div>
              </div>
              <div className="text-center p-4 bg-accent rounded-lg">
                <UserPlus className="w-8 h-8 text-primary mx-auto mb-2" />
                <div className="font-bold text-success text-lg">+10 Coins</div>
                <div className="text-sm">Subscribe to Channel</div>
              </div>
              <div className="text-center p-4 bg-accent rounded-lg">
                <Heart className="w-8 h-8 text-primary mx-auto mb-2" />
                <div className="font-bold text-success text-lg">+15 Coins</div>
                <div className="text-sm">Like + Subscribe</div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Videos List */}
        <div className="space-y-4">
          <h2 className="text-2xl font-bold">Available Videos</h2>
          
          {videos.map((video) => (
            <Card key={video.id} className="card-hover">
              <CardContent className="p-6">
                <div className="flex gap-4">
                  {/* Thumbnail */}
                  <div className="relative flex-shrink-0">
                    <img 
                      src={video.thumbnail}
                      alt={video.title}
                      className="w-40 h-24 object-cover rounded-lg"
                    />
                    <div className="absolute bottom-1 right-1 bg-black/80 text-white text-xs px-1 rounded">
                      {video.duration}
                    </div>
                  </div>
                  
                  {/* Video Info */}
                  <div className="flex-1 min-w-0">
                    <h3 className="font-semibold text-lg mb-2 line-clamp-2">
                      {video.title}
                    </h3>
                    <div className="text-sm text-muted-foreground mb-4">
                      <div>{video.channel}</div>
                      <div className="flex items-center gap-2">
                        <span>{video.views}</span>
                        <span>•</span>
                        <Clock className="w-3 h-3" />
                        <span>{video.duration}</span>
                      </div>
                    </div>
                    
                    {/* Action Buttons */}
                    <div className="flex flex-wrap gap-2">
                      <Button
                        onClick={() => handleWatched(video.id, 5)}
                        disabled={isVideoWatched(video.id)}
                        size="sm"
                        className="btn-success"
                      >
                        {isVideoWatched(video.id) ? "✓ Watched (+5)" : "Watch (+5 coins)"}
                      </Button>
                      
                      <Button
                        onClick={() => handleWatched(video.id, 10)}
                        disabled={isVideoWatched(video.id)}
                        size="sm"
                        variant="outline"
                      >
                        {isVideoWatched(video.id) ? "✓ Subscribed (+10)" : "Subscribe (+10 coins)"}
                      </Button>
                      
                      <Button
                        onClick={() => handleWatched(video.id, 15)}
                        disabled={isVideoWatched(video.id)}
                        size="sm"
                        variant="outline"
                      >
                        {isVideoWatched(video.id) ? "✓ Liked & Subscribed (+15)" : "Like & Subscribe (+15 coins)"}
                      </Button>
                      
                      <Button
                        onClick={() => window.open(video.url, "_blank")}
                        size="sm"
                        variant="ghost"
                      >
                        <ExternalLink className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Tips */}
        <Card className="mt-8">
          <CardHeader>
            <CardTitle className="text-lg">💡 Pro Tips</CardTitle>
          </CardHeader>
          <CardContent className="space-y-2 text-sm">
            <div className="flex items-start gap-2">
              <span className="text-primary">•</span>
              <span>Actually watch the videos to support fellow creators</span>
            </div>
            <div className="flex items-start gap-2">
              <span className="text-success">•</span>
              <span>Genuine engagement helps build a stronger community</span>
            </div>
            <div className="flex items-start gap-2">
              <span className="text-primary">•</span>
              <span>You can only earn coins once per video</span>
            </div>
            <div className="flex items-start gap-2">
              <span className="text-success">•</span>
              <span>Check back daily for new videos to earn from</span>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default EarnPage;