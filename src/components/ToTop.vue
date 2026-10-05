<template>
  <transition name="fade">
    <button
      v-if="visible"
      type="button"
      class="fixed right-5 bottom-[calc(4.5rem+env(safe-area-inset-bottom))] z-30 grid size-11 cursor-pointer place-items-center rounded-card border border-border bg-background text-primary shadow-soft hover:bg-background-2 md:bottom-8"
      aria-label="Scroll to top"
      @click="scrollToTop"
    >
      <FontAwesomeIcon :icon="['fas', 'chevron-up']" class="text-sm" />
    </button>
  </transition>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from "vue";

const visible = ref(false);

// muncul setelah menggulir lebih dari satu tinggi layar
const handleScroll = () => {
  visible.value = window.scrollY > window.innerHeight;
};

const scrollToTop = () => {
  const reduce = matchMedia("(prefers-reduced-motion: reduce)").matches;
  window.scrollTo({ top: 0, behavior: reduce ? "auto" : "smooth" });
};

onMounted(() =>
  window.addEventListener("scroll", handleScroll, { passive: true })
);
onUnmounted(() => window.removeEventListener("scroll", handleScroll));
</script>

<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.2s;
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
