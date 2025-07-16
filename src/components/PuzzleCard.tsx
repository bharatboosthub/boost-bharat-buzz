import { useState } from "react";
import { Check, X, RefreshCw } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

interface PuzzleCardProps {
  onSuccess: () => void;
}

export const PuzzleCard = ({ onSuccess }: PuzzleCardProps) => {
  const [answer, setAnswer] = useState("");
  const [status, setStatus] = useState<"idle" | "correct" | "wrong">("idle");
  const [currentPuzzle, setCurrentPuzzle] = useState(0);

  const puzzles = [
    { question: "🎬 + 📺 = ?", answer: "youtube", hint: "Video platform" },
    { question: "If 2 + 2 = 4, then 3 + 3 = ?", answer: "6", hint: "Simple math" },
    { question: "🔴 + ⚪ = YouTube Colors", answer: "red", hint: "Primary YouTube color" }
  ];

  const currentQ = puzzles[currentPuzzle];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (answer.toLowerCase().trim() === currentQ.answer) {
      setStatus("correct");
      setTimeout(() => {
        onSuccess();
      }, 1500);
    } else {
      setStatus("wrong");
      setTimeout(() => {
        setStatus("idle");
        setAnswer("");
      }, 2000);
    }
  };

  const nextPuzzle = () => {
    setCurrentPuzzle((prev) => (prev + 1) % puzzles.length);
    setAnswer("");
    setStatus("idle");
  };

  return (
    <div className="card-hover p-8 rounded-2xl max-w-md w-full">
      <div className="text-center mb-6">
        <h2 className="text-2xl font-bold text-foreground mb-2">
          🧩 Solve to Continue
        </h2>
        <p className="text-muted-foreground">
          Prove you're human before accessing Bharat Boost Hub
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="text-center">
          <div className="text-3xl mb-4 p-4 bg-accent rounded-xl">
            {currentQ.question}
          </div>
          <p className="text-sm text-muted-foreground">Hint: {currentQ.hint}</p>
        </div>

        <div className="space-y-3">
          <Input
            type="text"
            value={answer}
            onChange={(e) => setAnswer(e.target.value)}
            placeholder="Your answer..."
            className="text-center text-lg"
            disabled={status === "correct"}
          />

          {status === "idle" && (
            <Button type="submit" className="w-full btn-youtube">
              Submit Answer
            </Button>
          )}

          {status === "correct" && (
            <div className="puzzle-success p-4 rounded-xl text-center">
              <Check className="w-8 h-8 mx-auto mb-2" />
              <p className="font-semibold">Correct! Redirecting...</p>
            </div>
          )}

          {status === "wrong" && (
            <div className="bg-destructive text-destructive-foreground p-4 rounded-xl text-center">
              <X className="w-8 h-8 mx-auto mb-2" />
              <p className="font-semibold">Try again!</p>
            </div>
          )}
        </div>

        <Button
          type="button"
          onClick={nextPuzzle}
          variant="outline"
          className="w-full flex items-center gap-2"
        >
          <RefreshCw className="w-4 h-4" />
          Different Puzzle
        </Button>
      </form>
    </div>
  );
};