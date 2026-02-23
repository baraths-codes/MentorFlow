import { useMentor, TaskItem } from "@/contexts/MentorContext";
import { CheckCircle2, Circle, Clock, ArrowRight } from "lucide-react";

const COLUMNS: { key: TaskItem["status"]; label: string; icon: React.ElementType }[] = [
  { key: "todo", label: "To Do", icon: Circle },
  { key: "in-progress", label: "In Progress", icon: Clock },
  { key: "completed", label: "Completed", icon: CheckCircle2 },
];

export default function Tasks() {
  const { tasks, updateTaskStatus, completionPercent } = useMentor();

  const nextStatus = (s: TaskItem["status"]): TaskItem["status"] | null => {
    if (s === "todo") return "in-progress";
    if (s === "in-progress") return "completed";
    return null;
  };

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Tasks</h1>
          <p className="mt-1 text-muted-foreground">Manage your weekly action items</p>
        </div>
        <div className="flex items-center gap-2 rounded-lg bg-secondary px-3 py-2">
          <div className="h-2 w-24 rounded-full bg-border">
            <div className="h-2 rounded-full bg-primary transition-all" style={{ width: `${completionPercent}%` }} />
          </div>
          <span className="text-sm font-medium text-foreground">{completionPercent}%</span>
        </div>
      </div>

      {/* Kanban */}
      <div className="grid gap-4 lg:grid-cols-3">
        {COLUMNS.map((col) => {
          const columnTasks = tasks.filter((t) => t.status === col.key);
          return (
            <div key={col.key} className="glass-card p-4">
              <div className="mb-4 flex items-center gap-2">
                <col.icon className={`h-4 w-4 ${col.key === "completed" ? "text-success" : col.key === "in-progress" ? "text-warning" : "text-muted-foreground"}`} />
                <h3 className="text-sm font-semibold text-foreground">{col.label}</h3>
                <span className="ml-auto rounded-full bg-secondary px-2 py-0.5 text-xs text-muted-foreground">
                  {columnTasks.length}
                </span>
              </div>

              <div className="space-y-2 max-h-[60vh] overflow-y-auto">
                {columnTasks.length === 0 && (
                  <p className="py-8 text-center text-sm text-muted-foreground">No tasks</p>
                )}
                {columnTasks.map((task) => {
                  const next = nextStatus(task.status);
                  return (
                    <div key={task.id} className="group rounded-lg border border-border bg-secondary/50 p-3 transition-all hover:border-primary/20">
                      <p className="text-sm font-medium text-foreground">{task.title}</p>
                      <div className="mt-2 flex items-center justify-between">
                        <span className="text-xs text-muted-foreground">Week {task.week}</span>
                        {next && (
                          <button
                            onClick={() => updateTaskStatus(task.id, next)}
                            className="flex items-center gap-1 rounded-md bg-primary/10 px-2 py-1 text-xs font-medium text-primary opacity-0 transition-all group-hover:opacity-100 hover:bg-primary/20"
                          >
                            {next === "completed" ? "Complete" : "Start"} <ArrowRight className="h-3 w-3" />
                          </button>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
