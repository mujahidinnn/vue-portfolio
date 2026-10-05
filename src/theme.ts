import { ref } from "vue";

// Kelas .dark awal dipasang oleh inline script di index.html (sebelum render pertama)
const root = document.documentElement;

export const isDark = ref(root.classList.contains("dark"));

export function syncThemeColor() {
  const color = getComputedStyle(root)
    .getPropertyValue("--color-background-body")
    .trim();
  if (!color) return;

  let meta = document.querySelector<HTMLMetaElement>('meta[name="theme-color"]');
  if (!meta) {
    meta = document.createElement("meta");
    meta.name = "theme-color";
    document.head.appendChild(meta);
  }
  meta.content = color;
}

export function toggleTheme() {
  isDark.value = root.classList.toggle("dark");
  try {
    localStorage.setItem("my-theme", isDark.value ? "dark" : "light");
  } catch {
    // storage diblokir: tema tetap berganti untuk sesi ini
  }
  syncThemeColor();
}
