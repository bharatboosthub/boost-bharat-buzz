import { ExternalLink, Users } from "lucide-react";

export const AdminChannel = () => {
  return (
    <div className="bg-primary text-primary-foreground py-3 px-4 shadow-lg sticky top-0 z-50">
      <div className="container mx-auto flex items-center justify-between">
        <div className="flex items-center gap-4">
          <div className="w-10 h-10 bg-primary-glow rounded-full flex items-center justify-center font-bold text-sm">
            BB
          </div>
          <div className="flex flex-col">
            <span className="font-semibold text-sm">@bharatbhushanyt</span>
            <span className="text-xs opacity-90 flex items-center gap-1">
              <Users className="w-3 h-3" />
              Subscribe for Updates!
            </span>
          </div>
        </div>
        
        <a 
          href="https://www.youtube.com/@bharatbhushanyt"
          target="_blank"
          rel="noopener noreferrer"
          className="btn-success flex items-center gap-2 text-sm"
        >
          <ExternalLink className="w-4 h-4" />
          Subscribe
        </a>
      </div>
    </div>
  );
};