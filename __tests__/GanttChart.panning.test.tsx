import React from "react";
import { render, fireEvent } from "@testing-library/react";
import { GanttChart, type TaskGroup } from "../src";

beforeAll(() => {
  if (!window.PointerEvent) {
    (window as Window & { PointerEvent?: typeof MouseEvent }).PointerEvent =
      MouseEvent;
  }
});

const tasks: TaskGroup[] = [
  {
    id: "group-1",
    name: "Fläche 1",
    tasks: [
      {
        id: "task-1",
        title: "Beet A",
        startDate: new Date("2026-01-10"),
        endDate: new Date("2026-02-10"),
      },
    ],
  },
];

describe("GanttChart panning", () => {
  test("pans viewport on empty timeline area with left mouse button", () => {
    const { container } = render(<GanttChart tasks={tasks} editMode={false} />);

    const scrollContainer = container.querySelector(
      '[data-rmg-component="container"]',
    ) as HTMLDivElement;
    const timelineGrid = container.querySelector(
      '[data-rmg-component="timeline-grid"]',
    ) as HTMLDivElement;
    const timelineContainer = container.querySelector(
      '[data-rmg-component="timeline-container"]',
    ) as HTMLDivElement;

    scrollContainer.scrollLeft = 200;
    scrollContainer.scrollTop = 120;

    fireEvent.pointerDown(timelineGrid, {
      pointerId: 1,
      pointerType: "mouse",
      button: 0,
      isPrimary: true,
      clientX: 300,
      clientY: 200,
    });

    fireEvent.pointerMove(timelineContainer, {
      pointerId: 1,
      pointerType: "mouse",
      clientX: 250,
      clientY: 160,
    });

    expect(scrollContainer.scrollLeft).toBe(250);
    expect(scrollContainer.scrollTop).toBe(160);

    fireEvent.pointerUp(scrollContainer, { pointerId: 1, pointerType: "mouse" });
  });

  test("does not start panning when dragging starts on an interactive task element", () => {
    const { container } = render(<GanttChart tasks={tasks} editMode={true} />);

    const scrollContainer = container.querySelector(
      '[data-rmg-component="container"]',
    ) as HTMLDivElement;
    const taskItem = container.querySelector(".rmg-task-item") as HTMLDivElement;
    const timelineContainer = container.querySelector(
      '[data-rmg-component="timeline-container"]',
    ) as HTMLDivElement;

    scrollContainer.scrollLeft = 180;
    scrollContainer.scrollTop = 90;

    fireEvent.pointerDown(taskItem, {
      pointerId: 2,
      pointerType: "mouse",
      button: 0,
      isPrimary: true,
      clientX: 180,
      clientY: 100,
    });

    fireEvent.pointerMove(timelineContainer, {
      pointerId: 2,
      pointerType: "mouse",
      clientX: 120,
      clientY: 60,
    });

    expect(scrollContainer.scrollLeft).toBe(180);
    expect(scrollContainer.scrollTop).toBe(90);
  });

  test("does not pan with non-left mouse button", () => {
    const { container } = render(<GanttChart tasks={tasks} editMode={false} />);

    const scrollContainer = container.querySelector(
      '[data-rmg-component="container"]',
    ) as HTMLDivElement;
    const timelineGrid = container.querySelector(
      '[data-rmg-component="timeline-grid"]',
    ) as HTMLDivElement;
    const timelineContainer = container.querySelector(
      '[data-rmg-component="timeline-container"]',
    ) as HTMLDivElement;

    scrollContainer.scrollLeft = 100;
    scrollContainer.scrollTop = 100;

    fireEvent.pointerDown(timelineGrid, {
      pointerId: 3,
      pointerType: "mouse",
      button: 2,
      isPrimary: true,
      clientX: 150,
      clientY: 100,
    });

    fireEvent.pointerMove(timelineContainer, {
      pointerId: 3,
      pointerType: "mouse",
      clientX: 100,
      clientY: 80,
    });

    expect(scrollContainer.scrollLeft).toBe(100);
    expect(scrollContainer.scrollTop).toBe(100);
  });

  test("supports one-finger touch panning", () => {
    const { container } = render(<GanttChart tasks={tasks} editMode={false} />);

    const scrollContainer = container.querySelector(
      '[data-rmg-component="container"]',
    ) as HTMLDivElement;
    const timelineGrid = container.querySelector(
      '[data-rmg-component="timeline-grid"]',
    ) as HTMLDivElement;
    const timelineContainer = container.querySelector(
      '[data-rmg-component="timeline-container"]',
    ) as HTMLDivElement;

    scrollContainer.scrollLeft = 220;
    scrollContainer.scrollTop = 70;

    fireEvent.pointerDown(timelineGrid, {
      pointerId: 4,
      pointerType: "touch",
      button: 0,
      isPrimary: true,
      clientX: 200,
      clientY: 200,
    });

    fireEvent.pointerMove(timelineContainer, {
      pointerId: 4,
      pointerType: "touch",
      clientX: 180,
      clientY: 150,
    });

    expect(scrollContainer.scrollLeft).toBe(240);
    expect(scrollContainer.scrollTop).toBe(120);
  });
});
