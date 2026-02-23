import { useMentor } from "@/contexts/MentorContext";
import { BookOpen, CheckCircle2, Clock } from "lucide-react";

export default function Roadmap() {
  const { roadmap, currentPhaseIndex } = useMentor();

  if (!roadmap) return null;

  return (
    <div className="space-y-6 animate-fade-in">
      <div>
        <h1 className="text-3xl font-bold text-foreground">Your Roadmap</h1>
        <p className="mt-1 text-muted-foreground">Structured path to your career goal</p>
      </div>

      {/* Timeline */}
      <div className="relative space-y-0">
        {roadmap.phases.map((phase, i) => {
          const isActive = i === currentPhaseIndex;
          const isDone = i < currentPhaseIndex;

          return (
            <div key={i} className="relative flex gap-4 pb-8 last:pb-0">
              {/* Vertical line */}
              <div className="flex flex-col items-center">
                <div
                  className={`z-10 flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full border-2 transition-all ${
                    isDone
                      ? "border-success bg-success/20"
                      : isActive
                      ? "border-primary bg-primary/20 animate-pulse-glow"
                      : "border-border bg-secondary"
                  }`}
                >
                  {isDone ? (
                    <CheckCircle2 className="h-5 w-5 text-success" />
                  ) : (
                    <span className={`text-sm font-bold ${isActive ? "text-primary" : "text-muted-foreground"}`}>
                      {i + 1}
                    </span>
                  )}
                </div>
                {i < roadmap.phases.length - 1 && (
                  <div className={`w-0.5 flex-1 ${isDone ? "bg-success/40" : "bg-border"}`} />
                )}
              </div>

              {/* Content */}
              <div className={`glass-card flex-1 p-5 ${isActive ? "border-primary/30" : ""}`}>
                <div className="mb-3 flex items-center justify-between">
                  <h3 className={`text-lg font-semibold ${isActive ? "glow-text" : "text-foreground"}`}>
                    {phase.name}
                  </h3>
                  <span className="inline-flex items-center gap-1 rounded-full bg-secondary px-2.5 py-0.5 text-xs text-muted-foreground">
                    <Clock className="h-3 w-3" /> {phase.duration}
                  </span>
                </div>

                <div className="mb-3">
                  <p className="mb-1.5 text-xs font-medium uppercase tracking-wider text-muted-foreground">Skills</p>
                  <div className="flex flex-wrap gap-1.5">
                    {phase.skills_to_learn.map((skill) => (
                      <span key={skill} className="rounded-md bg-primary/10 px-2 py-0.5 text-xs font-medium text-primary">
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>

                <div>
                  <p className="mb-1.5 text-xs font-medium uppercase tracking-wider text-muted-foreground">Outcomes</p>
                  <ul className="space-y-1">
                    {phase.learning_outcomes.map((outcome) => (
                      <li key={outcome} className="flex items-start gap-2 text-sm text-foreground">
                        <BookOpen className="mt-0.5 h-3.5 w-3.5 flex-shrink-0 text-muted-foreground" />
                        {outcome}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
