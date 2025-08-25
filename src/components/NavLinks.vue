<template>
  <template v-for="link in links" :key="link.to">
    <!-- Mobile: Scroll to id -->
    <a
      v-if="isMobile"
      :href="`#${link.to === '/' ? 'home' : link.to.slice(1)}`"
      class="block w-full"
      @click.prevent="scrollToSection(link.to)"
    >
      <li
        class="w-full px-0 md:px-4 py-2 hover:bg-gray-100 dark:hover:bg-neutral-800 rounded transition"
      >
        <span class="hover:text-primary">{{ link.label }}</span>
      </li>
    </a>

    <!-- Desktop: Router Link -->
    <RouterLink
      v-else
      :to="link.to"
      v-slot="{ isActive }"
      class="block w-full"
      @click="$emit('link-clicked')"
    >
      <li
        class="w-full px-0 md:px-4 py-2 hover:bg-gray-100 dark:hover:bg-neutral-800 rounded transition"
      >
        <span
          :class="['hover:text-primary', isActive && 'font-bold text-primary']"
        >
          {{ link.label }}
        </span>
      </li>
    </RouterLink>
  </template>

  <!-- Toggle Theme -->
  <li
    class="mt-2 md:mt-0 px-0 md:px-4 py-2 hover:bg-gray-100 dark:hover:bg-neutral-800 rounded transition cursor-pointer"
    @click="$emit('toggle-theme')"
  >
    {{ isDark ? "🌙" : "☀️" }}
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
  { to: "/portfolio", label: "Portfolio" },
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
