import React, { createContext, useContext, useState, useEffect, ReactNode } from "react";

export interface UserProfile {
  name: string;
  careerGoal: string;
  skillLevel: "Beginner" | "Intermediate" | "Advanced";
  existingSkills: string[];
  targetTimeline: "6 months" | "1 year" | "2 years";
}

export interface Phase {
  name: string;
  duration: string;
  skills_to_learn: string[];
  learning_outcomes: string[];
}

export interface WeeklyPlan {
  week: number;
  tasks: string[];
}

export interface SkillGapAnalysis {
  required_skills: string[];
  existing_skills: string[];
  missing_skills: string[];
  recommended_certifications: string[];
}

export interface RoadmapData {
  phases: Phase[];
  weekly_plan: WeeklyPlan[];
  skill_gap_analysis: SkillGapAnalysis;
}

export interface TaskItem {
  id: string;
  title: string;
  week: number;
  status: "todo" | "in-progress" | "completed";
}

interface MentorContextType {
  profile: UserProfile | null;
  setProfile: (p: UserProfile) => void;
  roadmap: RoadmapData | null;
  setRoadmap: (r: RoadmapData) => void;
  tasks: TaskItem[];
  setTasks: React.Dispatch<React.SetStateAction<TaskItem[]>>;
  updateTaskStatus: (id: string, status: TaskItem["status"]) => void;
  onboardingComplete: boolean;
  completionPercent: number;
  currentPhaseIndex: number;
}

const MentorContext = createContext<MentorContextType | null>(null);

export const useMentor = () => {
  const ctx = useContext(MentorContext);
  if (!ctx) throw new Error("useMentor must be used within MentorProvider");
  return ctx;
};

const loadFromStorage = <T,>(key: string): T | null => {
  try {
    const v = localStorage.getItem(key);
    return v ? JSON.parse(v) : null;
  } catch { return null; }
};

export const MentorProvider = ({ children }: { children: ReactNode }) => {
  const [profile, setProfileState] = useState<UserProfile | null>(() => loadFromStorage("mf_profile"));
  const [roadmap, setRoadmapState] = useState<RoadmapData | null>(() => loadFromStorage("mf_roadmap"));
  const [tasks, setTasks] = useState<TaskItem[]>(() => loadFromStorage("mf_tasks") || []);

  const setProfile = (p: UserProfile) => {
    setProfileState(p);
    localStorage.setItem("mf_profile", JSON.stringify(p));
  };

  const setRoadmap = (r: RoadmapData) => {
    setRoadmapState(r);
    localStorage.setItem("mf_roadmap", JSON.stringify(r));
    // Generate tasks from weekly plan
    const newTasks: TaskItem[] = r.weekly_plan.flatMap((wp) =>
      wp.tasks.map((t, i) => ({
        id: `w${wp.week}-t${i}`,
        title: t,
        week: wp.week,
        status: "todo" as const,
      }))
    );
    setTasks(newTasks);
    localStorage.setItem("mf_tasks", JSON.stringify(newTasks));
  };

  const updateTaskStatus = (id: string, status: TaskItem["status"]) => {
    setTasks((prev) => {
      const next = prev.map((t) => (t.id === id ? { ...t, status } : t));
      localStorage.setItem("mf_tasks", JSON.stringify(next));
      return next;
    });
  };

  useEffect(() => {
    localStorage.setItem("mf_tasks", JSON.stringify(tasks));
  }, [tasks]);

  const onboardingComplete = !!profile && !!roadmap;
  const completionPercent = tasks.length === 0 ? 0 : Math.round((tasks.filter((t) => t.status === "completed").length / tasks.length) * 100);

  const currentPhaseIndex = roadmap
    ? Math.min(
        Math.floor((completionPercent / 100) * roadmap.phases.length),
        roadmap.phases.length - 1
      )
    : 0;

  return (
    <MentorContext.Provider
      value={{
        profile, setProfile, roadmap, setRoadmap,
        tasks, setTasks, updateTaskStatus,
        onboardingComplete, completionPercent, currentPhaseIndex,
      }}
    >
      {children}
    </MentorContext.Provider>
  );
};
