<template>
  <a
    href="#main"
    class="skip-link btn btn-primary"
    @click.prevent="mainEl.focus()"
  >
    Skip to content
  </a>

  <Navbar />

  <main
    id="main"
    ref="mainEl"
    tabindex="-1"
    class="flex-1 overflow-x-clip outline-none"
    @touchstart.passive="onTouchStart"
    @touchend.passive="onTouchEnd"
  >
    <RouterView v-slot="{ Component }">
      <Transition :name="transitionName" mode="out-in">
        <component :is="Component" />
      </Transition>
    </RouterView>
  </main>

  <Footer />
  <NavbarBottom />
  <ToTop />
</template>

<script setup>
import { ref } from "vue";
import { RouterView, useRoute, useRouter } from "vue-router";
import NavbarBottom from "./components/NavbarBottom.vue";
import Navbar from "./components/Navbar.vue";
import Footer from "./components/Footer.vue";
import ToTop from "./components/ToTop.vue";
import { navLinks } from "./site";

const mainEl = ref(null);
const route = useRoute();
const router = useRouter();

// Mobile: halaman meluncur ala stack sesuai urutan tab, dan bisa digeser ke tab sebelah.
// Desktop: fade biasa. Gaya transisi ada di app.css.
const order = navLinks.map((link) => link.to);
const isMobile = () => matchMedia("(max-width: 767px)").matches;
const transitionName = ref("page");

router.beforeEach((to, from) => {
  const next = order.indexOf(to.path);
  const prev = order.indexOf(from.path);
  transitionName.value =
    !isMobile() || next < 0 || prev < 0
      ? "page"
      : next > prev
        ? "slide-left"
        : "slide-right";
});

const SWIPE_MIN = 70; // px mendatar minimum agar dihitung sebagai geseran
let start = null;

function onTouchStart(event) {
  const touch = event.touches[0];
  start = event.touches.length === 1 ? { x: touch.clientX, y: touch.clientY } : null;
}

function onTouchEnd(event) {
  if (!start || !isMobile() || document.querySelector("dialog[open]")) return;
  const touch = event.changedTouches[0];
  const dx = touch.clientX - start.x;
  const dy = touch.clientY - start.y;
  start = null;
  // abaikan guliran tegak dan geseran miring
  if (Math.abs(dx) < SWIPE_MIN || Math.abs(dx) < Math.abs(dy) * 2.5) return;

  const current = order.indexOf(route.path);
  const target = order[current + (dx < 0 ? 1 : -1)];
  if (current >= 0 && target) router.push(target);
}
</script>
