import { useState, useEffect } from "react";
import { AdminChannel } from "@/components/AdminChannel";
import { CoinDisplay } from "@/components/CoinDisplay";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Upload, Play, TrendingUp, Gift, LogOut } from "lucide-react";
import { useNavigate } from "react-router-dom";

const Dashboard = () => {
  const [coins, setCoins] = useState(0);
  const [hasUsedFreeUpload, setHasUsedFreeUpload] = useState(false);
  const navigate = useNavigate();

  // Load coins from localStorage on component mount
  useEffect(() => {
    const savedCoins = localStorage.getItem('userCoins');
    if (savedCoins) {
      setCoins(parseInt(savedCoins, 10));
    }
  }, []);

  const handleLogout = () => {
    navigate("/");
  };

  return (
    <div className="min-h-screen bg-background">
      <AdminChannel />
      
      {/* Header */}
      <div className="bg-card border-b">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold">Welcome back, Creator! 👋</h1>
              <p className="text-muted-foreground">Ready to boost your YouTube channel?</p>
            </div>
            
            <div className="flex items-center gap-4">
              <div className="bg-background p-3 rounded-lg border">
                <CoinDisplay coins={coins} size="lg" />
              </div>
              <Button onClick={handleLogout} variant="outline" size="sm">
                <LogOut className="w-4 h-4 mr-2" />
                Logout
              </Button>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main Actions */}
          <div className="lg:col-span-2 space-y-6">
            {/* Upload Section */}
            <Card className="card-hover">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Upload className="w-5 h-5 text-primary" />
                  Upload Your Video
                </CardTitle>
                <CardDescription>
                  {!hasUsedFreeUpload 
                    ? "🎁 Your first upload is FREE!" 
                    : "Upload costs 5 coins per video"
                  }
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Button 
                  className="w-full btn-youtube"
                  onClick={() => navigate("/upload")}
                >
                  {!hasUsedFreeUpload ? "Upload Free Video" : "Upload Video (5 coins)"}
                </Button>
              </CardContent>
            </Card>

            {/* Earn Coins Section */}
            <Card className="card-hover">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Play className="w-5 h-5 text-success" />
                  Earn Coins
                </CardTitle>
                <CardDescription>
                  Watch, like, and subscribe to other creators' videos to earn coins
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid sm:grid-cols-3 gap-4 mb-4">
                  <div className="text-center p-3 bg-accent rounded-lg">
                    <div className="text-lg font-bold text-success">+5</div>
                    <div className="text-sm">Watch Video</div>
                  </div>
                  <div className="text-center p-3 bg-accent rounded-lg">
                    <div className="text-lg font-bold text-success">+10</div>
                    <div className="text-sm">Subscribe</div>
                  </div>
                  <div className="text-center p-3 bg-accent rounded-lg">
                    <div className="text-lg font-bold text-success">+15</div>
                    <div className="text-sm">Like + Subscribe</div>
                  </div>
                </div>
                <Button 
                  className="w-full btn-success"
                  onClick={() => navigate("/earn")}
                >
                  Start Earning Coins
                </Button>
              </CardContent>
            </Card>

            {/* My Videos Section */}
            <Card className="card-hover">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <TrendingUp className="w-5 h-5 text-primary" />
                  My Videos
                </CardTitle>
                <CardDescription>
                  Track your uploaded videos and their performance
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-center py-8 text-muted-foreground">
                  <Upload className="w-12 h-12 mx-auto mb-4 opacity-50" />
                  <p>No videos uploaded yet</p>
                  <p className="text-sm">Upload your first video to see it here!</p>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Quick Stats */}
            <Card className="card-hover">
              <CardHeader>
                <CardTitle className="text-lg">Quick Stats</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Total Coins:</span>
                  <CoinDisplay coins={coins} />
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Videos Uploaded:</span>
                  <span className="font-semibold">0</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Videos Watched:</span>
                  <span className="font-semibold">0</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Free Uploads Left:</span>
                  <span className="font-semibold text-success">
                    {!hasUsedFreeUpload ? "1" : "0"}
                  </span>
                </div>
              </CardContent>
            </Card>

            {/* Tips */}
            <Card className="youtube-glow">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-lg">
                  <Gift className="w-5 h-5" />
                  Pro Tips
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3 text-sm">
                <div className="flex items-start gap-2">
                  <span className="text-primary">•</span>
                  <span>Upload high-quality videos for better engagement</span>
                </div>
                <div className="flex items-start gap-2">
                  <span className="text-success">•</span>
                  <span>Watch videos completely to earn maximum coins</span>
                </div>
                <div className="flex items-start gap-2">
                  <span className="text-primary">•</span>
                  <span>Engage genuinely with other creators' content</span>
                </div>
                <div className="flex items-start gap-2">
                  <span className="text-success">•</span>
                  <span>Consistent activity leads to better promotion</span>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;