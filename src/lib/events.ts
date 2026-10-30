export const OPEN_PROJECT_EVENT = "portfolio:open-project";

export function emitOpenProject(slug: string) {
  if (typeof window === "undefined") return;

  window.dispatchEvent(
    new CustomEvent<string>(OPEN_PROJECT_EVENT, { detail: slug }),
  );
}
