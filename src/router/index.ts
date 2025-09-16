import { createRouter, createWebHistory } from "vue-router";
import Landing from "../pages/Landing.vue";
import About from "../pages/About.vue";
import Contact from "../pages/Contact.vue";
import Portfolios from "../pages/Portfolios.vue";
import Projects from "../pages/Projects.vue";

const routes = [
  { path: "/", name: "Landing", component: Landing },
  { path: "/about", name: "About", component: About },
  { path: "/portfolios", name: "Portfolios", component: Portfolios },
  { path: "/projects", name: "Projects", component: Projects },
  { path: "/contact", name: "Contact", component: Contact },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
  scrollBehavior(_, __, savedPosition) {
    return savedPosition || { top: 0 };
  },
});

export default router;
