import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useMentor } from "@/contexts/MentorContext";
import { Zap, ArrowRight } from "lucide-react";

export default function Index() {
  const { onboardingComplete } = useMentor();
  const navigate = useNavigate();

  useEffect(() => {
    if (onboardingComplete) navigate("/dashboard", { replace: true });
  }, [onboardingComplete, navigate]);

  if (onboardingComplete) return null;

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-background p-4">
      <div className="max-w-lg text-center animate-fade-in">
        <div className="mb-6 flex justify-center">
          <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-primary animate-pulse-glow">
            <Zap className="h-8 w-8 text-primary-foreground" />
          </div>
        </div>
        <h1 className="mb-2 text-4xl font-bold text-foreground sm:text-5xl">
          Mentor<span className="glow-text">Flow</span>
        </h1>
        <p className="mb-8 text-lg text-muted-foreground">
          From Career Confusion to Career Clarity
        </p>
        <button
          onClick={() => navigate("/onboarding")}
          className="inline-flex items-center gap-2 rounded-xl bg-primary px-8 py-3.5 text-base font-semibold text-primary-foreground transition-all hover:bg-primary/90 hover:shadow-lg hover:shadow-primary/25"
        >
          Get Started <ArrowRight className="h-5 w-5" />
        </button>
        <p className="mt-6 text-sm text-muted-foreground">
          AI-powered career roadmaps · Weekly action plans · Progress tracking
        </p>
      </div>
    </div>
  );
}
