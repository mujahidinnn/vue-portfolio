<template>
  <nav
    class="sticky top-0 z-50 w-full max-w-7xl mx-auto p-4 flex justify-between items-center shadow-bottom bg-white dark:bg-dark-bg"
  >
    <h1 class="text-base sm:text-xl font-semibold text-primary">
      Yang Mulia Paduka 👑
    </h1>

    <!-- Desktop Menu -->
    <ul class="hidden md:flex gap-6 text-sm text-secondary items-center">
      <NavLinks :is-dark="isDark" @toggle-theme="toggleTheme" />
    </ul>

    <!-- Hamburger Icon -->
    <button
      class="md:hidden text-2xl focus:outline-none text-secondary cursor-pointer"
      @click="isOpen = !isOpen"
    >
      <i v-if="!isOpen" class="fas fa-bars"></i>
      <i v-if="isOpen" class="fas fa-xmark"></i>
    </button>

    <!-- Mobile Dropdown -->
    <transition name="fade">
      <ul
        v-if="isOpen"
        class="absolute top-full left-0 w-full bg-white dark:bg-dark-bg p-4 flex flex-col text-sm text-secondary z-50 md:hidden shadow-bottom border-t border-t-gray-200 dark:border-t-gray-500"
      >
        <NavLinks
          :is-dark="isDark"
          @toggle-theme="toggleTheme"
          @link-clicked="isOpen = false"
        />
      </ul>
    </transition>
  </nav>
</template>

<script setup>
import { ref, onMounted } from "vue";
import NavLinks from "./NavLinks.vue";

const isDark = ref(false);
const isOpen = ref(false);

function applyTheme() {
  const root = document.documentElement;
  if (isDark.value) {
    root.classList.add("dark");
    localStorage["my-theme"] = "dark";
  } else {
    root.classList.remove("dark");
    localStorage["my-theme"] = "light";
  }
}

function toggleTheme() {
  isDark.value = !isDark.value;
  applyTheme();
}

onMounted(() => {
  const storedTheme = localStorage["my-theme"];
  if (
    storedTheme === "dark" ||
    (!storedTheme && window.matchMedia("(prefers-color-scheme: dark)").matches)
  ) {
    isDark.value = true;
  }
  applyTheme();
});
</script>

<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: all 0.3s ease;
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
  transform: translateY(-10px);
}
</style>
