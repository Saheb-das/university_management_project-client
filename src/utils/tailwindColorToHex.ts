interface IColor {
  [key: string]: string;
}

const colorMap: Record<keyof IColor, string> = {
  "bg-blue-500": "#3b82f6",
  "bg-green-500": "#10b981",
  "bg-yellow-500": "#facc15",
  "bg-red-500": "#ef4444",
  "bg-purple-500": "#a855f7",
  "bg-gray-500": "#6b7280",
  // Add more Tailwind colors as needed
};

export function tailwindColorToHex(tailwindClass: keyof typeof colorMap) {
  return colorMap[tailwindClass] || "#000000";
}
