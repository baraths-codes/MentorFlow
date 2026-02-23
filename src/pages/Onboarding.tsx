import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useMentor } from "@/contexts/MentorContext";
import { generateRoadmap } from "@/lib/mockAI";
import { Zap, ArrowRight, ArrowLeft, Loader2, Check } from "lucide-react";

const SKILL_OPTIONS = [
  "HTML/CSS", "JavaScript", "TypeScript", "React", "Python", "Node.js",
  "SQL", "Git", "Figma", "Data Analysis", "Machine Learning", "Docker",
  "AWS", "Java", "C++", "Swift", "Go", "Rust", "MongoDB", "GraphQL",
];

const steps = ["Career Goal", "Skill Level", "Existing Skills", "Timeline"];

export default function Onboarding() {
  const navigate = useNavigate();
  const { setProfile, setRoadmap } = useMentor();
  const [step, setStep] = useState(0);
  const [loading, setLoading] = useState(false);
  const [name, setName] = useState("");
  const [careerGoal, setCareerGoal] = useState("");
  const [skillLevel, setSkillLevel] = useState<"Beginner" | "Intermediate" | "Advanced">("Beginner");
  const [existingSkills, setExistingSkills] = useState<string[]>([]);
  const [timeline, setTimeline] = useState<"6 months" | "1 year" | "2 years">("1 year");

  const toggleSkill = (s: string) =>
    setExistingSkills((prev) => (prev.includes(s) ? prev.filter((x) => x !== s) : [...prev, s]));

  const canProceed = () => {
    if (step === 0) return name.trim().length > 0 && careerGoal.trim().length > 0;
    return true;
  };

  const handleFinish = async () => {
    setLoading(true);
    const profile = { name, careerGoal, skillLevel, existingSkills, targetTimeline: timeline };
    setProfile(profile);
    try {
      const roadmap = await generateRoadmap(profile);
      setRoadmap(roadmap);
      navigate("/dashboard");
    } catch {
      setLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-background p-4">
      <div className="w-full max-w-xl">
        {/* Logo */}
        <div className="mb-8 flex items-center justify-center gap-2">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary">
            <Zap className="h-5 w-5 text-primary-foreground" />
          </div>
          <span className="text-2xl font-bold text-foreground">MentorFlow</span>
        </div>

        {/* Progress */}
        <div className="mb-8 flex items-center justify-center gap-2">
          {steps.map((s, i) => (
            <div key={s} className="flex items-center gap-2">
              <div
                className={`flex h-8 w-8 items-center justify-center rounded-full text-xs font-semibold transition-all ${
                  i < step
                    ? "bg-primary text-primary-foreground"
                    : i === step
                    ? "bg-primary/20 text-primary ring-2 ring-primary/40"
                    : "bg-secondary text-muted-foreground"
                }`}
              >
                {i < step ? <Check className="h-3.5 w-3.5" /> : i + 1}
              </div>
              {i < steps.length - 1 && (
                <div className={`h-0.5 w-6 sm:w-10 ${i < step ? "bg-primary" : "bg-border"}`} />
              )}
            </div>
          ))}
        </div>

        {/* Card */}
        <div className="glass-card p-6 sm:p-8 animate-fade-in">
          {step === 0 && (
            <div className="space-y-6">
              <div>
                <h2 className="text-2xl font-bold text-foreground">What's your career goal?</h2>
                <p className="mt-1 text-sm text-muted-foreground">Tell us your name and where you want to go</p>
              </div>
              <div className="space-y-4">
                <div>
                  <label className="mb-1.5 block text-sm font-medium text-foreground">Your Name</label>
                  <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="e.g. Alex"
                    className="w-full rounded-lg border border-border bg-secondary px-4 py-3 text-foreground placeholder:text-muted-foreground focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary transition-colors"
                  />
                </div>
                <div>
                  <label className="mb-1.5 block text-sm font-medium text-foreground">Career Goal</label>
                  <input
                    type="text"
                    value={careerGoal}
                    onChange={(e) => setCareerGoal(e.target.value)}
                    placeholder="e.g. Full-Stack Developer, Data Scientist, UX Designer"
                    className="w-full rounded-lg border border-border bg-secondary px-4 py-3 text-foreground placeholder:text-muted-foreground focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary transition-colors"
                  />
                </div>
              </div>
            </div>
          )}

          {step === 1 && (
            <div className="space-y-6">
              <div>
                <h2 className="text-2xl font-bold text-foreground">Your current level</h2>
                <p className="mt-1 text-sm text-muted-foreground">This helps us calibrate your roadmap</p>
              </div>
              <div className="grid gap-3">
                {(["Beginner", "Intermediate", "Advanced"] as const).map((level) => (
                  <button
                    key={level}
                    onClick={() => setSkillLevel(level)}
                    className={`rounded-lg border px-4 py-4 text-left transition-all ${
                      skillLevel === level
                        ? "border-primary bg-primary/10 text-foreground"
                        : "border-border bg-secondary text-muted-foreground hover:border-primary/30"
                    }`}
                  >
                    <span className="font-medium">{level}</span>
                    <p className="mt-0.5 text-xs text-muted-foreground">
                      {level === "Beginner" && "Just getting started, little to no experience"}
                      {level === "Intermediate" && "Some experience, familiar with basics"}
                      {level === "Advanced" && "Strong foundation, looking to specialize"}
                    </p>
                  </button>
                ))}
              </div>
            </div>
          )}

          {step === 2 && (
            <div className="space-y-6">
              <div>
                <h2 className="text-2xl font-bold text-foreground">Existing skills</h2>
                <p className="mt-1 text-sm text-muted-foreground">Select skills you already have</p>
              </div>
              <div className="flex flex-wrap gap-2">
                {SKILL_OPTIONS.map((skill) => (
                  <button
                    key={skill}
                    onClick={() => toggleSkill(skill)}
                    className={`rounded-full border px-3 py-1.5 text-sm transition-all ${
                      existingSkills.includes(skill)
                        ? "border-primary bg-primary/15 text-primary"
                        : "border-border text-muted-foreground hover:border-primary/30 hover:text-foreground"
                    }`}
                  >
                    {skill}
                  </button>
                ))}
              </div>
            </div>
          )}

          {step === 3 && (
            <div className="space-y-6">
              <div>
                <h2 className="text-2xl font-bold text-foreground">Target timeline</h2>
                <p className="mt-1 text-sm text-muted-foreground">How fast do you want to reach your goal?</p>
              </div>
              <div className="grid gap-3">
                {(["6 months", "1 year", "2 years"] as const).map((t) => (
                  <button
                    key={t}
                    onClick={() => setTimeline(t)}
                    className={`rounded-lg border px-4 py-4 text-left transition-all ${
                      timeline === t
                        ? "border-primary bg-primary/10 text-foreground"
                        : "border-border bg-secondary text-muted-foreground hover:border-primary/30"
                    }`}
                  >
                    <span className="font-medium">{t}</span>
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Buttons */}
          <div className="mt-8 flex items-center justify-between">
            <button
              onClick={() => setStep((s) => s - 1)}
              disabled={step === 0}
              className="flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground disabled:opacity-30 transition-colors"
            >
              <ArrowLeft className="h-4 w-4" /> Back
            </button>
            {step < 3 ? (
              <button
                onClick={() => setStep((s) => s + 1)}
                disabled={!canProceed()}
                className="flex items-center gap-1 rounded-lg bg-primary px-5 py-2.5 text-sm font-medium text-primary-foreground hover:bg-primary/90 disabled:opacity-40 transition-colors"
              >
                Continue <ArrowRight className="h-4 w-4" />
              </button>
            ) : (
              <button
                onClick={handleFinish}
                disabled={loading}
                className="flex items-center gap-2 rounded-lg bg-primary px-5 py-2.5 text-sm font-medium text-primary-foreground hover:bg-primary/90 disabled:opacity-70 transition-colors"
              >
                {loading ? (
                  <>
                    <Loader2 className="h-4 w-4 animate-spin" /> Generating Roadmap...
                  </>
                ) : (
                  <>
                    Generate Roadmap <Zap className="h-4 w-4" />
                  </>
                )}
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
