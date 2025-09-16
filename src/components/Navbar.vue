<template>
  <nav
    class="sticky top-0 z-50 w-full mx-auto px-8 py-4 flex justify-between items-center bg-background dark:bg-background-dark sm:bg-white sm:dark:bg-background-dark"
    :class="{
      'shadow-bottom': scrollY > 0,
      'dark:bg-black': isOpen,
    }"
  >
    <!-- Kiri -->
    <div class="flex items-start w-8 h-8">
      <transition name="fade" mode="out-in">
        <img
          v-if="scrollY > 150 && !isOpen"
          key="photo"
          src="https://media.licdn.com/dms/image/v2/D5603AQEQ4OqcXOiWkQ/profile-displayphoto-shrink_200_200/profile-displayphoto-shrink_200_200/0/1672473765433?e=1760572800&v=beta&t=z02PNmwpdEmcIdLQHT6tznf9xxmgHZv4uzyJKsGbFCY"
          alt="Mujahidin"
          class="w-8 h-8 rounded-full transition-all duration-200"
        />
        <span v-else key="icon"> </span>
      </transition>
    </div>

    <!-- Desktop Menu -->
    <ul
      class="hidden md:flex gap-6 text-sm text-secondary dark:text-secondary-dark items-center"
    >
      <NavLinks :is-dark="isDark" @toggle-theme="toggleTheme" />
    </ul>

    <!-- Hamburger Icon -->
    <button
      class="block md:hidden text-2xl focus:outline-none text-secondary dark:text-secondary-dark cursor-pointer"
      @click="isOpen = !isOpen"
    >
      <FontAwesomeIcon v-if="!isOpen" :icon="['fas', 'bars']" />
      <FontAwesomeIcon v-else :icon="['fas', 'xmark']" />
    </button>
  </nav>

  <!-- Mobile Menu -->
  <transition name="fade">
    <ul
      v-if="isOpen"
      class="fixed z-50 w-full top-[64px] md:hidden flex flex-col gap-4 px-8 py-4 bg-white dark:bg-black text-secondary dark:text-secondary-dark shadow-lg"
    >
      <NavLinks
        :is-dark="isDark"
        @toggle-theme="toggleTheme"
        @link-clicked="isOpen = false"
      />
    </ul>
  </transition>
</template>

<script setup>
import { ref, onMounted, inject } from "vue";
import NavLinks from "./NavLinks.vue";
const scrollY = inject("scrollY");

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
