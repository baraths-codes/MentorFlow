import { useMentor } from "@/contexts/MentorContext";
import { CheckCircle2, XCircle, Award } from "lucide-react";

export default function SkillAnalysis() {
  const { roadmap, profile } = useMentor();

  if (!roadmap || !profile) return null;

  const { required_skills, existing_skills, missing_skills, recommended_certifications } = roadmap.skill_gap_analysis;

  return (
    <div className="space-y-6 animate-fade-in">
      <div>
        <h1 className="text-3xl font-bold text-foreground">Skill Analysis</h1>
        <p className="mt-1 text-muted-foreground">Gap analysis for your {profile.careerGoal} goal</p>
      </div>

      <div className="grid gap-4 lg:grid-cols-2">
        {/* Existing Skills */}
        <div className="glass-card p-6">
          <h3 className="mb-4 flex items-center gap-2 text-lg font-semibold text-foreground">
            <CheckCircle2 className="h-5 w-5 text-success" /> Your Skills
          </h3>
          <div className="flex flex-wrap gap-2">
            {existing_skills.length > 0 ? existing_skills.map((s) => (
              <span key={s} className="rounded-full border border-success/30 bg-success/10 px-3 py-1 text-sm text-success">
                {s}
              </span>
            )) : (
              <p className="text-sm text-muted-foreground">No existing skills selected</p>
            )}
          </div>
        </div>

        {/* Missing Skills */}
        <div className="glass-card p-6">
          <h3 className="mb-4 flex items-center gap-2 text-lg font-semibold text-foreground">
            <XCircle className="h-5 w-5 text-primary" /> Skills to Develop
          </h3>
          <div className="flex flex-wrap gap-2">
            {missing_skills.map((s) => (
              <span key={s} className="rounded-full border border-primary/30 bg-primary/10 px-3 py-1 text-sm text-primary">
                {s}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* All Required */}
      <div className="glass-card p-6">
        <h3 className="mb-4 text-lg font-semibold text-foreground">All Required Skills</h3>
        <div className="space-y-2">
          {required_skills.map((skill) => {
            const has = existing_skills.some((e) => e.toLowerCase() === skill.toLowerCase());
            return (
              <div key={skill} className="flex items-center justify-between rounded-lg bg-secondary/50 px-4 py-2.5">
                <span className="text-sm text-foreground">{skill}</span>
                <span className={`rounded-full px-2 py-0.5 text-xs font-medium ${has ? "bg-success/15 text-success" : "bg-primary/15 text-primary"}`}>
                  {has ? "Acquired" : "Learning"}
                </span>
              </div>
            );
          })}
        </div>
      </div>

      {/* Certifications */}
      <div className="glass-card p-6">
        <h3 className="mb-4 flex items-center gap-2 text-lg font-semibold text-foreground">
          <Award className="h-5 w-5 text-warning" /> Recommended Certifications
        </h3>
        <div className="grid gap-3 sm:grid-cols-2">
          {recommended_certifications.map((cert) => (
            <div key={cert} className="rounded-lg border border-border bg-secondary/50 p-4">
              <p className="text-sm font-medium text-foreground">{cert}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
