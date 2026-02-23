import { useMentor } from "@/contexts/MentorContext";
import { Target, TrendingUp, Zap, BookOpen } from "lucide-react";

export default function Dashboard() {
  const { profile, roadmap, tasks, completionPercent, currentPhaseIndex } = useMentor();

  if (!profile || !roadmap) return null;

  const currentPhase = roadmap.phases[currentPhaseIndex];
  const todoTasks = tasks.filter((t) => t.status === "todo").slice(0, 3);
  const missingSkills = roadmap.skill_gap_analysis.missing_skills;

  // Circular progress
  const radius = 54;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (completionPercent / 100) * circumference;

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Welcome */}
      <div>
        <h1 className="text-3xl font-bold text-foreground">
          Welcome back, <span className="glow-text">{profile.name}</span>
        </h1>
        <p className="mt-1 text-muted-foreground">Here's your career progress overview</p>
        <div className="mt-3 flex flex-wrap gap-2">
          <span className="inline-flex items-center gap-1 rounded-full bg-primary/15 px-3 py-1 text-xs font-medium text-primary">
            <Target className="h-3 w-3" /> {profile.careerGoal}
          </span>
          <span className="inline-flex items-center gap-1 rounded-full bg-secondary px-3 py-1 text-xs font-medium text-muted-foreground">
            Phase: {currentPhase?.name}
          </span>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {/* Progress Circle */}
        <div className="glass-card p-6 flex flex-col items-center justify-center sm:col-span-2 lg:col-span-1">
          <div className="relative">
            <svg width="128" height="128" className="-rotate-90">
              <circle cx="64" cy="64" r={radius} fill="none" stroke="hsl(var(--border))" strokeWidth="8" />
              <circle
                cx="64" cy="64" r={radius} fill="none"
                stroke="hsl(var(--primary))"
                strokeWidth="8"
                strokeLinecap="round"
                strokeDasharray={circumference}
                strokeDashoffset={offset}
                className="transition-all duration-1000 ease-out"
                style={{ filter: "drop-shadow(0 0 6px hsl(0 84% 60% / 0.4))" }}
              />
            </svg>
            <div className="absolute inset-0 flex flex-col items-center justify-center">
              <span className="text-3xl font-bold text-foreground">{completionPercent}%</span>
              <span className="text-xs text-muted-foreground">Complete</span>
            </div>
          </div>
        </div>

        {/* Quick Stats */}
        <StatCard icon={TrendingUp} label="Tasks Done" value={`${tasks.filter(t => t.status === "completed").length}/${tasks.length}`} />
        <StatCard icon={BookOpen} label="Skills to Learn" value={`${missingSkills.length}`} />
        <StatCard icon={Zap} label="Current Phase" value={`${currentPhaseIndex + 1}/${roadmap.phases.length}`} />
      </div>

      {/* Bottom Grid */}
      <div className="grid gap-4 lg:grid-cols-2">
        {/* Skill Gap */}
        <div className="glass-card p-6">
          <h3 className="mb-4 text-lg font-semibold text-foreground">Skill Gap Analysis</h3>
          <div className="space-y-3">
            {missingSkills.slice(0, 5).map((skill) => {
              const progress = Math.floor(Math.random() * 40);
              return (
                <div key={skill}>
                  <div className="mb-1 flex items-center justify-between">
                    <span className="text-sm text-foreground">{skill}</span>
                    <span className="text-xs text-muted-foreground">{progress}%</span>
                  </div>
                  <div className="h-2 w-full rounded-full bg-secondary">
                    <div
                      className="h-2 rounded-full bg-primary transition-all duration-1000"
                      style={{ width: `${progress}%`, ["--progress-width" as string]: `${progress}%` }}
                    />
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Weekly Focus */}
        <div className="glass-card p-6">
          <h3 className="mb-4 text-lg font-semibold text-foreground">Weekly Focus</h3>
          {todoTasks.length > 0 ? (
            <div className="space-y-3">
              {todoTasks.map((task, i) => (
                <div key={task.id} className="flex items-start gap-3 rounded-lg bg-secondary/50 p-3">
                  <div className="flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-full bg-primary/15 text-xs font-semibold text-primary">
                    {i + 1}
                  </div>
                  <div>
                    <p className="text-sm font-medium text-foreground">{task.title}</p>
                    <p className="text-xs text-muted-foreground">Week {task.week}</p>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-sm text-muted-foreground">All tasks completed! 🎉</p>
          )}
          {todoTasks.length > 0 && (
            <div className="mt-4 rounded-lg border border-primary/20 bg-primary/5 p-3">
              <p className="text-xs font-medium text-primary">Recommended Next Action</p>
              <p className="mt-0.5 text-sm text-foreground">{todoTasks[0]?.title}</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

function StatCard({ icon: Icon, label, value }: { icon: React.ElementType; label: string; value: string }) {
  return (
    <div className="glass-card-hover p-6">
      <Icon className="mb-2 h-5 w-5 text-primary" />
      <p className="text-2xl font-bold text-foreground">{value}</p>
      <p className="text-sm text-muted-foreground">{label}</p>
    </div>
  );
}
