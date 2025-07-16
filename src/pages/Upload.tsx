import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { AdminChannel } from "@/components/AdminChannel";
import { CoinDisplay } from "@/components/CoinDisplay";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowLeft, Upload, ExternalLink, AlertCircle } from "lucide-react";
import { toast } from "@/hooks/use-toast";

const UploadPage = () => {
  const [videoUrl, setVideoUrl] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [coins, setCoins] = useState(0);
  const [hasUsedFreeUpload, setHasUsedFreeUpload] = useState(false);
  const navigate = useNavigate();

  // Load coins and upload status from localStorage
  useEffect(() => {
    const savedCoins = localStorage.getItem('userCoins');
    const usedFreeUpload = localStorage.getItem('hasUsedFreeUpload');
    
    if (savedCoins) {
      setCoins(parseInt(savedCoins, 10));
    }
    if (usedFreeUpload === 'true') {
      setHasUsedFreeUpload(true);
    }
  }, []);

  const extractVideoId = (url: string) => {
    const regex = /(?:youtube\.com\/watch\?v=|youtu\.be\/|youtube\.com\/embed\/)([^&\n?#]+)/;
    const match = url.match(regex);
    return match ? match[1] : null;
  };

  const handleUpload = async (e: React.FormEvent) => {
    e.preventDefault();
    
    const videoId = extractVideoId(videoUrl);
    if (!videoId) {
      toast({
        title: "Invalid URL",
        description: "Please enter a valid YouTube video URL",
        variant: "destructive",
      });
      return;
    }

    if (hasUsedFreeUpload && coins < 5) {
      toast({
        title: "Insufficient coins",
        description: "You need 5 coins to upload a video. Earn coins by watching videos first!",
        variant: "destructive",
      });
      return;
    }

    setIsLoading(true);

    try {
      // Store the uploaded video in localStorage
      const uploadedVideos = JSON.parse(localStorage.getItem('uploadedVideos') || '[]');
      const newVideo = {
        id: Date.now().toString(),
        url: videoUrl,
        videoId: videoId,
        title: `Video ${uploadedVideos.length + 1}`, // We'll enhance this later with API
        uploadedAt: new Date().toISOString(),
        isFirstUpload: !hasUsedFreeUpload
      };
      
      uploadedVideos.push(newVideo);
      localStorage.setItem('uploadedVideos', JSON.stringify(uploadedVideos));
      
      // Handle coin deduction and free upload status
      if (!hasUsedFreeUpload) {
        localStorage.setItem('hasUsedFreeUpload', 'true');
        setHasUsedFreeUpload(true);
      } else {
        const newCoins = coins - 5;
        localStorage.setItem('userCoins', newCoins.toString());
        setCoins(newCoins);
      }

      // Simulate video processing
      setTimeout(() => {
        setIsLoading(false);
        toast({
          title: "Video uploaded successfully!",
          description: !hasUsedFreeUpload ? "Welcome bonus: Your first upload is free!" : "Video added to promotion queue.",
        });
        navigate("/dashboard");
      }, 2000);
    } catch (error) {
      setIsLoading(false);
      toast({
        title: "Upload failed",
        description: "Please try again later",
        variant: "destructive",
      });
    }
  };

  const cost = hasUsedFreeUpload ? 5 : 0;

  return (
    <div className="min-h-screen bg-background">
      <AdminChannel />
      
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-2xl mx-auto">
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
              <CoinDisplay coins={coins} />
            </div>
          </div>

          <Card className="card-hover">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Upload className="w-5 h-5 text-primary" />
                Upload YouTube Video
              </CardTitle>
              <CardDescription>
                {!hasUsedFreeUpload 
                  ? "🎁 Your first upload is FREE! Share your best content." 
                  : `Upload cost: ${cost} coins`
                }
              </CardDescription>
            </CardHeader>
            
            <CardContent>
              <form onSubmit={handleUpload} className="space-y-6">
                <div>
                  <label className="block text-sm font-medium mb-2">
                    YouTube Video URL
                  </label>
                  <Input
                    type="url"
                    value={videoUrl}
                    onChange={(e) => setVideoUrl(e.target.value)}
                    placeholder="https://www.youtube.com/watch?v=..."
                    className="text-base"
                    required
                  />
                  <p className="text-xs text-muted-foreground mt-2">
                    Paste the full YouTube URL of your video
                  </p>
                </div>

                {/* Cost Display */}
                <div className="bg-accent p-4 rounded-lg">
                  <div className="flex items-center justify-between">
                    <span className="font-medium">Upload Cost:</span>
                    <div className="flex items-center gap-2">
                      {!hasUsedFreeUpload ? (
                        <span className="text-success font-bold">FREE</span>
                      ) : (
                        <CoinDisplay coins={cost} />
                      )}
                    </div>
                  </div>
                  
                  {!hasUsedFreeUpload && (
                    <p className="text-sm text-muted-foreground mt-2">
                      ✨ Welcome bonus: Your first video upload is completely free!
                    </p>
                  )}
                </div>

                {/* Warning if insufficient coins */}
                {hasUsedFreeUpload && coins < 5 && (
                  <div className="bg-destructive/10 border border-destructive/20 p-4 rounded-lg">
                    <div className="flex items-center gap-2 text-destructive">
                      <AlertCircle className="w-4 h-4" />
                      <span className="font-medium">Insufficient Coins</span>
                    </div>
                    <p className="text-sm text-destructive/80 mt-1">
                      You need {5 - coins} more coins to upload videos.
                    </p>
                    <Button
                      type="button"
                      onClick={() => navigate("/earn")}
                      variant="outline"
                      size="sm"
                      className="mt-3"
                    >
                      Earn Coins Now
                    </Button>
                  </div>
                )}

                <Button 
                  type="submit" 
                  className="w-full btn-youtube"
                  disabled={isLoading || (hasUsedFreeUpload && coins < 5)}
                >
                  {isLoading ? "Processing..." : !hasUsedFreeUpload ? "Upload Free Video" : `Upload Video (${cost} coins)`}
                </Button>
              </form>

              {/* Upload Benefits */}
              <div className="mt-6 pt-6 border-t">
                <h3 className="font-semibold mb-3">What happens after upload?</h3>
                <div className="space-y-2 text-sm text-muted-foreground">
                  <div className="flex items-center gap-2">
                    <span className="w-2 h-2 bg-success rounded-full"></span>
                    <span>Your video enters the promotion queue</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="w-2 h-2 bg-success rounded-full"></span>
                    <span>Other users can discover and engage with it</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="w-2 h-2 bg-success rounded-full"></span>
                    <span>Track performance in your dashboard</span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Help Section */}
          <Card className="mt-6">
            <CardHeader>
              <CardTitle className="text-lg">Need Help?</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex items-start gap-3">
                <ExternalLink className="w-4 h-4 text-primary mt-0.5" />
                <div>
                  <p className="font-medium">How to get your YouTube URL</p>
                  <p className="text-sm text-muted-foreground">
                    Go to your video on YouTube and copy the URL from your browser
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default UploadPage;