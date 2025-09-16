<template>
  <transition name="fade">
    <div
      v-if="visible"
      @click="scrollToTop"
      class="fixed right-5 bottom-5 flex items-center justify-center w-10 h-10 rounded-full bg-background-2 hover:bg-background-dark/10 dark:bg-background-2-dark dark:hover:bg-background-2/30 text-primary dark:text-primary-dark shadow-lg transition-colors duration-200 cursor-pointer opacity-75"
    >
      <FontAwesomeIcon :icon="['fas', 'chevron-up']" class="text-sm" />
    </div>
  </transition>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from "vue";

const visible = ref(false);

const handleScroll = () => {
  visible.value = window.scrollY > 200; // muncul kalau sudah scroll 200px
};

const scrollToTop = () => {
  window.scrollTo({ top: 0, behavior: "smooth" });
};

onMounted(() => {
  window.addEventListener("scroll", handleScroll);
});

onUnmounted(() => {
  window.removeEventListener("scroll", handleScroll);
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
