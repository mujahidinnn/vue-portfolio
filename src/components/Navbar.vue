<template>
  <nav
    class="sticky top-0 z-50 w-full mx-auto px-8 py-4 flex justify-between items-center bg-background dark:bg-background-dark sm:bg-white sm:dark:bg-background-dark"
    :class="{ 'shadow-bottom': scrollYVal > 0 }"
  >
    <!-- Kiri -->
    <div class="flex items-start w-8 h-8">
      <transition name="fade" mode="out-in">
        <img
          v-if="scrollYVal > 150 || isMobile"
          key="photo"
          src="/global/mujahidin.jpeg"
          alt="Mujahidin"
          class="w-8 h-8 rounded-full transition-all duration-200"
        />
        <span v-else key="icon">&nbsp;</span>
      </transition>
    </div>

    <!-- Desktop Menu -->
    <ul
      class="hidden md:flex gap-6 text-sm text-secondary dark:text-secondary-dark items-center"
    >
      <NavLinks :is-dark="isDark" @toggle-theme="toggleTheme" />
    </ul>

    <!-- Theme Toggle -->
    <button
      class="block md:hidden mt-2 md:mt-0 hover:bg-gray-100 dark:hover:bg-neutral-800 rounded transition cursor-pointer"
      @click="toggleTheme"
    >
      {{ isDark ? "🌙" : "☀️" }}
    </button>
  </nav>
</template>

<script setup>
import { ref, onMounted, inject, computed } from "vue";
import NavLinks from "./NavLinks.vue";

const isMobile = inject("isMobile");
const scrollY = inject("scrollY", ref(0));
const scrollYVal = computed(() => scrollY?.value || 0);

const isDark = ref(false);

function applyTheme() {
  const root = document.documentElement;
  if (isDark.value) {
    root.classList.add("dark");
    localStorage.setItem("my-theme", "dark");
  } else {
    root.classList.remove("dark");
    localStorage.setItem("my-theme", "light");
  }
}

function toggleTheme() {
  isDark.value = !isDark.value;
  applyTheme();
}

onMounted(() => {
  const storedTheme = localStorage.getItem("my-theme");
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
.fade-enter-active {
  transition: all 0.3s ease-out;
}
.fade-leave-active {
  transition: all 0.05s ease-in;
}

.fade-enter-from {
  opacity: 0;
  transform: translateY(10px);
}
.fade-enter-to {
  opacity: 1;
  transform: translateY(0);
}

.fade-leave-from {
  opacity: 1;
  transform: translateY(0);
}
.fade-leave-to {
  opacity: 0;
  transform: translateY(10px);
}
</style>
