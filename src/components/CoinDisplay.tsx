import { Coins } from "lucide-react";

interface CoinDisplayProps {
  coins: number;
  size?: "sm" | "md" | "lg";
}

export const CoinDisplay = ({ coins, size = "md" }: CoinDisplayProps) => {
  const sizeClasses = {
    sm: "text-sm gap-1",
    md: "text-base gap-2", 
    lg: "text-xl gap-3"
  };

  const iconSizes = {
    sm: "w-4 h-4",
    md: "w-5 h-5",
    lg: "w-6 h-6"
  };

  return (
    <div className={`flex items-center ${sizeClasses[size]} coin-bounce cursor-pointer`}>
      <Coins className={`${iconSizes[size]} text-yellow-500`} />
      <span className="font-semibold text-foreground">{coins}</span>
    </div>
  );
};