export type Theme = "light" | "dark" | "system";
export type ResolvedTheme = Exclude<Theme, "system">;

const STORAGE_KEY = "theme";
const DARK_QUERY = "(prefers-color-scheme: dark)";

/** Preferencia guardada por el usuario; "system" si no eligió nada. */
export function getTheme(): Theme {
  const stored = localStorage.getItem(STORAGE_KEY);
  return stored === "light" || stored === "dark" ? stored : "system";
}

/** Tema efectivo: resuelve "system" contra prefers-color-scheme. */
export function resolveTheme(theme: Theme = getTheme()): ResolvedTheme {
  if (theme !== "system") return theme;
  return window.matchMedia(DARK_QUERY).matches ? "dark" : "light";
}

/** Aplica el tema efectivo al <html> vía data-theme. */
export function applyTheme(): void {
  const resolved = resolveTheme();
  document.documentElement.dataset.theme = resolved;
  // Flag permanente: habilita el cross-fade de salida (dark → light)
  if (resolved === "dark") document.documentElement.dataset.darkReady = "";
}

/** Guarda la preferencia y la aplica. "system" borra la key. */
export function setTheme(theme: Theme): void {
  if (theme === "system") localStorage.removeItem(STORAGE_KEY);
  else localStorage.setItem(STORAGE_KEY, theme);
  applyTheme();
}

let watching = false;

/**
 * Reacciona a cambios del SO (si la preferencia es "system") y
 * re-aplica el tema tras cada navegación del ClientRouter,
 * ya que el swap reemplaza los atributos de <html>.
 */
export function watchTheme(): void {
  if (watching) return;
  watching = true;

  window.matchMedia(DARK_QUERY).addEventListener("change", () => {
    if (getTheme() === "system") applyTheme();
  });

  document.addEventListener("astro:after-swap", applyTheme);
}
