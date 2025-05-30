export const colors = {
  // Priority colors
  priority: {
    high: "#FF4B4B",
    medium: "#FFB84B",
    low: "#30898a",
  },
  // Status colors
  status: {
    todo: "#FF4B4B",
    "in-progress": "#FFB84B",
    done: "#30898a",
  },
  // UI colors
  primary: "#30898a",
  primaryHover: "#54d3c2",
  danger: "#f44336",
  dangerHover: "#d32f2f",
  info: "#2196f3",
  infoHover: "#1976d2",
  text: {
    primary: "#333",
    secondary: "#666",
  },
  background: {
    primary: "#fff",
    secondary: "#f5f5f5",
  },
  border: "#ddd",
  modalOverlay: "rgba(0, 0, 0, 0.5)",
} as const;
