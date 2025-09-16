<template>
  <div
    id="container"
    class="font-sans bg-main-content text-text min-h-screen flex flex-col bg-background dark:bg-background-dark"
  >
    <Navbar />

    <div class="flex-1 px-8">
      <RouterView />
    </div>

    <Footer />
  </div>
  <ToTop />
</template>

<script setup>
import Navbar from "./components/Navbar.vue";
import Footer from "./components/Footer.vue";
import ToTop from "./components/ToTop.vue";
import { ref, onMounted, onUnmounted, provide } from "vue";
import { RouterView } from "vue-router";

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
</script>
