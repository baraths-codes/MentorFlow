import { RoadmapData } from "@/contexts/MentorContext";

interface GenerateInput {
  careerGoal: string;
  skillLevel: string;
  existingSkills: string[];
  targetTimeline: string;
}

export const generateRoadmap = async (input: GenerateInput): Promise<RoadmapData> => {
  // Simulate API delay
  await new Promise((r) => setTimeout(r, 2000));

  const goal = input.careerGoal.toLowerCase();
  const isDesign = goal.includes("design") || goal.includes("ux");
  const isData = goal.includes("data") || goal.includes("ml") || goal.includes("ai");

  const phases = isDesign
    ? [
        { name: "Design Foundations", duration: "4 weeks", skills_to_learn: ["Color Theory", "Typography", "Layout Design"], learning_outcomes: ["Create mood boards", "Design basic layouts"] },
        { name: "UX Research & Strategy", duration: "6 weeks", skills_to_learn: ["User Research", "Personas", "Journey Mapping"], learning_outcomes: ["Conduct user interviews", "Build personas"] },
        { name: "UI Design & Prototyping", duration: "6 weeks", skills_to_learn: ["Figma", "Prototyping", "Design Systems"], learning_outcomes: ["Build interactive prototypes", "Create component library"] },
        { name: "Portfolio & Industry Prep", duration: "4 weeks", skills_to_learn: ["Case Studies", "Presentation", "Networking"], learning_outcomes: ["3 portfolio projects", "Interview preparation"] },
      ]
    : isData
    ? [
        { name: "Programming Foundations", duration: "4 weeks", skills_to_learn: ["Python", "NumPy", "Pandas"], learning_outcomes: ["Write data scripts", "Handle datasets"] },
        { name: "Statistics & ML Basics", duration: "6 weeks", skills_to_learn: ["Statistics", "Scikit-learn", "Regression"], learning_outcomes: ["Build basic ML models", "Understand bias-variance"] },
        { name: "Deep Learning & AI", duration: "6 weeks", skills_to_learn: ["TensorFlow", "Neural Networks", "NLP"], learning_outcomes: ["Train neural networks", "Build NLP pipeline"] },
        { name: "Projects & Deployment", duration: "4 weeks", skills_to_learn: ["MLOps", "Docker", "Cloud Deployment"], learning_outcomes: ["Deploy ML model", "Build end-to-end project"] },
      ]
    : [
        { name: "Core Fundamentals", duration: "4 weeks", skills_to_learn: ["HTML/CSS", "JavaScript", "Git"], learning_outcomes: ["Build static websites", "Version control workflow"] },
        { name: "Frontend Development", duration: "6 weeks", skills_to_learn: ["React", "TypeScript", "Tailwind CSS"], learning_outcomes: ["Build interactive UIs", "Component architecture"] },
        { name: "Backend & APIs", duration: "6 weeks", skills_to_learn: ["Node.js", "REST APIs", "Databases"], learning_outcomes: ["Build RESTful APIs", "Database design"] },
        { name: "Full-Stack & Deployment", duration: "4 weeks", skills_to_learn: ["CI/CD", "Cloud Services", "Testing"], learning_outcomes: ["Deploy full-stack app", "Write automated tests"] },
      ];

  const weeklyPlan = phases.flatMap((phase, pi) => {
    const weeksInPhase = parseInt(phase.duration) || 4;
    return Array.from({ length: Math.min(weeksInPhase, 3) }, (_, wi) => ({
      week: pi * 3 + wi + 1,
      tasks: [
        `Study ${phase.skills_to_learn[wi % phase.skills_to_learn.length]}`,
        `Practice ${phase.skills_to_learn[(wi + 1) % phase.skills_to_learn.length]} exercises`,
        `Complete ${phase.name} mini-project ${wi + 1}`,
      ],
    }));
  });

  const allRequired = phases.flatMap((p) => p.skills_to_learn);
  const existing = input.existingSkills;
  const missing = allRequired.filter((s) => !existing.some((e) => e.toLowerCase() === s.toLowerCase()));

  return {
    phases,
    weekly_plan: weeklyPlan,
    skill_gap_analysis: {
      required_skills: allRequired,
      existing_skills: existing,
      missing_skills: missing,
      recommended_certifications: [
        `${input.careerGoal} Professional Certificate`,
        "Google Career Certificate",
        "AWS Cloud Practitioner",
        "Meta Professional Certificate",
      ],
    },
  };
};
