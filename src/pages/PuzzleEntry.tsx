import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { AdminChannel } from "@/components/AdminChannel";
import { PuzzleCard } from "@/components/PuzzleCard";
import { Button } from "@/components/ui/button";
import { PlayCircle, Star, TrendingUp } from "lucide-react";
import heroImage from "@/assets/hero-image.jpg";

const PuzzleEntry = () => {
  const [puzzleSolved, setPuzzleSolved] = useState(false);
  const navigate = useNavigate();

  const handlePuzzleSuccess = () => {
    setPuzzleSolved(true);
  };

  const handleLogin = () => {
    navigate("/login");
  };

  return (
    <div className="min-h-screen bg-background">
      <AdminChannel />
      
      <div className="container mx-auto px-4 py-12">
        {/* Hero Section */}
        <div className="text-center mb-12">
          <div className="mb-8">
            <img 
              src={heroImage} 
              alt="Bharat Boost Hub - YouTube Video Promotion Platform"
              className="w-full max-w-4xl mx-auto rounded-2xl shadow-lg"
            />
          </div>
          <h1 className="text-5xl font-bold mb-4 bg-gradient-to-r from-primary to-primary-glow bg-clip-text text-transparent">
            Bharat Boost Hub
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            The ultimate platform to promote your YouTube videos, earn coins by engaging with content, and grow your channel organically.
          </p>
        </div>

        {/* Features Preview */}
        <div className="grid md:grid-cols-3 gap-6 mb-12">
          <div className="card-hover p-6 rounded-xl text-center">
            <PlayCircle className="w-12 h-12 text-primary mx-auto mb-4" />
            <h3 className="font-semibold mb-2">Upload & Promote</h3>
            <p className="text-sm text-muted-foreground">
              Upload your YouTube videos and promote them to targeted audiences
            </p>
          </div>
          
          <div className="card-hover p-6 rounded-xl text-center">
            <Star className="w-12 h-12 text-yellow-500 mx-auto mb-4" />
            <h3 className="font-semibold mb-2">Earn Coins</h3>
            <p className="text-sm text-muted-foreground">
              Watch, like, and subscribe to earn coins for promoting your content
            </p>
          </div>
          
          <div className="card-hover p-6 rounded-xl text-center">
            <TrendingUp className="w-12 h-12 text-success mx-auto mb-4" />
            <h3 className="font-semibold mb-2">Grow Your Channel</h3>
            <p className="text-sm text-muted-foreground">
              Get real engagement and grow your YouTube subscriber base
            </p>
          </div>
        </div>

        {/* Main Content */}
        <div className="flex flex-col items-center justify-center space-y-8">
          {!puzzleSolved ? (
            <PuzzleCard onSuccess={handlePuzzleSuccess} />
          ) : (
            <div className="card-hover p-8 rounded-2xl max-w-md w-full text-center">
              <div className="text-6xl mb-4">🎉</div>
              <h2 className="text-2xl font-bold mb-4">Puzzle Solved!</h2>
              <p className="text-muted-foreground mb-6">
                Great! You've proven you're human. Now login to access your dashboard and start promoting your YouTube videos.
              </p>
              <Button onClick={handleLogin} className="w-full btn-youtube">
                Continue to Login
              </Button>
            </div>
          )}
        </div>

        {/* Bottom Info */}
        <div className="mt-16 text-center">
          <p className="text-sm text-muted-foreground">
            Join thousands of creators already growing their channels on Bharat Boost Hub
          </p>
        </div>
      </div>
    </div>
  );
};

export default PuzzleEntry;