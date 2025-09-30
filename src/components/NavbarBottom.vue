<template>
  <nav
    v-if="isMobile"
    class="fixed bottom-0 left-0 w-full bg-background dark:bg-background-dark border-t border-gray-200 dark:border-gray-700 flex justify-around items-center py-4 z-50"
  >
    <RouterLink
      v-for="item in navItems"
      :key="item.name"
      :to="item.path"
      class="flex flex-col items-center transition-all duration-200"
      :class="
        route.name === item.name
          ? 'text-primary dark:text-primary-dark font-semibold'
          : 'text-secondary dark:text-secondary-dark'
      "
    >
      <FontAwesomeIcon
        :icon="item.icon"
        class="transition-transform duration-200 text-2xl"
      />

      <span class="text-[10px] transition-opacity duration-200">
        {{ item.label }}
      </span>
    </RouterLink>
  </nav>
</template>

<script setup>
import { inject } from "vue";
import { useRoute } from "vue-router";

const isMobile = inject("isMobile");
const route = useRoute();

const navItems = [
  {
    name: "Home",
    label: "Home",
    path: "/",
    icon: ["fas", "compass"],
  },
  {
    name: "About",
    label: "About",
    path: "/about",
    icon: ["fas", "user"],
  },
  {
    name: "Portfolios",
    label: "Portfolio",
    path: "/portfolios",
    icon: ["fas", "feather"],
  },
  {
    name: "Projects",
    label: "Projects",
    path: "/projects",
    icon: ["fas", "rocket"],
  },
  {
    name: "Contact",
    label: "Contact",
    path: "/contact",
    icon: ["fas", "envelope"],
  },
];
</script>
