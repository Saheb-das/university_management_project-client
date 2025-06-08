const apiBaseUrl = import.meta.env.VITE_SERVER_BASE_URL;

export function convertFilePathUrl(path: string): string {
  if (!path) return "";

  return `${apiBaseUrl}/${path.replace(/\\/g, "/")}`;
}
