import React from "react";
import { render, screen } from "@testing-library/react";
import { GanttChart, ViewMode, type TaskGroup } from "../src";

const tasks: TaskGroup[] = [
  {
    id: "group-1",
    name: "Engineering",
    tasks: [
      {
        id: "task-1",
        name: "API Integration",
        startDate: new Date(2026, 1, 1),
        endDate: new Date(2026, 2, 1),
      },
    ],
  },
];

describe("GanttChart labels", () => {
  test("uses externally provided labels for today and view modes", () => {
    render(
      <GanttChart
        tasks={tasks}
        viewModes={[ViewMode.DAY, ViewMode.MONTH]}
        viewMode={ViewMode.MONTH}
        labels={{
          today: "Heute",
          day: "Tag",
          month: "Monat",
        }}
      />,
    );

    expect(screen.getByText("Heute")).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "Tag" })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "Monat" })).toBeInTheDocument();
  });

  test("keeps English fallback labels when consumers do not provide translations", () => {
    render(
      <GanttChart
        tasks={tasks}
        viewModes={[ViewMode.DAY, ViewMode.MONTH]}
        viewMode={ViewMode.MONTH}
      />,
    );

    expect(screen.getByText("Today")).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "Day" })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "Month" })).toBeInTheDocument();
  });

  test("keeps backward compatibility with localeText and explicit todayLabel", () => {
    render(
      <GanttChart
        tasks={tasks}
        todayLabel="Heute (manuell)"
        viewModes={[ViewMode.MONTH]}
        localeText={{
          title: "Ignorieren",
          resources: "Ignorieren",
          today: "Heute",
          viewModes: {
            [ViewMode.MONTH]: "Monat",
          },
        }}
      />,
    );

    expect(screen.getByText("Heute (manuell)")).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "Monat" })).toBeInTheDocument();
  });

  test("prefers labels over legacy localeText view mode translations", () => {
    render(
      <GanttChart
        tasks={tasks}
        viewModes={[ViewMode.MONTH]}
        labels={{ month: "Saison" }}
        localeText={{
          viewModes: {
            [ViewMode.MONTH]: "Monat",
          },
        }}
      />,
    );

    expect(screen.getByRole("button", { name: "Saison" })).toBeInTheDocument();
  });
});
