const apiBaseUrl = import.meta.env.VITE_SERVER_BASE_URL;

export function convertFilePathUrl(path: string): string {
  return `${apiBaseUrl}/${path.replace(/\\/g, "/")}`;
}
