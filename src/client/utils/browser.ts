/**
 * Extract path from web browser.
 * @returns path extracted
 */
export function pathFromBrowser(): string {
  //@ts-ignore
  return window.location.pathname.replace("/app", "") || "/";
}

/**
 * Record the folder's path in the web browser history.
 * @param path path to record
 */
export function recordHistory(path: string): void {
  //@ts-ignore
  window.history.pushState({ dir: path }, path, `/app${path}`);
}
