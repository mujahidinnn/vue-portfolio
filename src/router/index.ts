import { createRouter, createWebHistory } from "vue-router";
import Home from "../pages/Home.vue";
const About = () => import("../pages/About.vue");
const Contact = () => import("../pages/Contact.vue");
const Portfolios = () => import("../pages/Portfolios.vue");
const Projects = () => import("../pages/Projects.vue");
const NotFound = () => import("../pages/NotFound.vue");

const routes = [
  {
    path: "/",
    name: "Home",
    component: Home,
    meta: {
      title:
        "Mujahidin | Frontend Web Developer — React, Next.js, Vue.js, Nuxt.js & WebGIS",
      description:
        "Mujahidin is a Frontend Web Developer from Indonesia with 3+ years building React & Vue.js admin dashboards and WebGIS / geospatial applications.",
    },
  },
  {
    path: "/about",
    name: "About",
    component: About,
    meta: {
      title: "About Mujahidin | Frontend Web Developer",
      description:
        "Learn more about Mujahidin, a frontend developer specializing in React, Vue.js, and WebGIS, plus the tools and stack used to build production web applications.",
    },
  },
  {
    path: "/portfolios",
    name: "Portfolios",
    component: Portfolios,
    meta: {
      title: "Portfolio | Mujahidin — Frontend Web Developer",
      description:
        "Explore Mujahidin's portfolio of admin dashboards, management systems, and geospatial web applications built with React, Vue.js, Next.js, and WebGIS tools.",
    },
  },
  {
    path: "/projects",
    name: "Projects",
    component: Projects,
    meta: {
      title: "Projects | Mujahidin — Frontend Web Developer",
      description:
        "Browse projects built by Mujahidin, including government and enterprise platforms using React, Vue.js, Next.js, Leaflet, and Django.",
    },
  },
  {
    path: "/contact",
    name: "Contact",
    component: Contact,
    meta: {
      title: "Contact Mujahidin | Frontend Web Developer",
      description:
        "Get in touch with Mujahidin for frontend development opportunities and collaboration via email, LinkedIn, GitHub, or Instagram.",
    },
  },
  {
    path: "/:pathMatch(.*)*",
    name: "NotFound",
    component: NotFound,
    meta: {
      title: "Page Not Found | Mujahidin",
      description: "The page you're looking for doesn't exist.",
      robots: "noindex, follow",
    },
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
  scrollBehavior(_, __, savedPosition) {
    return savedPosition || { top: 0 };
  },
});

router.afterEach((to) => {
  const title = to.meta.title as string | undefined;
  const description = to.meta.description as string | undefined;
  const robots = (to.meta.robots as string | undefined) ?? "index, follow";

  if (title) document.title = title;

  if (description) {
    const descTag = document.querySelector('meta[name="description"]');
    if (descTag) descTag.setAttribute("content", description);
  }

  const robotsTag = document.querySelector('meta[name="robots"]');
  if (robotsTag) robotsTag.setAttribute("content", robots);

  const canonicalTag = document.querySelector('link[rel="canonical"]');
  if (canonicalTag) {
    canonicalTag.setAttribute(
      "href",
      `https://mujahidin.my.id${to.path === "/" ? "" : to.path}`
    );
  }
});

export default router;
