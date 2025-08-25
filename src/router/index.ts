import { createRouter, createWebHistory } from "vue-router";
import About from "../pages/About.vue";
import Contact from "../pages/Contact.vue";
import Home from "../pages/Home.vue";
import Portfolio from "../pages/Portfolio.vue";
import Projects from "../pages/Projects.vue";

const routes = [
  { path: "/", name: "Home", component: Home },
  { path: "/about", name: "About", component: About },
  { path: "/portfolio", name: "Portfolio", component: Portfolio },
  { path: "/projects", name: "Projects", component: Projects },
  { path: "/contact", name: "Contact", component: Contact },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
