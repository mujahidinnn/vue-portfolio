<template>
  <header
    class="sticky top-0 z-40 border-b"
    :class="
      scrolled
        ? 'border-border bg-background/85 backdrop-blur-md'
        : 'border-transparent'
    "
  >
    <nav
      class="wrap flex h-12 items-center justify-between md:h-18"
      aria-label="Primary"
    >
      <RouterLink
        to="/"
        class="display inline-flex min-h-11 items-center text-2xl md:text-[1.75rem]"
        aria-label="Mujahidin, go to Home"
      >
        Mujahidin
      </RouterLink>

      <div class="flex items-center gap-2">
        <ul class="hidden items-center md:flex">
          <NavLinks />
        </ul>

        <button
          type="button"
          class="-mr-3 grid size-11 cursor-pointer place-items-center rounded-card text-secondary hover:bg-background-2 hover:text-primary"
          :aria-label="isDark ? 'Switch to light theme' : 'Switch to dark theme'"
          @click="toggleTheme"
        >
          <FontAwesomeIcon :icon="['fas', isDark ? 'sun' : 'moon']" />
        </button>
      </div>
    </nav>
  </header>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from "vue";
import { RouterLink } from "vue-router";
import NavLinks from "./NavLinks.vue";
import { isDark, toggleTheme } from "../theme";

const scrolled = ref(false);
const onScroll = () => (scrolled.value = window.scrollY > 8);

onMounted(() => {
  window.addEventListener("scroll", onScroll, { passive: true });
  onScroll();
});
onUnmounted(() => window.removeEventListener("scroll", onScroll));
</script>
