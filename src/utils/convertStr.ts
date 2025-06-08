export function truncateString(str: string, maxLength = 12): string {
  return str.length > maxLength ? str.slice(0, maxLength) + "..." : str;
}

export function formatShortDate(dateStr: string): string {
  const date = new Date(dateStr);
  return date.toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
}
