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
  test("hides Standort level when all groups share one location", () => {
    const singleLocationTasks: TaskGroup[] = [
      {
        id: "group-1",
        name: "Beet 1",
        locationName: "Standort Nord",
        fieldName: "Parzelle A",
        tasks: [createTask("task-1", "Karotte")],
      },
      {
        id: "group-2",
        name: "Beet 2",
        locationName: "Standort Nord",
        fieldName: "Parzelle B",
        tasks: [createTask("task-2", "Salat")],
      },
    ];

    render(
      <GanttChart
        tasks={singleLocationTasks}
        viewMode={ViewMode.MONTH}
        viewModes={false}
      />,
    );

    expect(screen.queryByText("Standort Nord")).not.toBeInTheDocument();
    expect(screen.getByText("Parzelle A")).toBeInTheDocument();
    expect(screen.getByText("Parzelle B")).toBeInTheDocument();
    expect(screen.getByText("Beet 1")).toBeInTheDocument();
    expect(screen.getByText("Beet 2")).toBeInTheDocument();
  });

  test("shows Standort level when multiple locations exist", () => {
    const multiLocationTasks: TaskGroup[] = [
      {
        id: "group-1",
        name: "Beet 1",
        locationName: "Standort Nord",
        fieldName: "Parzelle A",
        tasks: [createTask("task-1", "Karotte")],
      },
      {
        id: "group-2",
        name: "Beet 2",
        locationName: "Standort Süd",
        fieldName: "Parzelle C",
        tasks: [createTask("task-2", "Salat")],
      },
    ];

    render(
      <GanttChart
        tasks={multiLocationTasks}
        viewMode={ViewMode.MONTH}
        viewModes={false}
      />,
    );

    expect(screen.getByText("Standort Nord")).toBeInTheDocument();
    expect(screen.getByText("Standort Süd")).toBeInTheDocument();
    expect(screen.getByText("Parzelle A")).toBeInTheDocument();
    expect(screen.getByText("Parzelle C")).toBeInTheDocument();
  });
});
