import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { X, Play, Maximize } from "lucide-react";

interface VideoPlayerProps {
  videoId: string;
  title: string;
  isOpen: boolean;
  onClose: () => void;
  onVideoComplete: () => void;
}

export const VideoPlayer = ({ videoId, title, isOpen, onClose, onVideoComplete }: VideoPlayerProps) => {
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [hasWatched, setHasWatched] = useState(false);

  const handleVideoEnd = () => {
    setHasWatched(true);
    onVideoComplete();
  };

  const embedUrl = `https://www.youtube.com/embed/${videoId}?autoplay=1&rel=0&modestbranding=1`;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className={`${isFullscreen ? 'max-w-[95vw] h-[95vh]' : 'max-w-4xl'} p-0`}>
        <DialogHeader className="p-4 pb-0">
          <DialogTitle className="flex items-center justify-between">
            <span className="truncate">{title}</span>
            <div className="flex items-center gap-2">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setIsFullscreen(!isFullscreen)}
              >
                <Maximize className="w-4 h-4" />
              </Button>
              <Button variant="ghost" size="sm" onClick={onClose}>
                <X className="w-4 h-4" />
              </Button>
            </div>
          </DialogTitle>
        </DialogHeader>
        
        <div className={`${isFullscreen ? 'h-[calc(95vh-60px)]' : 'h-96'} bg-black`}>
          <iframe
            src={embedUrl}
            title={title}
            className="w-full h-full"
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            onLoad={() => {
              // Simulate video completion after 30 seconds for demo
              setTimeout(() => {
                if (!hasWatched) {
                  handleVideoEnd();
                }
              }, 30000);
            }}
          />
        </div>
        
        {hasWatched && (
          <div className="p-4 bg-success/10 border-t border-success/20">
            <div className="flex items-center gap-2 text-success">
              <Play className="w-4 h-4" />
              <span className="font-medium">Video completed! You've earned coins.</span>
            </div>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
};