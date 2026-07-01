import largeFixture from "../example/fixtures/large.json";
import smallFixture from "../example/fixtures/small.json";
import {
  createDemoScenario,
  updateScenarioTask,
} from "../example/src/demo/fixtureLoader";
import type { GanttFixture } from "../example/src/demo/types";

describe("example fixture loader", () => {
  const baseDate = new Date("2026-07-01T10:00:00.000Z");

  it("normalizes fixture dates into Date objects", () => {
    const scenario = createDemoScenario(smallFixture as GanttFixture, baseDate);

    expect(scenario.startDate).toBeInstanceOf(Date);
    expect(scenario.endDate).toBeInstanceOf(Date);
    expect(scenario.tasks[0].tasks[0].startDate).toBeInstanceOf(Date);
    expect(scenario.tasks[0].tasks[0].startDate.toISOString()).toBe(
      "2026-06-06T10:00:00.000Z",
    );
  });

  it("expands the large fixture into more than 100 rows", () => {
    const scenario = createDemoScenario(largeFixture as GanttFixture, baseDate);

    expect(scenario.tasks).toHaveLength(128);
    expect(scenario.tasks[0].tasks).toHaveLength(2);
  });

  it("updates a dragged or resized task without changing other rows", () => {
    const scenario = createDemoScenario(smallFixture as GanttFixture, baseDate);
    const updatedTask = {
      ...scenario.tasks[0].tasks[0],
      name: "Updated task",
    };

    const updatedGroups = updateScenarioTask(
      scenario.tasks,
      scenario.tasks[0].id,
      updatedTask,
    );

    expect(updatedGroups[0].tasks[0].name).toBe("Updated task");
    expect(updatedGroups[1]).toBe(scenario.tasks[1]);
  });
});
