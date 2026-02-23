import { useMentor } from "@/contexts/MentorContext";
import { useNavigate } from "react-router-dom";
import { Trash2, User } from "lucide-react";

export default function SettingsPage() {
  const { profile } = useMentor();
  const navigate = useNavigate();

  const handleReset = () => {
    localStorage.clear();
    navigate("/");
    window.location.reload();
  };

  return (
    <div className="space-y-6 animate-fade-in max-w-2xl">
      <div>
        <h1 className="text-3xl font-bold text-foreground">Settings</h1>
        <p className="mt-1 text-muted-foreground">Manage your MentorFlow preferences</p>
      </div>

      {profile && (
        <div className="glass-card p-6">
          <h3 className="mb-4 flex items-center gap-2 text-lg font-semibold text-foreground">
            <User className="h-5 w-5 text-primary" /> Profile
          </h3>
          <div className="space-y-3 text-sm">
            <div className="flex justify-between"><span className="text-muted-foreground">Name</span><span className="text-foreground">{profile.name}</span></div>
            <div className="flex justify-between"><span className="text-muted-foreground">Career Goal</span><span className="text-foreground">{profile.careerGoal}</span></div>
            <div className="flex justify-between"><span className="text-muted-foreground">Skill Level</span><span className="text-foreground">{profile.skillLevel}</span></div>
            <div className="flex justify-between"><span className="text-muted-foreground">Timeline</span><span className="text-foreground">{profile.targetTimeline}</span></div>
          </div>
        </div>
      )}

      <div className="glass-card p-6">
        <h3 className="mb-2 text-lg font-semibold text-foreground">Reset Progress</h3>
        <p className="mb-4 text-sm text-muted-foreground">Clear all data and start fresh with a new onboarding</p>
        <button
          onClick={handleReset}
          className="flex items-center gap-2 rounded-lg bg-destructive/15 px-4 py-2 text-sm font-medium text-destructive hover:bg-destructive/25 transition-colors"
        >
          <Trash2 className="h-4 w-4" /> Reset All Data
        </button>
      </div>
    </div>
  );
}
