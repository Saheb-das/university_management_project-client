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

export function localDateStrToYYYYMMDD(date: Date) {
  const dateStr = new Date(date).toLocaleDateString();
  const arr = dateStr.split("/");
  const mm = arr[0].length === 1 ? `0${arr[0]}` : arr[0];

  return `${arr[2]}-${mm}-${arr[1]}`;
}

export function capitalizeStr(name: string = "") {
  return name
    .split(" ")
    .map(
      (word) =>
        word.length === 1
          ? word.toUpperCase() // single-letter words like x y z
          : word.charAt(0).toUpperCase() + word.slice(1).toLowerCase() // normal words
    )
    .join(" ");
}
