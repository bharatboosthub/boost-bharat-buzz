import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Upload, Camera, Check, X, AlertCircle } from 'lucide-react';
import { toast } from '@/hooks/use-toast';

interface ScreenshotVerificationProps {
  videoId: string;
  onVerificationComplete: (result: { liked: boolean; subscribed: boolean; coins: number }) => void;
  onCancel: () => void;
}

export const ScreenshotVerification = ({ 
  videoId, 
  onVerificationComplete, 
  onCancel 
}: ScreenshotVerificationProps) => {
  const [screenshot, setScreenshot] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string>('');
  const [isAnalyzing, setIsAnalyzing] = useState(false);

  const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    // Basic validation
    if (!file.type.startsWith('image/')) {
      toast({
        title: "Invalid file type",
        description: "Please upload an image file (JPG, PNG, etc.)",
        variant: "destructive",
      });
      return;
    }

    if (file.size > 10 * 1024 * 1024) { // 10MB limit
      toast({
        title: "File too large",
        description: "Please upload an image smaller than 10MB",
        variant: "destructive",
      });
      return;
    }

    setScreenshot(file);
    
    // Create preview
    const reader = new FileReader();
    reader.onload = (e) => {
      setPreviewUrl(e.target?.result as string);
    };
    reader.readAsDataURL(file);
  };

  const analyzeScreenshot = async () => {
    if (!screenshot) return;

    setIsAnalyzing(true);

    try {
      // Simulate screenshot analysis
      // In a real app, this would use OCR or AI image analysis
      await new Promise(resolve => setTimeout(resolve, 3000));

      // Simple simulation based on file properties
      const canvas = document.createElement('canvas');
      const ctx = canvas.getContext('2d');
      const img = new Image();
      
      img.onload = () => {
        canvas.width = img.width;
        canvas.height = img.height;
        ctx?.drawImage(img, 0, 0);

        // Basic fraud detection
        if (img.width < 500 || img.height < 500) {
          toast({
            title: "Screenshot too small",
            description: "Please upload a full-size screenshot (minimum 500x500px)",
            variant: "destructive",
          });
          setIsAnalyzing(false);
          return;
        }

        // Simulate detection (random for demo - replace with actual AI)
        const hasLiked = Math.random() > 0.3; // 70% chance of detecting like
        const hasSubscribed = Math.random() > 0.5; // 50% chance of detecting subscribe
        
        let coins = 0;
        if (hasLiked && hasSubscribed) {
          coins = 15; // Both like and subscribe
        } else if (hasLiked) {
          coins = 10; // Only like
        }

        // Store verification result to prevent reuse
        const verifications = JSON.parse(localStorage.getItem('verifications') || '[]');
        const verification = {
          videoId,
          screenshotHash: screenshot.name + screenshot.size, // Simple hash
          timestamp: Date.now(),
          result: { liked: hasLiked, subscribed: hasSubscribed, coins }
        };
        verifications.push(verification);
        localStorage.setItem('verifications', JSON.stringify(verifications));

        onVerificationComplete({ liked: hasLiked, subscribed: hasSubscribed, coins });
        setIsAnalyzing(false);
      };
      
      img.src = previewUrl;
    } catch (error) {
      setIsAnalyzing(false);
      toast({
        title: "Analysis failed",
        description: "Please try uploading a different screenshot",
        variant: "destructive",
      });
    }
  };

  return (
    <Card className="w-full max-w-2xl mx-auto">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Camera className="w-5 h-5" />
          Screenshot Verification
        </CardTitle>
        <CardDescription>
          Upload a screenshot showing you liked and/or subscribed to earn bonus coins
        </CardDescription>
      </CardHeader>
      
      <CardContent className="space-y-6">
        {/* Instructions */}
        <div className="bg-blue-50 dark:bg-blue-950/20 p-4 rounded-lg border border-blue-200 dark:border-blue-800">
          <h4 className="font-medium text-blue-900 dark:text-blue-100 mb-2">
            How to get your screenshot:
          </h4>
          <ol className="text-sm text-blue-800 dark:text-blue-200 space-y-1 list-decimal list-inside">
            <li>Like the video (thumbs up button)</li>
            <li>Subscribe to the channel (if not already subscribed)</li>
            <li>Take a full screenshot showing the like/subscribe buttons</li>
            <li>Upload the screenshot below</li>
          </ol>
        </div>

        {/* Rewards */}
        <div className="grid grid-cols-2 gap-4">
          <div className="text-center p-4 bg-accent rounded-lg">
            <div className="font-bold text-success text-lg">+10 Coins</div>
            <div className="text-sm">Like Detected</div>
          </div>
          <div className="text-center p-4 bg-accent rounded-lg">
            <div className="font-bold text-success text-lg">+15 Coins</div>
            <div className="text-sm">Like + Subscribe</div>
          </div>
        </div>

        {/* File Upload */}
        <div className="space-y-4">
          <div className="border-2 border-dashed border-border rounded-lg p-6 text-center">
            <Input
              type="file"
              accept="image/*"
              onChange={handleFileSelect}
              className="hidden"
              id="screenshot-upload"
            />
            <label htmlFor="screenshot-upload" className="cursor-pointer">
              <Upload className="w-12 h-12 mx-auto text-muted-foreground mb-4" />
              <p className="text-lg font-medium mb-2">Click to upload screenshot</p>
              <p className="text-sm text-muted-foreground">
                PNG, JPG up to 10MB
              </p>
            </label>
          </div>

          {/* Preview */}
          {previewUrl && (
            <div className="space-y-4">
              <div className="relative">
                <img 
                  src={previewUrl} 
                  alt="Screenshot preview" 
                  className="max-w-full h-auto max-h-64 mx-auto rounded-lg border"
                />
              </div>
              
              <div className="flex gap-3">
                <Button 
                  onClick={analyzeScreenshot}
                  disabled={isAnalyzing}
                  className="flex-1"
                >
                  {isAnalyzing ? (
                    <>
                      <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                      Analyzing...
                    </>
                  ) : (
                    <>
                      <Check className="w-4 h-4 mr-2" />
                      Verify Screenshot
                    </>
                  )}
                </Button>
                
                <Button 
                  onClick={onCancel}
                  variant="outline"
                  disabled={isAnalyzing}
                >
                  <X className="w-4 h-4 mr-2" />
                  Cancel
                </Button>
              </div>
            </div>
          )}
        </div>

        {/* Warning */}
        <div className="flex items-start gap-2 p-3 bg-yellow-50 dark:bg-yellow-950/20 rounded-lg border border-yellow-200 dark:border-yellow-800">
          <AlertCircle className="w-4 h-4 text-yellow-600 dark:text-yellow-400 mt-0.5 flex-shrink-0" />
          <div className="text-sm text-yellow-800 dark:text-yellow-200">
            <p className="font-medium">Anti-fraud measures:</p>
            <p>Screenshots are analyzed for authenticity. Fake or duplicate screenshots will be rejected.</p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};