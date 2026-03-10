<template>
  <li v-for="link in links" :key="link.to" class="list-none">
    <RouterLink :to="link.to" v-slot="{ isActive, navigate }" custom>
      <a
        :href="link.to"
        @click="navigate"
        :aria-label="'Go to ' + link.label"
        class="block w-full px-4 py-2 hover:bg-gray-100 dark:hover:bg-neutral-800 rounded transition"
      >
        <span
          :class="[
            'text-secondary dark:text-secondary-dark transition-colors duration-200',
            'hover:text-primary dark:hover:text-primary-dark',
            isActive && 'font-bold text-primary dark:text-primary-dark',
          ]"
        >
          {{ link.label }}
        </span>
      </a>
    </RouterLink>
  </li>

  <li
    class="list-none mt-2 md:mt-0 px-4 py-2 hover:bg-gray-100 dark:hover:bg-neutral-800 rounded transition cursor-pointer"
    @click="$emit('toggle-theme')"
    role="button"
    aria-label="Toggle dark mode"
  >
    <FontAwesomeIcon
      :icon="isDark ? ['fas', 'sun'] : ['fas', 'moon']"
      class="text-sm transition-transform duration-300 text-yellow-500"
    />
  </li>
</template>

<script setup>
import { RouterLink, useRoute, useRouter } from "vue-router";
import { ref, onMounted, onUnmounted } from "vue";

const props = defineProps({ isDark: Boolean });
const emit = defineEmits(["toggle-theme", "link-clicked"]);

const links = [
  { to: "/", label: "Home" },
  { to: "/about", label: "About" },
  { to: "/portfolios", label: "Portfolio" },
  { to: "/projects", label: "Projects" },
  { to: "/contact", label: "Contact" },
];

const route = useRoute();
const router = useRouter();
const isMobile = ref(window.innerWidth < 768);

// Scroll to section (with 80px offset)
function scrollToSection(path) {
  const id = path === "/" ? "home" : path.slice(1);
  const el = document.getElementById(id);
  if (el) {
    const top = el.getBoundingClientRect().top + window.scrollY - 80;
    window.scrollTo({ top, behavior: "smooth" });
  }

  emit("link-clicked");
}

function handleResize() {
  const currentlyMobile = window.innerWidth < 768;

  if (currentlyMobile && !isMobile.value && route.path !== "/") {
    router.replace("/");
  }

  isMobile.value = currentlyMobile;
}

onMounted(() => {
  window.addEventListener("resize", handleResize);
  handleResize();
});

onUnmounted(() => {
  window.removeEventListener("resize", handleResize);
});
</script>
