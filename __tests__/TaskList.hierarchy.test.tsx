import React from "react";
import { render, screen } from "@testing-library/react";
import { GanttChart, ViewMode, type TaskGroup } from "../src";

const createTask = (id: string, name: string) => ({
  id,
  name,
  startDate: new Date(2026, 0, 1),
  endDate: new Date(2026, 0, 10),
});

describe("TaskList hierarchy location visibility", () => {
  test("hides the location level when all groups share one normalized location", () => {
    const singleLocationTasks: TaskGroup[] = [
      {
        id: "group-1",
        name: "Bed 1",
        locationName: "North Farm",
        fieldName: "Field A",
        tasks: [createTask("task-1", "Carrot")],
      },
      {
        id: "group-2",
        name: "Bed 2",
        locationName: "  north   farm  ",
        fieldName: "Field B",
        tasks: [createTask("task-2", "Lettuce")],
      },
      {
        id: "group-3",
        name: "Bed 3",
        description: "NORTH FARM > Field C",
        tasks: [createTask("task-3", "Onion")],
      },
    ];

    render(
      <GanttChart
        tasks={singleLocationTasks}
        viewMode={ViewMode.MONTH}
        viewModes={false}
      />,
    );

    expect(screen.queryByText(/north farm/i)).not.toBeInTheDocument();
    expect(screen.getByText("Field A")).toBeInTheDocument();
    expect(screen.getByText("Field B")).toBeInTheDocument();
    expect(screen.getByText("Field C")).toBeInTheDocument();
    expect(screen.getByText("Bed 1")).toBeInTheDocument();
    expect(screen.getByText("Bed 2")).toBeInTheDocument();
    expect(screen.getByText("Bed 3")).toBeInTheDocument();
  });

  test("shows the location level when multiple locations exist", () => {
    const multiLocationTasks: TaskGroup[] = [
      {
        id: "group-1",
        name: "Bed 1",
        locationName: "North Farm",
        fieldName: "Field A",
        tasks: [createTask("task-1", "Carrot")],
      },
      {
        id: "group-2",
        name: "Bed 2",
        locationName: "South Farm",
        fieldName: "Field C",
        tasks: [createTask("task-2", "Lettuce")],
      },
    ];

    render(
      <GanttChart
        tasks={multiLocationTasks}
        viewMode={ViewMode.MONTH}
        viewModes={false}
      />,
    );

    expect(screen.getByText("North Farm")).toBeInTheDocument();
    expect(screen.getByText("South Farm")).toBeInTheDocument();
    expect(screen.getByText("Field A")).toBeInTheDocument();
    expect(screen.getByText("Field C")).toBeInTheDocument();
  });
});
