import React from "react";
import { GanttLabels, ViewMode } from "@/types";

interface ViewModeSelectorProps {
  activeMode: ViewMode;
  onChange: (mode: ViewMode) => void;
  darkMode: boolean;
  availableModes?: ViewMode[];
  labels?: Partial<GanttLabels>;
}

/**
 * ViewModeSelector Component - Allows switching between different timeline views
 */
const ViewModeSelector: React.FC<ViewModeSelectorProps> = ({
  activeMode,
  onChange,
  darkMode,
  availableModes,
  labels,
}) => {
  // All possible view modes
  const allViewModes: Array<{
    id: ViewMode;
    labelKey: keyof GanttLabels;
    fallback: string;
  }> = [
    { id: ViewMode.MINUTE, labelKey: "minute", fallback: "Minute" },
    { id: ViewMode.HOUR, labelKey: "hour", fallback: "Hour" },
    { id: ViewMode.DAY, labelKey: "day", fallback: "Day" },
    { id: ViewMode.WEEK, labelKey: "week", fallback: "Week" },
    { id: ViewMode.MONTH, labelKey: "month", fallback: "Month" },
    { id: ViewMode.QUARTER, labelKey: "quarter", fallback: "Quarter" },
    { id: ViewMode.YEAR, labelKey: "year", fallback: "Year" },
  ];

  // Default standard view modes (excluding MINUTE and HOUR)
  const standardViewModes = [
    ViewMode.DAY,
    ViewMode.WEEK,
    ViewMode.MONTH,
    ViewMode.QUARTER,
    ViewMode.YEAR,
  ];

  // Filter view modes based on availableModes prop if provided
  // Otherwise use the standard view modes
  const viewModes = availableModes
    ? allViewModes.filter((mode) => availableModes.includes(mode.id))
    : allViewModes.filter((mode) => standardViewModes.includes(mode.id));

  return (
    <div
      className={`rmg-view-mode-selector ${darkMode ? "rmg-dark" : ""}`}
      data-rmg-component="view-mode-selector"
    >
      {viewModes.map((mode) => (
        <button
          key={mode.id}
          type="button"
          className={`rmg-view-mode-button ${activeMode === mode.id ? "rmg-view-mode-button-active" : ""}`}
          onClick={() => onChange(mode.id)}
          data-rmg-component="view-mode-button"
          data-view-mode={mode.id}
          data-active={activeMode === mode.id ? "true" : "false"}
        >
          {labels?.[mode.labelKey] || mode.fallback}
        </button>
      ))}
    </div>
  );
};

export default ViewModeSelector;
