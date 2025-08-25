<template>
  <div class="font-sans bg-background text-text min-h-screen">
    <Navbar />
    <component :is="isMobile ? MobileView : DesktopView" />
  </div>
</template>

<script setup>
import Navbar from "./components/Navbar.vue";
import MobileView from "./view/MobileView.vue";
import DesktopView from "./view/DesktopView.vue";
import { ref, onMounted, onUnmounted } from "vue";

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
</script>
