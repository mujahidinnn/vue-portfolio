import type { Router } from "vue-router";

declare global {
  interface Window {
    plausible: PlausibleFunction;
  }
}

interface PlausibleFunction {
  (...args: any[]): void;
  q?: any[];
}

interface PlausibleOptions {
  domain: string;
  router?: Router;
}

export default function createPlausible(options: PlausibleOptions) {
  if (!options.domain) {
    console.warn("[Plausible] domain is required");
    return;
  }

  // Masukkan script Plausible
  const script = document.createElement("script");
  script.defer = true;
  script.setAttribute("data-domain", options.domain);
  script.src =
    "https://plausible.io/js/script.file-downloads.outbound-links.tagged-events.js";
  document.head.appendChild(script);

  // Fallback window.plausible jika belum ada
  if (!window.plausible) {
    window.plausible = function (...args: any[]) {
      (window.plausible.q = window.plausible.q || []).push(args);
    };
  }

  // Track route changes jika router ada
  if (options.router) {
    options.router.afterEach((to) => {
      window.plausible("pageview", { u: to.fullPath });
    });
  }
}
