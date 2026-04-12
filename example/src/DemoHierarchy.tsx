import * as React from "react";
import GanttChart, { Task, TaskGroup } from "react-modern-gantt";
import { hierarchyDemoData } from "./data";

interface DemoHierarchyProps {
  darkMode: boolean;
}

const DemoHierarchy: React.FC<DemoHierarchyProps> = ({ darkMode }) => {
  const [tasks, setTasks] = React.useState<TaskGroup[]>(hierarchyDemoData);

  const handleTaskUpdate = (groupId: string, updatedTask: Task) => {
    setTasks((prevTasks) =>
      prevTasks.map((group) =>
        group.id === groupId
          ? {
              ...group,
              tasks: group.tasks.map((task) =>
                task.id === updatedTask.id ? updatedTask : task,
              ),
            }
          : group,
      ),
    );
  };

  return (
    <div>
      <div className="control-panel">
        <button onClick={() => setTasks(hierarchyDemoData)}>Reset Demo</button>
      </div>

      <GanttChart
        tasks={tasks}
        title="OpenFarmPlanner Hierarchy Demo"
        headerLabel="Anbauflächen"
        darkMode={darkMode}
        showProgress={true}
        onTaskUpdate={handleTaskUpdate}
      />
    </div>
  );
};

export default DemoHierarchy;
