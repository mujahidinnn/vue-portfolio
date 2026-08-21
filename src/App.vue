<template>
  <div
    id="container"
    class="font-sans bg-main-content text-text min-h-screen flex flex-col bg-background dark:bg-background-dark"
  >
    <Navbar />

    <main class="relative isolate overflow-hidden flex-1 px-8">
      <div
        class="pointer-events-none fixed -z-10 -top-16 left-1/2 -translate-x-1/2 w-72 h-72 sm:w-[36rem] sm:h-[36rem] rounded-full bg-accent-glow/35 dark:bg-accent-dark/15 blur-3xl"
      ></div>
      <RouterView />
    </main>

    <Footer />
    <NavbarBottom />
  </div>
  <ToTop />
</template>

<script setup>
import NavbarBottom from "./components/NavbarBottom.vue";
import Navbar from "./components/Navbar.vue";
import Footer from "./components/Footer.vue";
import ToTop from "./components/ToTop.vue";
import { ref, onMounted, onUnmounted, provide } from "vue";
import { RouterView } from "vue-router";

const activePopoverId = ref(null);
const isMobile = ref(window.innerWidth < 768);

const checkIsMobile = () => {
  isMobile.value = window.innerWidth < 768;
};

onMounted(() => {
  window.addEventListener("resize", checkIsMobile);
  checkIsMobile();
});

onUnmounted(() => {
  window.removeEventListener("resize", checkIsMobile);
});

const scrollY = ref(0);

function handleScroll() {
  scrollY.value = window.scrollY;
}

onMounted(() => window.addEventListener("scroll", handleScroll));
onUnmounted(() => window.removeEventListener("scroll", handleScroll));

provide("scrollY", scrollY);
provide("isMobile", isMobile);
provide("activePopoverId", activePopoverId);
</script>
