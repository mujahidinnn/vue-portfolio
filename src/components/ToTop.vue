<template>
  <transition name="fade">
    <div
      v-if="visible"
      @click="scrollToTop"
      class="fixed right-5 bottom-30 flex items-center justify-center w-10 h-10 rounded-full bg-background-2 hover:bg-background-dark/10 dark:bg-background-2-dark dark:hover:bg-background-2/30 text-primary dark:text-primary-dark shadow-lg transition-colors duration-200 cursor-pointer opacity-75"
      aria-label="Scroll to top"
    >
      <FontAwesomeIcon :icon="['fas', 'chevron-up']" class="text-sm" />
    </div>
  </transition>
</template>

<script setup>
import { ref, computed, onMounted, onUnmounted } from "vue";

const scrolledPast = ref(false);
const footerVisible = ref(false);
const visible = computed(() => scrolledPast.value && !footerVisible.value);

const handleScroll = () => {
  scrolledPast.value = window.scrollY > 200; // muncul kalau sudah scroll 200px
};

const scrollToTop = () => {
  window.scrollTo({ top: 0, behavior: "smooth" });
};

let observer;

onMounted(() => {
  window.addEventListener("scroll", handleScroll);

  const footer = document.querySelector("footer");
  if (footer) {
    observer = new IntersectionObserver(
      ([entry]) => {
        footerVisible.value = entry.isIntersecting;
      },
      { rootMargin: "0px 0px -80px 0px" }
    );
    observer.observe(footer);
  }
});

onUnmounted(() => {
  window.removeEventListener("scroll", handleScroll);
  observer?.disconnect();
});
</script>

<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s;
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
