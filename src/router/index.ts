import type { RouteRecordRaw, RouterScrollBehavior } from "vue-router";
import { notFound, origin, pages } from "../seo";
import Home from "../pages/Home.vue";
const About = () => import("../pages/About.vue");
const Contact = () => import("../pages/Contact.vue");
const Portfolios = () => import("../pages/Portfolios.vue");
const Projects = () => import("../pages/Projects.vue");
const NotFound = () => import("../pages/NotFound.vue");

export const routes: RouteRecordRaw[] = [
  { path: "/", name: "Home", component: Home, meta: pages["/"] },
  { path: "/about", name: "About", component: About, meta: pages["/about"] },
  { path: "/portfolios", name: "Portfolios", component: Portfolios, meta: pages["/portfolios"] },
  { path: "/projects", name: "Projects", component: Projects, meta: pages["/projects"] },
  { path: "/contact", name: "Contact", component: Contact, meta: pages["/contact"] },
  { path: "/:pathMatch(.*)*", name: "NotFound", component: NotFound, meta: notFound },
];

export const scrollBehavior: RouterScrollBehavior = (_, __, savedPosition) => {
  const delay = matchMedia("(prefers-reduced-motion: reduce)").matches ? 0 : 200;
  return new Promise((resolve) =>
    setTimeout(() => resolve(savedPosition || { top: 0 }), delay),
  );
};

// Client only: pada prerender, tag head diisi lewat onPageRendered di vite.config.ts
export function syncHead(to: { path: string; meta: Record<string, unknown> }) {
  const { title, description, robots = "index, follow" } = to.meta as {
    title?: string; description?: string; robots?: string;
  };

  if (title) document.title = title;
  if (description)
    document.querySelector('meta[name="description"]')?.setAttribute("content", description);
  document.querySelector('meta[name="robots"]')?.setAttribute("content", robots);

  let canonical = document.querySelector('link[rel="canonical"]');
  if (!canonical) {
    canonical = document.createElement("link");
    canonical.setAttribute("rel", "canonical");
    document.head.appendChild(canonical);
  }
  canonical.setAttribute("href", `${origin}${to.path}`);
}
