import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import "./app.css";

// FontAwesome — only the icons actually used in the app, not the full icon sets
import { library } from "@fortawesome/fontawesome-svg-core";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import {
  faCircleNodes,
  faCompass,
  faFeather,
  faRocket,
  faUserAstronaut,
  faBriefcase,
  faChevronLeft,
  faChevronRight,
  faChevronUp,
  faDownload,
  faEnvelope,
  faGraduationCap,
  faLaptopCode,
  faLink,
  faMoon,
  faSun,
  faXmark,
} from "@fortawesome/free-solid-svg-icons";
import {
  faDiscord,
  faGithub,
  faInstagram,
  faLinkedin,
  faSquareLinkedin,
} from "@fortawesome/free-brands-svg-icons";
import createPlausible from "./plugins/plausible";

library.add(
  faCircleNodes,
  faCompass,
  faFeather,
  faRocket,
  faUserAstronaut,
  faBriefcase,
  faChevronLeft,
  faChevronRight,
  faChevronUp,
  faDownload,
  faEnvelope,
  faGraduationCap,
  faLaptopCode,
  faLink,
  faMoon,
  faSun,
  faXmark,
  faDiscord,
  faGithub,
  faInstagram,
  faLinkedin,
  faSquareLinkedin
);

const app = createApp(App);

app.use(router);

app.component("FontAwesomeIcon", FontAwesomeIcon);

// Pasang Plausible
createPlausible({ domain: "mujahidin.vercel.app", router });

app.mount("#app");
