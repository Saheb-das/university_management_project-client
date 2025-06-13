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

export function isoToLocalDateFormat(date: string): string {
  const dateArr = date.split("-");
  return `${dateArr[2]}-${dateArr[1]}-${dateArr[0]}`;
}
