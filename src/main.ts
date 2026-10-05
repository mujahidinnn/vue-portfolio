import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import "./app.css";

// FontAwesome: only the icons actually used in the app, not the full icon sets
import { library } from "@fortawesome/fontawesome-svg-core";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import {
  faArrowRight,
  faBriefcase,
  faCheck,
  faChevronUp,
  faCopy,
  faDownload,
  faEnvelope,
  faHouse,
  faLayerGroup,
  faLink,
  faMoon,
  faSun,
  faUser,
  faXmark,
} from "@fortawesome/free-solid-svg-icons";
import {
  faDiscord,
  faGithub,
  faInstagram,
  faLinkedin,
  faMedium,
} from "@fortawesome/free-brands-svg-icons";
import createPlausible from "./plugins/plausible";
import { syncThemeColor } from "./theme";

library.add(
  faArrowRight,
  faBriefcase,
  faCheck,
  faChevronUp,
  faCopy,
  faDownload,
  faEnvelope,
  faHouse,
  faLayerGroup,
  faLink,
  faMoon,
  faSun,
  faUser,
  faXmark,
  faDiscord,
  faGithub,
  faInstagram,
  faLinkedin,
  faMedium
);

syncThemeColor();

const app = createApp(App);

app.use(router);

app.component("FontAwesomeIcon", FontAwesomeIcon);

// v-inview: menandai elemen (data-active) saat melintas pita tengah layar.
// Pengganti hover di perangkat sentuh: logo/ikon berwarna mengikuti scroll.
const inviewObserver = new IntersectionObserver(
  (entries) => {
    for (const entry of entries)
      (entry.target as HTMLElement).dataset.active = String(entry.isIntersecting);
  },
  { rootMargin: "-35% 0px -35% 0px" }
);
app.directive("inview", {
  mounted: (el: HTMLElement) => inviewObserver.observe(el),
  unmounted: (el: HTMLElement) => inviewObserver.unobserve(el),
});

// Pasang Plausible
createPlausible({ domain: "mujahidin.vercel.app", router });

app.mount("#app");
